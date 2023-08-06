import React from "react";
import { Link } from "react-router-dom";


class NavBar extends React.Component {
	private scrollTo = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			const scrollDiv = element.offsetTop;
			window.scrollTo({ top: scrollDiv, behavior: 'smooth' });
		}
	}
	render() {
		return (
			<>
				<header id="header">
					<a href="#" className="logo">SCU Virtual Tours</a>
					<ul>
						<li>
							<Link to='/' onClick={() => this.scrollTo("home")}>
								Home
						</Link>
						</li>
						<li>
							<Link to='/#consultants' onClick={() => this.scrollTo("consultants")}>
								Tour Guides
						</Link>
						</li>
						<li>
							<Link to='/#contact' onClick={() => this.scrollTo("contact")}>
								Contact
						</Link>
						</li>
						<li>
							<Link to='/register'>
								Register
						</Link>
						</li>
						<li>
							<Link to='/login'>
								Login
						</Link>
						</li>
					</ul>
				</header>
			</>
		);
	}
}

export default NavBar;
