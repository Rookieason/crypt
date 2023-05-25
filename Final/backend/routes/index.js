import express from 'express'
import { checkUser, voted, voteRequest, generateVote, voteList, voteResult, voteDate } from '../mongo.js'
const router = express.Router();

router.post('/create-user', async(req, res) => {
    const { code } = await checkUser(req.body.user, req.body.password)
    res.json({ code:code });
})

router.post('/vote', async(req, res) => {
    const { code } = await voted(req.body.name, req.body.id, req.body.c1, req.body.c2)
    res.json({ code:code });
})

router.get('/voterequest', async(req, res) => {
    const { q, g, h, card } = await voteRequest( req.query.name, req.query.id, req.query.target )
    res.json({ q: q, g: g, h: h, card: card }); 
})

router.get('/votelist', async (req, res) => {
    const { data } = await voteList()
    res.json({ data: data });
})
// const spawn = require('child_process').spawn

router.get('/generate', async (req, res) => {
    // const { q, g, h } = spawn('python3', ['Generate.py', req.query.name])
    const { gen } = await generateVote( req.query.name, req.query.q, req.query.g, req.query.h, req.query.date )
    res.json({ gen: gen });
})

router.get('/voteresult', async (req, res) => {
    const { q, c1, c2 } = await voteResult( req.query.target ) 
    res.json({ q: q, c1: c1, c2: c2 })
})

router.get('/votedate', async (req, res) => {
    const { date } = await voteDate( req.query.target )
    res.json({ date: date })
})
export default router;