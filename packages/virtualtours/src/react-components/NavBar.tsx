import React from "react";
import { Link } from "react-router-dom";


class NavBar extends React.Component {
	private scrollTo = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			const scrollDiv = element.offsetTop;
			window.scrollTo({ top: scrollDiv, behavior: 'smooth' });
		}
		//Doesn't seem like the active css is applied. 
		// var header = document.querySelector("header");
		// header.classList.toggle("active");
	}
	render() {
		return (
			<>
				<header id="header">
					<a href="#" className="logo">SCU Virtual Tours</a>
					<ul>
						<li>
							<Link to='/' onClick={() => this.scrollTo("home")}>
								<div className="nav-links">Home</div>
							</Link>
						</li>
						<li>
							<Link to='/#consultants' onClick={() => this.scrollTo("consultants")}>
								<div className="nav-links">Tour Guides</div>
							</Link>
						</li>
						<li>
							<Link to='/#contact' onClick={() => this.scrollTo("contact")}>
								<div className="nav-links">Contact</div>
							</Link>
						</li>
						<li>
							<Link to='/register'>
								<div className="nav-links">Register</div>
							</Link>
						</li>
						<li>
							<Link to='/login'>
								<div className="nav-links">Login</div>
							</Link>
						</li>
					</ul>
				</header>
			</>
		);
	}
}

export default NavBar;
