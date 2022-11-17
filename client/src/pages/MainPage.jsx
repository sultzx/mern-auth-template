import React from "react"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const MainPage = () => {

    const auth = useContext(AuthContext)

    return (
        <div>
            <h2>
                Басты бет
            </h2> 
            {
                !auth.isAuthenticated? 
                <h5 style={{color: 'red'}}>Cіз желіде тіркелмегенсіз!</h5> : 
                <h5 style={{color: 'green'}}>Желіге қош келдіңіз!</h5>
            }
            
        </div>
    )
}