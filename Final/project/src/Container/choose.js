import React, { useContext, useState } from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { voteContext } from '../Context/vote'
import axios from '../api'
const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 500px;
    margin: auto;
`

const Choose = () => {
    const { vote, setVote } = useContext(voteContext);
    const goPath = useHistory()
    const Gen = () => {
        goPath.push('/createvote');
    }
    const Vote = async () => {
        // setVote(function(prev){
        //     return [...prev, "b"]
        // })
        const { 
            data: { data },
        } = await axios.get('/api/votelist',{})
        // data.map((e) => {
        //     setVote(function(prev){
        //         return [...prev, e]
        //     })
        // })    
        setVote(data)
        goPath.push('/choosevote');
    }
    return <Div>
        <Button onClick={Gen}>Create Vote</Button>
        <p></p>
        <Button onClick={Vote}>Vote</Button>
    </Div>
}

export default Choose;