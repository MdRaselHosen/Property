import React,{ createContext, useState, useContext, useEffect } from 'react'

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

    const login = async (ElementInternals, password) => {
        try{
            console.log("Logging in: ",email);
            const response = await api.post('user/login/', {email, password});
            setToken(response.data.token);
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
            
        }catch (error){
            console.error('Login error', error);
            throw error;
        }
    }

    const register = async (name, email, password) => {
        try{
            console.log("Registering: ", name, email);
            const response = await api.post('user/register/',{name, email, password});
            setToken(response.data.token);
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);

        }catch (error){
            console.error('Register error', error);
            throw error;

        }
    };
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
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
