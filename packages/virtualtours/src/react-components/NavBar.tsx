import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../contexts/UserContext';
import { signOutUser } from '../util/firebaseUtil';
const NavBar = () => {
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
	const { currentUser } = useContext(UserContext);
	const handleToggle = () => {
		var header = document.querySelector("header");
		header.classList.toggle("active");
	}
	return (
		<>
			<header id="header">
				<a href="#" className="logo">SCU Virtual Tours</a>
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
