/** @format */

import styled from "styled-components";

export const StyledDiv = styled.div`

    .ant-btn{
        color: white;
        font-size:16px;
        text-align: center;
        font-weight:600;
        border-radius: 6px;
        height:50px;     
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #12284C;
        border: 1px solid #f1f1f2;
        margin-bottom:10px;
        a{
            color: #12284c;
        }
        &:hover {
            background-color: #1890FF;
            color: white;
            border: 1px solid #1890FF;
        }
        .anticon {

        }

        @media only screen and (max-width: 996px) {
            position: fixed;
            right: 32px;
            bottom: 60px;
            z-index: 2147483640;
            cursor: pointer;
            border-radius: 50%;
            height: 70px;
            width: 70px;
            padding:0px;
            text-align:center;
            box-shadow: 7px 7px 19px -12px rgba(0, 0, 0, 0.32);
            transition: all 0.1s ease-in-out;
            span{
                margin:0px;
            }
        }

        @media only screen and (max-width: 996px) {
            .anticon {
                display:flex;
                font-size:30px;
            }
            span{
                display:none;
            }
        }
    }     
`;
