import React,{ createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {

    },[]);
}


export default AuthContext
