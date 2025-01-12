import { createContext, useContext, useState } from "react";

const stateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("token"));
    // const [token, _setToken] = useState(1);
    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    };
    return (
        <stateContext.Provider value={{ user, token, setUser, setToken }}>
            {children}
        </stateContext.Provider>
    );
};

export const useStateContext = () => useContext(stateContext);
