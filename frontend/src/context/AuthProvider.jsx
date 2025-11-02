import React, { useState, useEffect } from 'react';
import { AuthContext } from "./AuthContext.js";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [tokens, setTokens] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const refreshToken = localStorage.getItem('refreshToken');
                const userDataStr = localStorage.getItem('userData');

                if (accessToken && userDataStr) {
                    const tokensData = { accessToken, refreshToken };
                    const userData = JSON.parse(userDataStr);

                    setTokens(tokensData);
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error initializing auth state:', error);
                logout();
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = (tokensData, userPayload) => {
        setTokens(tokensData);
        const userData = {
            id: userPayload.sub,
            username: userPayload.username,
            roles: userPayload.role,
        };

        setUser(userData);

        localStorage.setItem('accessToken', tokensData.accessToken);
        localStorage.setItem('refreshToken', tokensData.refreshToken);
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setTokens(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
    };

    const value = {
        user,
        tokens,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};