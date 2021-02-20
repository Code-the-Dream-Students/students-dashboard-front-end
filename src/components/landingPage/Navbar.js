import React, {useState} from 'react';
import logo from './graphics/logo.png';

const Navbar = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<div className='nav'>
				<nav>
					<div>
						<a 
							href="https://www.codethedream.org/" 
							target="_blank" 
							rel="noopener noreferrer"
						>
							<img className="logo" src={logo} alt="Code The Dream"></img>
						</a>
					</div>
						<ul className="nav-links" style={{transform: open ? "translateX(0px)" : ""}}>
							<li>
								<a href="https://www.codethedream.org/about/" target="_blank" rel="noopener noreferrer">About</a>
							</li>
							<li>
								<a href="https://www.codethedream.org/classes/" target="_blank" rel="noopener noreferrer">FAQS</a>
							</li>			
							<li>
								<div className="apply-now">
									<a 
										href="https://www.codethedream.org/apply-now/" 
										target="_blank" 
										rel="noopener noreferrer"
									>
										Apply Now
									</a>
								</div>
							</li>
						</ul>
					<i onClick={() => setOpen(!open)}className="fas fa-bars burger"><span>MENU</span></i>
				</nav>
			</div>
		</>
	);
}
export default Navbar;
