import React from "react";
import Login from './Login';
import Register from './Register';


const Authentication = () => {
	return (
		<>
			<div className='authentication-container'>
				<Login />
				<Register />
			</div>
		</>
	);
}
export default Authentication;
