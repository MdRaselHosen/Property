import React,{ createContext, useState, useContext, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken){
            setToken(storedToken);
        }
        setLoading(false);
    },[]);

    const login = async (email, password) => {
        try{
            console.log("🔐 Logging in: ", email);
            const response = await api.post('user/login/', {email, password});
            console.log('✓ Login response received:', response.data);
            
            const token = response.data.access;
            const refreshToken = response.data.refresh;
            const user = response.data.user;
            
            setToken(token);
            setUser(user);
            localStorage.setItem('token', token);
            localStorage.setItem('refresh', refreshToken);
            localStorage.setItem('user', JSON.stringify(user));
            console.log('✓ Token and user saved to localStorage');
            console.log('✓ Token:', token.substring(0, 20) + '...');
            
        }catch (error){
            console.error('❌ Login error', error);
            throw error;
        }
    }

    const register = async (name, email, password) => {
        try{
            console.log("Registering: ", name, email);
            const response = await api.post('user/register/',{name, email, password});
            // After register, user needs to login to get token
            // setToken(response.data.token);
            // setUser(response.data.user);
            // localStorage.setItem('token', response.data.token);

        }catch (error){
            console.error('Register error', error);
            throw error;

        }
    };
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log('✓ Logout complete - token and user cleared');
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!token,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}


export default AuthContext
