/** @format */

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
	*,
	*::after,
	*::before {
		margin: 0px;
		padding: 0px;
		box-sizing: inherit;
	}

	:root{
		--font: 1rem;
		--navy: #12284C;
		--orange: #FF5C35;
		--white: #fff;
		--display:flex;
		--gray-bk:#f5f5f5;
		--flow-column:column nowrap;
		--flow-row:column nowrap;
		--center:center;
		--shadow: 7px 7px 19px -12px rgba(0, 0, 0, 0.32);
		--border-radius: 6px;
		--gray-border: 1px solid #ccc;
	}

	body {
		box-sizing: border-box;
		font-family: 'Montserrat', sans-serif;
		background: var(--white);
	}
	
	.container-fluid {
		margin: 0;
		width:100%;
	}

	.site-layout,
	.site-layout-background,
	.header {
		background-color: var(----gray-bk);
	}

	.ctd-logo, .site-layout-right, .center{ 
		display: var(--display);
	}

	.site-layout-right, .center{ 
		display: var(--display);
		justify-content:var(--center);
	}

	.ctd-logo{ 
		width: 170px;
		padding: 0;
	}

	.githublink{
		display:flex;
		padding:30px;
	}

	.cards-border{
			border: var(--gray-border);
	}

	.white-gray{
		border: 1px solid #ccc;
		margin: 15px;
		border-radius: var(--border-radius);
	}

	.site-layout,  .site-layout-right{
			width: 100%;
	}

	.site-layout-right{
			align-items:top;
			padding:0;
			margin:0 auto;
	}

	.shadow{
		box-shadow: var(--shadow);
	}

	p {
		line-height: 1.6;
	}

	.center{
			align-items:var(--center);
	}

	.username {
			padding-top:30px;
			color: var(--white);
	}

	.ant-card {
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
		border-radius: 6px;
	}

	.ant-layout-footer {
			background-color: #d5d4d4;
	}

	@media all and (max-width:450px){
	}
`;

export default GlobalStyles;
