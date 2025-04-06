import { createContext } from 'react';

export interface AuthContextType {
    userId: string | null;
    login: (token: string, userId: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
