import React, { createContext, Dispatch, useState, useEffect } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../util/firebaseUtil';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: (() => null) as Dispatch<any>,
})

export const UserProvider = (props: any) => {
    const { children } = props;
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user: any) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe
    }, [])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}