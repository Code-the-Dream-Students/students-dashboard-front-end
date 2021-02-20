/** @format */

import React from "react";
import styled from "styled-components";
import { SlackOutlined, GithubOutlined } from "@ant-design/icons";
import ctd from "./graphics/ctd.png";
import treehouse from "./graphics/treehouse.png";

const FooterBottom = styled.footer`
    z-index: 4;
    width: 100%;
    flex: none;
    display: block;
    font-weight: 300;
    background-color: #12284c;
    color: white;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem;
    height: 60px;
    @media only screen and (max-width: 767px) {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        height: 100px;
        padding-left: 0;
    }
`;

const Copyright = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-left: 20px;
    text-transform: uppercase;
    font-size: 0.8rem;
    span {
        padding-top: 0px;
        font-size: 20px;
        color: white;
    }
`;

const Icon = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    width: 180px;
    padding-right: 20px;
    img {
        width: 18px;
    }
    @media only screen and (max-width: 767px) {
        padding-right: 0;
        padding-top: 12px;
    }
`;

const FooterLinks = styled.a`
    display: flex;
    font-size: 20px;
    color: white;
    &:hover {
        color: white;
        cursor: pointer;
    }
`;

const FooterPage = () => {
    return (
        <>
            <FooterBottom>
                <Copyright>
                    Copyright © Code the Dream · All Rights Reserved
                </Copyright>
                <Icon>
                    <FooterLinks
                        href="https://www.codethedream.org/"
                        target="_blank"
                    >
                        <img src={ctd} alt="Code The Cream"></img>
                    </FooterLinks>
                    <FooterLinks
                        href="https://teamtreehouse.com/home"
                        target="_blank"
                    >
                        <img src={treehouse} alt="Team Treehouse"></img>
                    </FooterLinks>
                    <FooterLinks
                        href="https://app.slack.com/client/T07EHJ738/learning-slack"
                        target="_blank"
                    >
                        <SlackOutlined />
                    </FooterLinks>
                    <FooterLinks
                        href="https://github.com/Code-the-Dream-School?type=source"
                        target="_blank"
                    >
                        <GithubOutlined />
                    </FooterLinks>
                </Icon>
            </FooterBottom>
        </>
    );
};

export default FooterPage;
