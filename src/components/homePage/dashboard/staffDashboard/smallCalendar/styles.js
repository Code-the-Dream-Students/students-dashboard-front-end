/** @format */

import styled from "styled-components";

export const StyledCalendar = styled.div`
    @media only screen and (max-width: 991px) {
        .staffCalendar {
            display: none;
        }
    }
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
