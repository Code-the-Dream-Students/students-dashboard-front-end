/** @format */

import styled from "styled-components";

export const StyledDiv = styled.div`
    display: flex;
    flex-flow: column wrap;
    max-width: 300px;
    font-size: 8px;
    border: 1px solid #f0f0f0;
    border-radius: 2px;
    border: none;

    .ant-picker-calendar .ant-picker-calendar-mini {
        border: none;
    }

    .ant-row {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
    }

    .ant-typography,
    .ant-typography h5 {
        margin: 0px;
    }

    @media only screen and (max-width: 996px) {
        .ant-space-item {
            display: none;
        }
    }
`;

export const StyledLegend = styled.div`
    margin-left: 15px;
    width: 100%;
    
    .ant-card .ant-card-bordered {
        width: 100%;
    }
    
    @media only screen and (max-width: 880px) {
        margin-left: 0;
        margin-top: 20px;
        .ant-card .ant-card-bordered {
            display: flex;
            width: 100%;
        }
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
