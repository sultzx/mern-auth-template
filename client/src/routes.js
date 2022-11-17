import React from "react"
import {Routes, Route, Navigate} from "react-router-dom"
import { AuthPage } from "./pages/AuthPage"
import { MainPage } from "./pages/MainPage"

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/main" exact element={<MainPage/>}/>
                <Route path="/" element={<Navigate replace to="/main" />} />
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path="/main" exact element={<MainPage/>}/>
            <Route path="/" exact element={<AuthPage/>}/>
        </Routes>
    )
}