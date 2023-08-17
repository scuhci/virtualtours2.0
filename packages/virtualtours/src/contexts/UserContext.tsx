import React, { createContext, Dispatch, useState, useEffect } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../util/firebaseUtil';

export const UserContext = createContext({
    currentUser: null,
    showSignIn: false,
    setCurrentUser: (() => null) as Dispatch<any>,
    setShowSignIn: (() => false) as Dispatch<any>
})
type UserProviderProps = {
    children: JSX.Element
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [showSignIn, setShowSignIn] = useState(false);
    const value = { currentUser, setCurrentUser, showSignIn, setShowSignIn };
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user: any) => {
            if (user) {
                setShowSignIn(true);
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe
    }, [])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}