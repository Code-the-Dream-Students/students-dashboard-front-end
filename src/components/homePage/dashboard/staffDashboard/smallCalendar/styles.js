/** @format */

import styled from "styled-components";

export const StyledDiv = styled.div`
    display: flex;
    flex-flow: column wrap;
    max-width: 300px;
    font-size: 8px;
    border: 1px solid #f0f0f0;
    border-radius: 2px;
`;

export const StyledLegend = styled.div`
    width:100%;
    .ant-card{
        margin-top:15px;
    }
`;

export const StyledEvents = styled.div`
    list-style: none;
    margin: 0 auto;
    padding-left: 10px;
    text-align: center;
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
`;
