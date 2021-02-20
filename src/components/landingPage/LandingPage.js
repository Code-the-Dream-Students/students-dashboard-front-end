import React from 'react';
import styled from 'styled-components';
import Login from './Login'
import Navbar from './Navbar'
import FooterPage from './FooterPage'

import './index.css';

const Section = styled.div`
	display:flex;
	flex-grow: 1;
	flex-basis:auto;
	flex-shrink:0;
	flex-flow: column;
	background-image: url('./images/background.png');
	background-position: top;
	background-repeat: no-repeat;
	background-size: cover;
	background-attachment: fixed;
`;

const Main = styled.main`
	padding:150px 20px 0 20px;
	margin:0;
	min-height:100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	&::after{
		content: '';
		position:absolute;
		left: 0;
		top: 0;
		width:100%; 
		height:100%;
	}
`;

const LandingPage = ({ history }) => {
	return (
		<>
			<Navbar />
			<Section>
				<Main>
					<Login history={history} />
				</Main>
			</Section>
			<FooterPage />
		</>
	);
}
export default LandingPage;
