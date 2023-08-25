import React, { useState } from 'react'
import alertContext from './alertContext'

const AlertState = (props) => {
    const [alert, setAlert] = useState(null);
    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 2500);
    }

    return (
        <alertContext.Provider value={{ showAlert,alert}}>
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertState;