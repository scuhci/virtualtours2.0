import React, { ChangeEvent, FormEvent, useState, } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../util/firebaseUtil';
import MultiStepForm from "./registration-form/MultiStepForm";
const defaultInputFields = {
	firstName: "",
	lastName: "",
	displayName: "",
	email: "",
	studentEmail: "",
	password: "",
	confirmPassword: "",
	role: "default",
	enrollmentYear: "0",
	school: ""
}

const Register = () => {
	const [inputFields, setInputFields] = useState(defaultInputFields);
	const { displayName, email, password, confirmPassword, enrollmentYear, school, firstName, lastName } = inputFields;
	const resetFormFields = () => {
		setInputFields(defaultInputFields)
	}
	const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = event.target;
		setInputFields((prev) => {
			return {
				...prev,
				[name]: value,
			}
		})

	}
	const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords don't match!");
			return;
		}
		if (enrollmentYear === "0" || !school || !firstName || !lastName) {
			alert("Form is incomplete!");
			return;
		}
		try {
			const userCredential = await createAuthUserWithEmailAndPassword(email, password);
			if (userCredential) {
				const { user } = userCredential;
				await createUserDocumentFromAuth(user, { displayName, role: inputFields.role, firstName: inputFields.firstName, lastName: inputFields.lastName, enrollmentYear: inputFields.enrollmentYear, school: inputFields.school, studentEmail: inputFields.studentEmail });
			}
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
			<MultiStepForm onSubmit={handleSubmit} onChange={handleInputChange} inputFields={inputFields} />
		</div>
	);
}

export default Register;
