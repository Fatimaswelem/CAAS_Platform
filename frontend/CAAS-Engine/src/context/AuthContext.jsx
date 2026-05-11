/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */

import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
    const [userData, setUserData] = useState(null);

    const saveUserData = () => {
        const encodedToken = localStorage.getItem("token");

        if (encodedToken) {
            const decodedToken = jwtDecode(encodedToken);
            setUserData(decodedToken);
        }
    };

    // refresh
    useEffect(() => {
        if (localStorage.getItem("token")) {
            saveUserData();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ userData , setUserData, saveUserData }}>
            {children}
        </AuthContext.Provider>
    );
}