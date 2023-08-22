import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../contexts/UserContext';
import { signOutUser } from '../util/firebaseUtil';
import { clearSignInMessage, signInMessage, signOutMessage, clearSignOutMessage } from '../util/msgUtil'
const NavBar = () => {
	const { currentUser, showSignIn, setShowSignIn, showSignOut, setShowSignOut } = useContext(UserContext);
	const scrollTo = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			const scrollDiv = element.offsetTop;
			window.scrollTo({ top: scrollDiv, behavior: 'smooth' });
		}
		//Doesn't seem like the active css is applied. 
		// var header = document.querySelector("header");
		// header.classList.toggle("active");
	}
	useEffect(() => {
		if (showSignIn) {
			signInMessage("You are signed in");
			setTimeout(() => {
				clearSignInMessage()
			}, 1000);
			setShowSignIn(false);
		}
		if (showSignOut) {
			signOutMessage("You are signed out");
			setTimeout(() => {
				clearSignOutMessage()
			}, 1000);
			setShowSignOut(false);
		}
	}, [currentUser])

	const handleToggle = () => {
		var header = document.querySelector("header");
		header.classList.toggle("active");
	}
	return (
		<>
			<header id="header">
				<a href="#" className="logo">SCU Virtual Tours</a>
				<a id="signintext" className="hidden"></a>
				<ul>
					<li>
						<Link to='/' onClick={() => scrollTo("home")}>
							<div className="nav-links">Home</div>
						</Link>
					</li>
					<li>
						<Link to='/#consultants' onClick={() => scrollTo("consultants")}>
							<div className="nav-links">Tour Guides</div>
						</Link>
					</li>
					<li>
						<Link to='/#contact' onClick={() => scrollTo("contact")}>
							<div className="nav-links">Contact</div>
						</Link>
					</li>
					<li>
						{
							currentUser ? (
								<Link to='#'>
									<div className='nav-links' onClick={signOutUser}>Sign Out</div>  </Link>) : (
									<Link className='nav-links' to='/login'>
										Sign In
									</Link>
								)
						}
					</li>
				</ul>
				<div className="toggle" onClick={handleToggle}></div>
			</header>
		</>
	);
}

export default NavBar;
