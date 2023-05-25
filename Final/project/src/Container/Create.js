import React, { useState, useRef, useContext } from 'react'
import { Button, Input, Calendar } from 'antd'

import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import Generate from './Generate.js'

import axios from '../api'
import { userContext } from '../Context/user'
import { voteContext } from '../Context/vote'
import { dateContext } from '../Context/date'

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 500px;
    margin: auto;
`
const Cal = styled.div`
    border: 1px solid;
`


const Create = () => {
    const { date, setDate } = useContext(dateContext);
    const goPath = useHistory()
    const [ name, setName ] = useState('')
    const setting = (value, mode) => {
        var val = value.format('YYYY-MM-DD hh:mm:ss');
        setDate(val)
    }
    const createVote = async () => {
        if(name == '' || date == ''){
            alert("You've not yet input vote name or choose date!")
            return
        }
        var { q, g, h } = Generate(name);
        console.log("Generate q,g,h successfully!")
        const { data: { gen }
        } = await axios.get('/api/generate', {
            params: {
                name: name,
                q: q,
                g: g,
                h: h,
                date: date
            },
        });
        if(gen){
            alert("Generate Vote Successfully!")
            goPath.push('/choose')
        }
        else{
            alert("The Vote is already exist!")
        }
    }
    return <Div>
        <Input
        onKeyDown = {(e) => {
            if(e.key === 'Enter'){
                createVote()
            }
        }}
        prefix="⚖"
        placeholder="What to vote?"
        value={name}
        onChange = {(e) => {
            setName(e.target.value)
        }}
        style={{marginBottom:10}}
        ></Input>
        <Cal><Calendar fullscreen={false} onChange={setting}></Calendar></Cal>
        <Button onClick = {createVote}>Create</Button>
    </Div>
}

export default Create;