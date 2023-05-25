import React, { createContext, useState } from 'react'

export const dateContext = createContext()

const DateContextProvider = (props) => {
    const [ date, setDate ] = useState("")

    return (
        <dateContext.Provider value = {{ date, setDate }} {...props}/>
    )
}

export default DateContextProvider