import React, { useState, useContext } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../util/firebaseUtil';
import FormInput from '../form-input';
import Button from '../button';
import { UserContext } from '../../contexts/UserContext';
const defaultUser = {
	email: "",
	password: "",
}
const Login = () => {
	const [user, setUser] = useState(defaultUser);
	const { email, password } = user;
	const { setCurrentUser } = useContext(UserContext);
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
		try {
			const { user } = await signInAuthUserWithEmailAndPassword(email, password);
			setCurrentUser(user);
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case "auth/wrong-password":
					alert('Incorrect password for email');
					break
				case "auth/user-not-found":
					alert('Invalid email');
					break
				default:
					console.log(error);
			}
		}
	};
	return (
		<div className='sign-up-container'>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form>
				<FormInput label='Email' inputOptions={{ type: 'text', name: 'email', value: email, onChange: handleInputChange, required: true }} />
				<FormInput label='Password' inputOptions={{ type: 'password', name: 'password', value: password, onChange: handleInputChange, required: true }} />
				<div className='buttons-container'>
					<Button onClick={handleSubmit} type="submit">Sign in</Button>
					<Button onClick={signInWithGooglePopup} type="button" buttonType='google'>Google Sign in</Button>
				</div>
			</form>
		</div>
	);
}

export default Login;
