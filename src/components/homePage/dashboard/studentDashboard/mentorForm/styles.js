/** @format */

import styled from "styled-components";

export const StyledMain = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    width: 100%;
    .anticon {
        padding-right: 5px;
    }
    a {
        width: 100%;
    }
`;

export const StyledSignUp = styled.div`
    width: 100%;
    .ant-card {
        background-color: #ffd95e;
        .ant-card-body {
            padding: 45px;
        }
    }
`;
