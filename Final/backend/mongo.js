import dotenv from "dotenv-defaults";
dotenv.config();
import mongoose from 'mongoose';
import User from './models/user.js'
import Vote from './models/vote.js'
mongoose.connect(
    process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
)
.then((res) => console.log("mongo db connection created"));

const voteResult = async (target) => {
    const existvote = await Vote.findOne({name:target});
    if(existvote){
        return {
            q: existvote.q,
            c1: existvote.c1,
            c2: existvote.c2
        }
    }else{
        return {
            q: 0,
            c1: 0,
            c2: 0
        }
    }
}

const voteDate = async (target) => {
    const existvote = await Vote.findOne({name: target});
    if(existvote){
        return {
            date: existvote.date
        }
    }else{
        return {
            date: ""
        }
    }
}

const generateVote = async ( nm, q, g, h, date ) => {
    const existvote = await Vote.findOne({name:nm});
    if(existvote){
        return{
            gen:false
        }
    }else try{
        const newVote = new Vote({ name:nm, q:q, g:g, h:h, c1:1, c2:1, date:date });
        newVote.save();
        return {
            gen: true
        }
    }catch(e){
        throw new Error("Vote creation error: " + e)
    }
}


// var x = Math.floor(257 * Math.random());
// var h1 = (Math.pow(3, x)) % 257;
// const newVote = new Vote({ name: "Trial", q: 257, g: 3, h: h1, c1: 1, c2: 1});
// newVote.save()
const voteList = async() => {
    const data = []
    const msg = await Vote.find({})
    for(var i = 0;i<msg.length;i++){
        data.push(msg[i].name);
    }
    return {
        data: data
    }
}

const checkUser = async (nm, i) => {
    const existing = await User.findOne({ name: nm, id: i });
    if(existing){
        return {
            code: false
        }
    }else try{
        const exist = await User.findOne({ id: i })
        if(exist)return {
            code: true
        }
        else{
            const newUser = new User({ name: nm, id: i });
            console.log("Created User", newUser);
            newUser.save();
            return {
                //can vote
                code: false
            }
        }
    }catch(e){
        throw new Error("User creation error: " + e);
    }
};
const voteRequest = async (nm, i, vote) => {
    const existing = await User.findOne({ name: nm, id: i });
    if(existing){
        var voted = false;
        for(var i = 0;i<existing.vote.length;i++){
            if(vote === existing.vote[i])voted = true;
        }
        if(!voted){
            const voting = await Vote.findOne({ name: vote });
            return {
                //can vote
                q: voting.q,
                g: voting.g,
                h: voting.h,
                card : false
            }
        }else return {
            //cannot vote
            q:0,
            g:0,
            h:0,
            card: true
        }
    }else return {
        //cannot vote
        q:0,
        g:0,
        h:0,
        card: true
    }
}
const voted = async (nm, i, c1, c2) => {
    const existing = await User.findOne({ id: i });
    if(existing){
        var voted = false;
        for(var i = 0;i<existing.vote.length;i++){
            if(nm === existing.vote[i])voted = true;
        }
        if(!voted){
            const votereq = await Vote.findOne({ name: nm });
            var newc1 = votereq.c1 * c1;
            var newc2 = votereq.c2 * c2;
            newc1 = newc1 % votereq.q;
            newc2 = newc2 % votereq.q;
            await Vote.updateOne({name:nm},{$set:{c1: newc1, c2: newc2}})
            existing.vote.push(nm)
            await existing.save()
            return {
                //successfully voted
                code: false
            }
        }
        else return{
            //failed
            code: true
        } 
    }else return {
        code: true
    }
};

const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open",() => {
    console.log("db opened successfully.")
});

export { checkUser, voted, voteRequest, generateVote, voteList, voteResult, voteDate }