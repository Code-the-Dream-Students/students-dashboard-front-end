import React from "react";
import { Card, Row, Col, Space } from "antd";
import styled from "styled-components";
import logo from "../../images/staff.png";

const MentorsHeader = () => {
	const ListOfMentorsBox = styled.div`
		height: 175px;
		width: 390px;
		background: white;
	`;

	const TextBox = styled.div`
		width: 315.15px;
		height: 92.34px;
		padding: 50px;
	`;

	return (
		<>
			<Space direction="vertical">
				<Card type="inner">
					<Row gutter={[16, 16]}>
						<ListOfMentorsBox>
							<Col span={12}>
								<TextBox>
								<h3>Pirana II</h3>
								<h6>List of Mentors</h6>
								</TextBox>
							</Col>
						</ListOfMentorsBox>
						<ListOfMentorsBox>
							<Col span={12}>
								<img
									src={logo}
									alt="Mentors"
									width="300"
									height="180"
									style={{ paddingLeft: 80 }}
								></img>
							</Col>
						</ListOfMentorsBox>
					</Row>
				</Card>
			</Space>
		</>
	);
};
export default MentorsHeader;
