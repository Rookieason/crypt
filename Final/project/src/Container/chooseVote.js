import React, { useState, useContext } from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'

import { voteContext } from '../Context/vote'
import { targetContext } from '../Context/target'
import { dateContext } from '../Context/date'

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

const ChooseVote = () => {
    const { vote } = useContext(voteContext)
    const { setDate } = useContext(dateContext);
    const { target, setTarget } = useContext(targetContext)    
    const goPath = useHistory()
    const Tag = async (name) => {
        setTarget(name)
        const {data: {date}} = await axios.get('/api/votedate', {
            params:{
                target: name
            }
        })
        setDate(date)
        goPath.push('/homepage')
    }
    return <Div>
        {vote.map((item, i) => {
            return <div><Button key={i} onClick = {() => Tag(item)}>{item}</Button><p/></div>
        })}
    </Div> 
}

export default ChooseVote