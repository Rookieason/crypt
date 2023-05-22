import React, { useState, useContext } from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'

import { voteContext } from '../Context/vote'
import { targetContext } from '../Context/target'

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
    const { target, setTarget } = useContext(targetContext)    
    const goPath = useHistory()
    function Tag(name){
        console.log(name)
        setTarget(name)
        goPath.push('/homepage')
    }
    return <Div>
        {vote.map((item, i) => {
            return <div><Button key={i} onClick = {() => Tag(item)}>{item}</Button><p/></div>
        })}
    </Div> 
}

export default ChooseVote