import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");
        if (token && savedUser) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 > Date.now()) {
                    setUser(JSON.parse(savedUser));
                } else {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
            } catch {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await authService.login({ email, password });
        const { token, user: userData } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        return userData;
    };

    const register = async (data) => {
        const res = await authService.register(data);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
