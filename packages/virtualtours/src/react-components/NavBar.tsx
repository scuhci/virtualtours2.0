import React from "react";
import { Link } from "react-router-dom";


class NavBar extends React.Component {
	render() {
		return (
			<nav className='navbar navbar-expand-lg navbar-light bg-light'>
				<div className='container'>
					<Link className='navbar-brand' to='/'>
						Home
					</Link>
					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarText'
						aria-controls='navbarText'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarText'>
						<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
							<li className='nav-item'>
								<Link className='navbar-brand' to='/tour'>
									Tour
								</Link>
							</li>
						</ul>
						<ul className='navbar-nav'>
							<li className='nav-item'>
								<Link className='navbar-brand' to='/login'>
									Login
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='navbar-brand' to='/register'>
									Register
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default NavBar;