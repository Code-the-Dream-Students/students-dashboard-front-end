/** @format */

import React from "react";
import { Space } from "antd";
import styled from "styled-components";
import { CalendarOutlined, VideoCameraOutlined } from "@ant-design/icons";

const ButtonStyle = styled.button`
	color: #12284c;
	font-size: 1em;
	margin: 0 auto;
	padding: 8px;
	background-color: #ff5c35;
	border: 1px solid #f1f1f2;
	border-radius: 3px;
	width: 305px;
	text-align: center;
	display: block;

	a {
		color: #12284c;
	}

	&:hover {
		background-color: #f1f1f2;
		color: #ff5c35;
		border: 1px solid #c0c0c0;
	}

	@media only screen and (max-width: 767px) {
		position: fixed;
		right: 32px;
		bottom: 60px;
		z-index: 2147483640;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		border-radius: 50%;
		height: 80px;
		width: 80px;
		padding: 0;
		line-height: 1;
		box-shadow: 7px 7px 19px -12px rgba(0, 0, 0, 0.32);
		transition: all 0.1s ease-in-out;
	}
`;

const HomeButtons = () => {
	return (
		<>
			<Space direction="vertical" className="center">
				<ButtonStyle as="a" href="/">
					<CalendarOutlined /> View Calendar
				</ButtonStyle>
				<ButtonStyle
					as="a"
					href="https://us02web.zoom.us/j/8270372532?pwd=cGJHazFVUURyTTc1a3REQytqZjYyZz09"
					target="_blank"
				>
					<VideoCameraOutlined /> Mentor Session
				</ButtonStyle>
			</Space>
		</>
	);
};

export default HomeButtons;
