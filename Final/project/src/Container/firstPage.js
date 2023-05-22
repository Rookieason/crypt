import { Button, Carousel, Avatar } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import { UserOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom'

const Div = styled.div`
    height:100%;
    width:100vw;
    margin-left: 0;
    margin-right: 0;
    border:1px;
`
const Banner = styled.div`
    height:200px;
    width:100%;
    background-color:rgb(226, 215, 215);
    border:1px solid transparent;
`
const LittleDiv = styled.h1`
    height:200px;
    color: #fff;
    line-height:160px;
    text-align: center; 
`

const SideBar = styled.div`
    width:20vw;
    float:left;
    height:880px;
    text-align:center;
    line-height:100px;
    font-size:30px;
    color:#ffffff;
    font-weight:bold;
    background-color:#cecece;
`
//For SideBar to use
const CtHover = styled.div`
    &:hover{
        transition: 0.5s ease;
        background:rgb(241, 231, 231);
        color:black;
    }
`
//
const Package = styled.div`
    display:inline-block;
`
const Body = styled.div`
    transition: 0.5s ease;
    width:80vw;
    height:880px;
    text-align:center;
    line-height:100px;
    font-size:25px;
    color:rgb(36, 31, 39);
    font-weight:bold;
    background-color:#fffaf3;
    float:left
`

const Introduce = [
    <div style={{width:"100%"}}>
        <img src="https://www.ntu.edu.tw/images/logo.png"></img>
        <p></p>
        <img src="https://i.imgur.com/Y9fL6uY.png"></img>
    </div>,
    <div style={{width:"100%"}}>
        Implementation of Privacy Protection Electronic Voting Scheme Based on ElGamal Homomorphic Encryption.
        <p></p>
        <img src="https://i.imgur.com/X2LjNJx.png" width="200px" height="200px"></img>
        <p></p>
    </div>
]
const FirstPage = () => {
    const goPath = useHistory();
    const [set, setSet] = useState(-1)
    const Signin = () => {
        goPath.push('/signinpage');
    }
    return <Div>
        <Banner>
            <Carousel autoplay>
                <div><LittleDiv onClick={Signin} style={{"cursor":"pointer"}}>Rookieason</LittleDiv></div>
                <div><LittleDiv onClick={Signin} style={{"cursor":"pointer"}}>kenchung285</LittleDiv></div>
                <div><LittleDiv onClick={Signin} style={{"cursor":"pointer"}}>Joy7280</LittleDiv></div>
            </Carousel>
        </Banner>
        <Package>
        <SideBar>
            <CtHover style={{"cursor":"pointer"}} onClick={() => setSet(0)}>
                About us
            </CtHover>
            <CtHover style={{"cursor":"pointer"}} onClick={() => setSet(1)}>
                About the web
            </CtHover>
            <CtHover style={{"cursor":"pointer"}} onClick={Signin}>
                Sign In
            </CtHover>
        </SideBar>
        <Body>
            {Introduce[set]}
        </Body>
        </Package>
    </Div>
}

export default FirstPage;