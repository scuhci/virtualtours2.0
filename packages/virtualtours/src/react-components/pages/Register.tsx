import React, { useState, useEffect } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../util/firebaseUtil';
const defaultUser = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: ""
}
const Register = () => {
	const [user, setUser] = useState(defaultUser);
	const { displayName, email, password, confirmPassword } = user;
	const resetFormFields = () => {
		setUser(defaultUser)
	}
	const handleInputChange = (event: any) => {
		const { name, value } = event.target;
		setUser((prev) => {
			return {
				...prev,
				[name]: value,
			}
		})

	}
	const handleSubmit = async (event: any) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords don't match!");
			return;
		}
		try {
			const { user } = await createAuthUserWithEmailAndPassword(email, password);
			await createUserDocumentFromAuth(user, { displayName });
			resetFormFields();
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				alert('Cannot create user, email already in use');
			} else {
				console.log('user creation encountered error ', error);
			}
		}
	};
	return (
		<>
			<h1>Sign up with your email and password</h1>
			<form>
				<label>Display name</label>
				<input type='text' name='displayName' value={displayName} onChange={handleInputChange} required />
				<label>Email</label>
				<input type='text' name='email' value={email} onChange={handleInputChange} required />
				<label>Password</label>
				<input type='password' name='password' value={password} onChange={handleInputChange} required />
				<label>Confirm Password</label>
				<input type='password' name='confirmPassword' value={confirmPassword} onChange={handleInputChange} required />
				<button onClick={handleSubmit}>Sign up</button>
			</form>
		</>
	);
}

export default Register;
