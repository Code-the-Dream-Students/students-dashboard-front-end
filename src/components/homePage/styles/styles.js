/** @format */

import styled from "styled-components";

export const StyledSection = styled.section`
    background: #f5f5f5;
    overflow: hidden;
    padding: 24px;

    .courseOutline {
        margin: 2rem 0;
    }

    .cardContent {
        margin: 0 1rem;
    }

    .card-container p {
        margin: 0;
    }

    .card-container > .ant-tabs-card .ant-tabs-content {
        height: 300px;
        margin-top: -16px;
    }

    .card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
        background: #fff;
        padding: 16px;
    }

    .card-container > .ant-tabs-card > .ant-tabs-nav::before {
        display: none;
    }

    .card-container > .ant-tabs-card .ant-tabs-tab,
    [data-theme="compact"] .card-container > .ant-tabs-card .ant-tabs-tab {
        border-color: transparent;
        background: transparent;
    }

    .card-container > .ant-tabs-card .ant-tabs-tab-active,
    [data-theme="compact"] .card-container > .ant-tabs-card .ant-tabs-tab-active {
        border-color: #fff;
        background: #fff;
    }

    [data-theme="compact"] .card-container > .ant-tabs-card .ant-tabs-content {
        height: 120px;
        margin-top: -8px;
    }

    [data-theme="dark"] .card-container > .ant-tabs-card .ant-tabs-tab {
        border-color: transparent;
        background: transparent;
    }

    [data-theme="dark"] #components-tabs-demo-card-top .code-box-demo {
        background: #000;
    }

    [data-theme="dark"]
        .card-container
        > .ant-tabs-card
        .ant-tabs-content
        > .ant-tabs-tabpane {
        background: #141414;
    }

    [data-theme="dark"] .card-container > .ant-tabs-card .ant-tabs-tab-active {
        border-color: #141414;
        background: #141414;
    }
`;

export const StyledDiv = styled.div`
    .ant-card-head {
        border-bottom: none;
    }
`;

export const HeaderPage = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    box-shadow: 7px 7px 19px -12px rgba(0, 0, 0, 0.32);
`;

export const Logo = styled.div`
    justify-content: flex-start;
    align-items: center;
    padding-left: 20px;
`;

export const TopNav = styled.div`
    display: flex;
    padding: 0px;
    padding-right: 30px;
    justify-content: space-between;
    align-items: center;
    color: #ccc;
    font-size: 18px;
    width: 160px;
`;

export const FooterBottom = styled.footer`
    z-index: 4;
    width: 100%;
    flex: none;
    display: block;
    font-weight: 500;
    color: #272727;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
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

export const Copyright = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-transform: uppercase;
    font-size: 0.8rem;
    span {
        padding-top: 0px;
        font-size: 20px;
    }
`;

export const Icon = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #272727;
    width: 180px;
    padding-right: 20px;
    img {
        width: 18px;
        filter: invert(100%);
    }
    @media only screen and (max-width: 767px) {
        padding-right: 0;
        padding-top: 12px;
    }
`;

export const FooterLinks = styled.a`
    display: flex;
    font-size: 20px;
    color: #272727;
    &:hover {
        color: #272727;
        cursor: pointer;
    }
`;
