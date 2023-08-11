import React, { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../util/firebaseUtil';
import FormInput from '../form-input';
import Button from '../button';
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
		<div className='sign-up-container'>
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form>
				<FormInput label='Display Name' inputOptions={{ type: 'text', name: 'displayName', value: displayName, onChange: handleInputChange, required: true }} />
				<FormInput label='Email' inputOptions={{ type: 'text', name: 'email', value: email, onChange: handleInputChange, required: true }} />
				<FormInput label='Password' inputOptions={{ type: 'password', name: 'password', value: password, onChange: handleInputChange, required: true }} />
				<FormInput label='Confirm Password' inputOptions={{ type: 'password', name: 'confirmPassword', value: confirmPassword, onChange: handleInputChange, required: true }} />
				<Button onClick={handleSubmit}>Sign up</Button>
			</form>
		</div>
	);
}

export default Register;
