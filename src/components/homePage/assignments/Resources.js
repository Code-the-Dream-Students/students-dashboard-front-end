/** @format */

import React from "react";
import { Row, Col } from "antd";
import { Typography } from "antd";
import { StyledDivList, StyledDivBadge } from "./styles";
import Video from "../../../graphics/videos.png";
const Resources = ({ lessons }) => {
    return (
        <StyledDivList>
            <Row>
                <Col>
                    <Typography.Title level={5}>Resources</Typography.Title>
                    <p>
                        You have a list of Videos and Resources to help you complete
                        the assignment.
                    </p>
                </Col>
            </Row>
            <StyledDivBadge>
                <div>
                    <img src={Video} alt="Summary"></img>
                </div>
                <ul>
                    {lessons.sources.map((source) => (
                        <li key={source.id}>
                            <a
                                href={source.link}
                                target="_blank"
                                rel="noopener noreferrer">
                                {source.source_title}
                            </a>
                        </li>
                    ))}
                </ul>
                <br />
                <br />
            </StyledDivBadge>
        </StyledDivList>
    );
};

export default Resources;
