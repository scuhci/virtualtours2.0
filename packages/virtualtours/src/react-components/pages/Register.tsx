import React, { useState, useContext } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../util/firebaseUtil';
import FormInput from '../form-input';
import Button from '../button';
import { UserContext } from '../../contexts/UserContext';
const defaultInputFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
	role: "default",
}
const Register = () => {
	const [inputFields, setInputFields] = useState(defaultInputFields);
	const { displayName, email, password, confirmPassword } = inputFields;
	const resetFormFields = () => {
		setInputFields(defaultInputFields)
	}
	const { setCurrentUser } = useContext(UserContext);
	const handleInputChange = (event: any) => {
		const { name, value } = event.target;
		setInputFields((prev) => {
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
			setCurrentUser(user);
			await createUserDocumentFromAuth(user, { displayName, role: inputFields.role });
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
				<div className="group">
					<select name="role" value={inputFields.role} onChange={handleInputChange} defaultValue="default" className="form-select">
						<option value="default" disabled>
							Select your role
        				</option>
						<option value="Parent">Parent</option>
						<option value="Student">Student</option>
						<option value="Educator">Educator</option>
					</select>
				</div>
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
