import React, { useState, useRef, useContext } from 'react'
import { Button, Input, message, Spin } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'

import { userContext } from '../Context/user.js'
import { Link, useHistory } from 'react-router-dom'

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

const TitleDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const Ex = styled.div`
    margin:20px 0;
    margin-bottom:20px;
    padding: 30px 50px;
    text-align: center;
    background: rgba(0,0,0,0.05);
    border-radius: 4px;
`

const SigninPage = () => {
    const bodyRef = useRef(null)
    const saveUsername = localStorage.getItem('USER_KEY');
    const { user, setUser } = useContext(userContext);
    // const savePassword = localStorage.getItem('USER_PASSWORD');
    // const [password, setPassword] = useState(savePassword || '');
    // const [checkUser, {loading:uloading, data:udata, error:uerr}] = useLazyQuery(CHECKUSEREXIST_QUERY)
    // const [checkPWD, {loading:ploading, data:pdata, error:perr}] = useLazyQuery(CHECKUSERPWD_QUERY)
    
    const goPath = useHistory()
    const checkin = async (e) => {
        var MobileReg = /^(09)[0-9]{8}$/;
        if(user.name !== '' && user.id.match(MobileReg)){
            const {
                data: { code },
            } = await axios.post('/api/create-user', {
                user: user.name,
                password: user.id
            });
            if(!code){
                goPath.push("/choose")
            }else{
                alert("The Phone Number is already registered!")
            }            
        }else{
            alert("Phone Number has wrong format!")
        }
    }
    // if(uloading || ploading) return <Ex><Spin/></Ex>
    return <Div>
        <TitleDiv>
            <h1>Sign In</h1>
        </TitleDiv>
        
        {/*input username*/}
        <Input
        onKeyDown = {(e) => {
            if(e.key === 'Enter' && e.target.value){
                bodyRef.current.focus();
            }
        }}
        prefix={<UserOutlined/>}
        placeholder="Username"
        value={user.name}
        onChange = {(e) => setUser(t => {
            return {
                name: e.target.value,
                id:t.id
            }
        })}
        style = {{marginBottom:10}}
        ></Input>

        {/*input password */}
        <Input.Password
        ref={bodyRef}
        onKeyDown = {(e) => {
            if(e.key === 'Enter'){
                checkin()
            }
        }}
        prefix="📞"
        type="search"
        // enterButton="Send"
        placeholder="PhoneNumber"
        value={user.id}
        onChange = {(e) => setUser(t => {
            return {
                name: t.name,
                id: e.target.value
            }
        })}
        style={{marginBottom:10}}
        iconRender={visible => (visible? <EyeTwoTone /> : <EyeInvisibleOutlined/>)}
        ></Input.Password>
        <Button onClick = {checkin}>Send</Button>
        <p></p>
    </Div>
}
export default SigninPage;