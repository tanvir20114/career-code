import React, { useEffect, useState } from 'react';
import { AuthContext } from "./AuthContext"
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import axios from 'axios';
const googleAuthProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [loading,setLoading] = useState(true);
    const [user,setUser] = useState(null);
    const createUser = async (email,password) =>{
        setLoading(true);
        return await createUserWithEmailAndPassword(auth,email,password)
    }
    const SignInUser = async (email,password) =>{
        setLoading(true);
        return await signInWithEmailAndPassword(auth,email,password)
    }
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth,googleAuthProvider)
    }
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            setLoading(false);
            ///////e
            if(currentUser?.email){
                const userData = { email: currentUser.email };
                axios.post('http://localhost:3000/jwt', userData,{
                    withCredentials: true
                }).then(res=>{
                    console.log('token after jwt', res.data);
                   
                }).catch(error=>console.log(error));
            }
            //////s
            console.log('user in the auth state change', currentUser)
        })
        return () => {
            unSubscribe();
        }
    },[])
const authInfo = {
    loading,
    user,
    createUser,
    SignInUser,
    signOutUser,
    signInWithGoogle
}
    return (
            <AuthContext value={authInfo}>
                {children}
            </AuthContext>
    );
}
export default AuthProvider;