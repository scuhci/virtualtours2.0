import React, { createContext, Dispatch, useState, useEffect } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../util/firebaseUtil';

export const UserContext = createContext({
    currentUser: null,
    showSignIn: false,
    showSignOut: false,
    setCurrentUser: (() => null) as Dispatch<any>,
    setShowSignIn: (() => false) as Dispatch<any>,
    setShowSignOut: (() => false) as Dispatch<any>
})
type UserProviderProps = {
    children: JSX.Element
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignOut, setShowSignOut] = useState(false);
    const value = { currentUser, setCurrentUser, showSignIn, setShowSignIn, showSignOut, setShowSignOut };
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user: any) => {
            if (user) {
                setShowSignIn(true);
                setShowSignOut(false);
                createUserDocumentFromAuth(user);
            } else {
                setShowSignIn(false);
                setShowSignOut(true);
            }
            setCurrentUser(user);
        });
        return unsubscribe
    }, [])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}