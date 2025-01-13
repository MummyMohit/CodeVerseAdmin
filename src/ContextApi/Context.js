import { createContext, useState } from "react";

export const UserContext = createContext();

const Context = ({ children }) => {

    const [data, setData] = useState([])

    return (
        <UserContext.Provider value={{ data, setData }}>
            {children}
        </UserContext.Provider>

    )
}
export default Context