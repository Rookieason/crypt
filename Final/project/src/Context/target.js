import React, { createContext, useState } from 'react'

export const targetContext = createContext()

const TargetContextProvider = (props) => {
    const [ target, setTarget ] = useState("")

    return (
        <targetContext.Provider value = {{ target, setTarget }} {...props}/>
    )
}

export default TargetContextProvider