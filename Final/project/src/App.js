import logo from './logo.svg';
import './App.css';
import React, { useState, useRef } from 'react'
import { Button, Input, message, Tag } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import SigninPage from './Container/signinPage.js'
import FirstPage from './Container/firstPage.js'
import Homepage from './Container/homepage.js'
import Create from './Container/Create.js'
import Choose from './Container/choose.js'
import ChooseVote from './Container/chooseVote.js'

import VoteContextProvider from './Context/vote';
import UserContextProvider from './Context/user';
import TargetContextProvider from './Context/target';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/signinpage">
            <VoteContextProvider>
              <TargetContextProvider>
                <UserContextProvider>
                  <SigninPage/>
                </UserContextProvider>                
              </TargetContextProvider>
            </VoteContextProvider>
          </Route>

          <Route exact path="/">
            <FirstPage/>
          </Route>

          <Route exact path="/homepage">
            <VoteContextProvider>
              <TargetContextProvider>
                <UserContextProvider>
                  <Homepage/>  
                </UserContextProvider>
              </TargetContextProvider>
            </VoteContextProvider>
          </Route>

          <Route exact path="/createvote">
            <VoteContextProvider>
              <TargetContextProvider>
                <UserContextProvider>
                  <Create/>   
                </UserContextProvider>
              </TargetContextProvider>               
            </VoteContextProvider>
          </Route>

          <Route exact path="/choose">
            <VoteContextProvider>
              <TargetContextProvider>
                <UserContextProvider>
                  <Choose/>     
                </UserContextProvider>
              </TargetContextProvider>
            </VoteContextProvider>
          </Route>

          <Route exact path="/choosevote">
            <VoteContextProvider>
              <TargetContextProvider>
                <UserContextProvider>
                  <ChooseVote/>  
                </UserContextProvider>                           
              </TargetContextProvider>
            </VoteContextProvider>
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
