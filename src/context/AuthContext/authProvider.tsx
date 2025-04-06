import { useState, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './auth-context';

export interface AuthContextType {
    userId: string | null;
    login: (token: string, userId: string) => void;
    logout: () => void;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId'));

    // method to save token, and user id in local storage
    const login = (token: string, userId: string) => {
        setUserId(userId);
        localStorage.setItem('authToken', token);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        // navigate("/login"); // Only navigate if useNavigate is available
        <Navigate to="/auth" replace />;
    };

    return <AuthContext.Provider value={{ userId, login, logout }}>{children}</AuthContext.Provider>;
};
