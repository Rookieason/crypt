import React, { createContext, useState } from 'react'

export const voteContext = createContext()

const VoteContextProvider = (props) => {
    const [ vote, setVote ] = useState([])
    return (
        <voteContext.Provider value={{ vote, setVote }} {...props}/>
    )
}

export default VoteContextProvider