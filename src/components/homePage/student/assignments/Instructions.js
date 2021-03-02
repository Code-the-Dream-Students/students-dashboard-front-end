/** @format */

import React from "react";
import { FileDoneOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { GoalIcon } from "../../../../graphics/Goal";
import { StyledDivList } from "./styles";
const Instructions = ({ lesson }) => {
    return (
        <div>
            <Typography.Title level={5}>
                <strong>{lesson}</strong>
            </Typography.Title>
            <Typography.Title level={5}>
                <FileDoneOutlined /> Instructions:
            </Typography.Title>
            <p>In this unit, we will learn:</p>
            <StyledDivList>
                <ul>
                    <li>
                        Basic Selectors | Common values and units | CSS layout | New
                        CSS Features
                    </li>
                    <li>Debugging CSS</li>
                    <li>Layout and positioning methods used in web design</li>
                    <li>
                        Responsive design theory | Media queries | Breakpoints | Page
                        layout
                    </li>
                </ul>

                <Typography.Title level={5}>
                    <GoalIcon /> <strong>Goals:</strong>
                </Typography.Title>
                <ul>
                    <li>Understand CSS fundamental concepts</li>
                    <li>CSS &amp; Chrome Dev tools</li>
                    <li>
                        CSS design elaboration | Display modes | Float property |
                        Positioning page content
                    </li>
                </ul>
                <br />
            </StyledDivList>
        </div>
    );
};

export default Instructions;
