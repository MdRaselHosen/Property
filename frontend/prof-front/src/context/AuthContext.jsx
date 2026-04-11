import React,{ createContext, useState, useContext, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (storedToken){
            setToken(storedToken);
        }
        if (storedUser){
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    },[]);

    const login = async (email, password) => {
        try{
            console.log("Logging in: ", email);
            // Clear old user data first
            localStorage.removeItem('token');
            localStorage.removeItem('refresh');
            localStorage.removeItem('user');
            setUser(null);
            setToken(null);
            
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
            console.log('Token and user saved to localStorage for:', user.email);
            console.log('Token:', token.substring(0, 20) + '...');
            
        }catch (error){
            console.error('Login error', error);
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
        // Clear both state and localStorage
        setUser(null);
        setToken(null);
        
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        
        console.log('Logout complete - all data cleared');
        console.log('localStorage keys remaining:', Object.keys(localStorage));
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
