import React from 'react'
import { useState, useContext } from 'react'
import { Checkbox, Button } from 'antd'
import styled from 'styled-components'
import { userContext } from '../Context/user.js'
import { targetContext } from '../Context/target.js'
import axios from '../api'

import Elgamel from '../Encrypt/elgamel.js'

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 500px;
    margin: auto;
`
const TitleDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const options = [
    {
        label: 'A',
        value: 2,
    },
    {
        label: 'B',
        value: 3,
    },
    {
        label: 'C',
        value: 5,
    },
    {
        label: 'D',
        value: 7,
    },
    {
        label: 'E',
        value: 11,
    },
];
const Homepage = () => {
    const { target } = useContext(targetContext)
    const { user } = useContext(userContext)
    const [ans, setAns] = useState([])
    console.log(target)
    const send = async() => {
        var message = 1;
        for(var i = 0;i<ans.length;i++){
            message = message * ans[i];
        }
        console.log(user.name)
        console.log(user.id)
        console.log(target)
        const {
            data: { q, g, h, card },
        } = await axios.get('/api/voterequest', {
            params: {
                name: user.name,
                id: user.id,
                target: target
            },
        });
        if(!card){
            var { c1, c2 } = Elgamel( q, g, h, message );
            console.log(c1);
            console.log(c2);
            const {
                data: { code },
            } = await axios.post('/api/vote', {
                name: target,
                id: user.id,
                c1: c1,
                c2: c2
            });
            
            if(!code){
                alert("Thanks for participating!")
            }
            else{
                alert("Failed to vote!")
            } 
        }else{
            alert("Failed to vote!")
        }
        
    }
    return <Div>
        <TitleDiv>
            <h1>{target}</h1>
        </TitleDiv>
        <TitleDiv>
            <Checkbox.Group options={options} defaultValue={ans} onChange={(e) => setAns(e)} />
        </TitleDiv>
        <br/>
        <Button onClick = {send}>Send</Button>
    </Div>
}

export default Homepage;