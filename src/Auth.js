import React, {createContext, useState} from 'react';

export const AuthContext = createContext({});

function AuthProvider({children}){

    const [quest, setQuest] = useState([]);
    console.log("testee",quest)
        
    return (
        <AuthContext.Provider value={{quest, setQuest}}>
            {children}
        </AuthContext.Provider>
        
    )
};

export default AuthProvider;