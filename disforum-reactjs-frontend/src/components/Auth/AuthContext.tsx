import React from 'react';

interface AuthContextType {
    user: any,
    setUser : any
}

const AuthContext = React.createContext<AuthContextType>(null!);

export const AuthProvider = ({ userData, children }: { userData: any, children: React.ReactNode }) => {
    let [user, setUser] = React.useState(userData);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
