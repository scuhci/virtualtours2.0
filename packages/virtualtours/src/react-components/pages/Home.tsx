import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}
	handleScroll(event: any) {
		let scrollTop = event.srcElement.body.scrollTop,
			itemTranslate = Math.min(0, scrollTop / 3 - 60);

		this.setState({
			transform: itemTranslate
		});
	}
	render() {
		return (
			<div>
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
									<Link className='btn' to='/tour'>
										See Tour
									</Link>
								</div>
							</div>
							<div className="box">
								<div className="iconBx">
									<img src="./../../assets/images/landing-page/kim.jpg" width="250" height="250" />
								</div>
								<div className="content">
									<h2>Kimberley</h2>
									<p>A little info describing tour.</p>
									<a href="https://my.treedis.com/tour/scdi-tour" target="_blank" rel="noopener noreferrer" className="btn">See Tour</a>
								</div>
							</div>
							<div className="box">
								<div className="iconBx">
									<img src="./../../assets/images/landing-page/cyle.jpg" width="250" height="250" />
								</div>
								<div className="content">
									<h2>Cyle</h2>
									<p>A little info describing tour.</p>
									<a href="https://my.treedis.com/tour/vari-tv" target="_blank" rel="noopener noreferrer" className="btn">See Tour</a>
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
								<li><a href="#"><img src="./../../assets/images/landing-page/instagram.jpg" width="250" height="250" /></a></li>
								<li><a href="#"><img src="./../../assets/images/landing-page/gmail.jpg" width="250" height="250" /></a></li>
								<li><a href="#"><img src="./../../assets/images/landing-page/facebook.jpg" width="250" height="250" /></a></li>
							</ul>
						</div>
						<p className="copyright">Santa Clara University</p>
					</div>
				</section>
			</div>
		);
	}
}

export default Home;
