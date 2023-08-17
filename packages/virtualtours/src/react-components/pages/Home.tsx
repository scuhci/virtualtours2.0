import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext"
import { signInMessage, clearSignInMessage } from '../../util/msgUtil';
const Home = () => {
	const { currentUser, showSignIn, setShowSignIn } = useContext(UserContext);
	useEffect(() => {
		let id = window.location.href.split('/')[3];
		if (id) id = id.substring(1);
		const element = document.getElementById(id);
		if (element) {
			const scrollDiv = element.offsetTop;
			window.scrollTo({ top: scrollDiv, behavior: 'smooth' });
		}
		if (showSignIn) {
			signInMessage("You are signed in");
			setTimeout(() => {
				clearSignInMessage()
			}, 1000);
			setShowSignIn(false);
		}

	}, [])


	return (
		<>
			<div>
				<div id="signintext" className="hidden"></div>
				<section className="banner" id="home">
					<div>
						<h2><span>Santa Clara University</span></h2>
						<h2>Virtual Campus Tours</h2>
					</div>
				</section>
				<section className="mission" id="mission">
					<div className="content">
						<div className="mxw800p">
							<h3>Explore SCU</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
						</div>
					</div>
				</section>
				<section className="sec consultants" id="consultants">
					<div className="content">
						<div className="mxw800p">
							<h3>Our Tour Guides</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
						</div>
						<div className="consultantsBx">
							<div className="box">
								<div className="iconBx">
									<img src="../../../assets/images/landing-page/cyle.jpg" width="250" height="250" />
								</div>
								<div className="content">
									<h2>Cyle</h2>
									<p>A little info describing tour.</p>
									{currentUser && <Link className='btn' to='/tour?id=vari'>
										See Tour
									</Link>}
									{!currentUser && <Link className='btn' to='/login'>
										Sign in to see the tours
									</Link>}
								</div>
							</div>
							<div className="box">
								<div className="iconBx">
									<img src="./../../assets/images/landing-page/kim.jpg" width="250" height="250" />
								</div>
								<div className="content">
									<h2>Kimberley</h2>
									<p>A little info describing tour.</p>
									{currentUser && <Link className='btn' to='/tour?id=scdi'>
										See Tour
									</Link>}
									{!currentUser && <Link className='btn' to='/login'>
										Sign in to see the tours
									</Link>}
								</div>
							</div>
							<div className="box">
								<div className="iconBx">
									<img src="./../../assets/images/landing-page/cyle.jpg" width="250" height="250" />
								</div>
								<div className="content">
									<h2>Saunder</h2>
									<p>A little info describing tour.</p>
									{currentUser && <Link className='btn' to='/tour?id=heafy'>
										See Tour
									</Link>}
									{!currentUser && <Link className='btn' to='/login'>
										Sign in to see the tours
									</Link>}
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="sec contact" id="contact">
					<div className="content">
						<div className="mxw800p">
							<h3>Contact Us</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
						</div>
						<div className="sci">
							<ul>
								<li><a href="#"><img src="./../../assets/images/landing-page/instagram.jpg" /></a></li>
								<li><a href="#"><img src="./../../assets/images/landing-page/gmail.jpg" /></a></li>
								<li><a href="#"><img src="./../../assets/images/landing-page/facebook.jpg" /></a></li>
							</ul>
						</div>
						<p className="copyright">Santa Clara University</p>
					</div>
				</section>
			</div>
		</>
	);
}

export default Home;
