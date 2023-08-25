import React, { useContext } from 'react';
import alertContext from '../context/alert/alertContext';
function Alert() {
    const alertcontext = useContext(alertContext);
    const { alert } = alertcontext;

    const capitalize = (word) => {

        if (!word) {
            return "";
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        <div style={{ height: '50px' }}>
            {alert && (
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                    <strong>{alert.msg}</strong>
                </div>
            )}
        </div>
    )
}

export default Alert;
