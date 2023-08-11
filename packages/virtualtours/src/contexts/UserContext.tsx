import React, { createContext, Dispatch, useState } from 'react';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: (() => null) as Dispatch<any>,
})

export const UserProvider = (props: any) => {
    const { children } = props;
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}