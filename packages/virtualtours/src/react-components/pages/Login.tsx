import React from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../util/firebaseUtil'


const Login = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(user);
	}
	return (
		<>
			<div className='card' style={{ marginTop: "20px" }}>
				<div className='card-body'>Login</div>
				<button onClick={logGoogleUser}>Sign in with Google Popup</button>
			</div>
		</>
	);
}

export default Login;
