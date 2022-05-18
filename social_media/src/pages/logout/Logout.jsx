import React from 'react'
import './logout.css'
import { BrowserRouter as Router, Switch, Route, Redirect, } from "react-router-dom";
import { createContext, useEffect, useReducer } from "react";
function Logout() {
    useEffect(()=>{
        localStorage.removeItem("user");
        window.location.reload();
    });
    return (
        <div>
            Logging Off...
        </div>
    )
}

export default Logout
