import { Routes, Route, Outlet, Navigate} from "react-router-dom";
import Login from "../src/Pages/Login";
import Home from "../src/Pages/Home"
import Register from "../src/Pages/Register"
import { useState } from "react";

function ProtectedRoutes({ redirectTo, isAuthenticated}){
    return isAuthenticated ? <Outlet/> : <Navigate to={redirectTo}/>
}

export default function MainRoutes () {

    const [loginConfirm, setLoginConfirm] = useState({ 
        email: '',
        password: ''})
    const isAuthenticated =  JSON.parse(localStorage.getItem('isAuthenticated') || false);

    return(

        <Routes>
            <Route element={<ProtectedRoutes redirectTo={'/home'} isAuthenticated={!isAuthenticated} />} >
                <Route path="/" element={
                    <Login 
                    loginConfirm={loginConfirm} 
                    setLoginConfirm={setLoginConfirm} 
                    />
                } />
                <Route path="/login" element={
                    <Login 
                    loginConfirm={loginConfirm} 
                    setLoginConfirm={setLoginConfirm}
                    />
                } />
                <Route path="/register" element={<Register/>} />
            </Route>
            <Route element={<ProtectedRoutes redirectTo={'/login'} isAuthenticated={isAuthenticated} /> }>
                <Route path="/home" element={
                    <Home 
                        isAuthenticated= {isAuthenticated}
                    />
                }/>
            </Route>
            <Route path="*" element={<h1>404 - Not found</h1>} />
        </Routes>
    )   
}           