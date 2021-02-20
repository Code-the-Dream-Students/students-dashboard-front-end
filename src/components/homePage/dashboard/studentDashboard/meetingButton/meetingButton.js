/** @format */

import React from "react";
import { Button } from "antd";
import { StyledDiv } from "./styles.js";
import { CalendarOutlined, VideoCameraOutlined } from "@ant-design/icons";

const meetingButton = () => {
    return (
        <>
            <StyledDiv>
                <Button
                    type="primary"
                    block
                    as="a"
                    href="https://us02web.zoom.us/j/8270372532?pwd=cGJHazFVUURyTTc1a3REQytqZjYyZz09"
                    target="_blank"
                    className="shadow "
                >
                    <VideoCameraOutlined />
                    Join a Meeting
                </Button>
            </StyledDiv>
        </>
    );
};

export default meetingButton;
