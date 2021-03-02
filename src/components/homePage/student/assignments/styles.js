import styled from "styled-components";

export const StyledSection = styled.section`
    background: #f5f5f5;
    overflow: hidden;
    padding: 24px;
    .courseOutline {
        margin: 2rem 0;
    }

    .cardContent {
        margin: 0px;
        padding: 20px;
    }

    .card-container p {
        margin-bottom: 10px;
    }

    .card-container > .ant-steps-item-wait,
    .ant-steps-item-container,
    .ant-steps-item-content,
    .ant-steps-item-title {
        font-size: 0.85rem;
        padding-bottom: 6px;
    }

    .card-container > .ant-steps-item-icon {
        width: 1em;
    }

    .card-container > .ant-tabs-card .ant-tabs-content {
        min-height: 77.8vh;
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

    .ant-steps {
        padding-top: 20px;
    }

`;

export const StyledSectionStaff = styled.section`
    background: #f5f5f5;
    overflow: hidden;
    padding: 24px;
    // border: 1px solid red;
    /* width: 800px; */

    .courseOutline {
        margin: 2rem 0;
    }

    .cardContent {
        margin: 0px;
        padding: 20px;
    }

    .card-container p {
        margin-bottom: 10px;
        // border: 1px solid blue;
    }

    .card-container > .ant-steps-item-wait,
    .ant-steps-item-container,
    .ant-steps-item-content,
    .ant-steps-item-title {
        font-size: 0.85rem;
        padding-bottom: 6px;
    }

    .card-container > .ant-steps-item-icon {
        width: 1em;
    }

    .card-container > .ant-tabs-card .ant-tabs-content {
        min-height: 730px;
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
    width: 100%;
    .ant-card-head {
        margin-bottom: 0.5em;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 600;
        font-size: 20px;
        line-height: 1.4;
        border: none;
    }

    .ant-card-body {
        min-height: 70vh;
    }

    .ant-card {
        background: #ffffff;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
    }
`;

export const StyledDivSummary = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 20px;

    button {
    }
`;

export const StyledDivSummaryDashboard = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    button {
        margin-top: 10px;
    }
`;

export const StyledDivBadgeDashboard = styled.div`
    width: 100%;
    display: var(--display);
    justify-content: flex-end;
    align-items: center;

    img {
        width: 250px;
        display: var(--display);
        align-items:center;
    }
        @media only screen and (max-width: 767px) {
        flex-flow:column;
    }
`;

export const StyledDivBadge = styled.div`
    width: 100%;
    display: var(--display);
    justify-content: center;
    align-items: center;

    img {
        width: 150px;
        display: var(--display);
        align-items:center;
    }
        @media only screen and (max-width: 767px) {
        flex-flow:column;
    }
`;

export const StyledList = styled.div`
    ul {
        list-style-type: square;
    }

    li a {
        color: inherit;
    }
`;

export const StyledDivGithub = styled.div`
    margin-bottom: 50px;
`;

export const StyledDivList = styled.div`
    ul {
        padding-left: 30px;
    }
`;
