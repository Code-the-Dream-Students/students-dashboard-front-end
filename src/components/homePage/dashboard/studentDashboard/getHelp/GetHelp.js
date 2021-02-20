/** @format */

import React from "react";
import { Card, Typography } from "antd";
import { LikeOutlined } from "@ant-design/icons";

import { StyledMain, StyledHelp } from "./styles";

const GetHelp = () => {
    return (
        <>
            <StyledMain>
                <StyledHelp>
                    <a
                        href="https://www.codethedream.org/contact-us/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Card type="inner" hoverable>
                            <Typography.Title level={4} className="left">
                                <LikeOutlined />
                                Need Help?
                            </Typography.Title>
                            <p>Contact the CTD staff for assistance</p>
                        </Card>
                    </a>
                </StyledHelp>
            </StyledMain>
        </>
    );
};

export default GetHelp;
