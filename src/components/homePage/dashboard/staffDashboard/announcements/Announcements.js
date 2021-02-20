/** @format */

import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { NotificationOutlined } from "@ant-design/icons";

const AnnouncementsButton = styled.div`

    .announcements-display{
        display:flex;
        justify-content:center;
        align-items:flex-start;
    }

    .announcements-display svg{
        margin-top:5px;
    }

    .ant-btn {
        color: #12284c;
        border-style: none;
        font-size: 18px;
        font-weight: 600;
        padding: 8%;
        padding-top: 40px;
        background: #fb5100;
        border-radius: 6px;
        width: 100%;
        height:180px;
        text-align: center;
        display: block;
        cursor: pointer;
        margin-bottom: 10px;
        outline: none;
        border: 1px solid #fb5100;
        
        a {
            color: #12284c;
        }

        &:hover {
            background-color: #f97575;
            border: 1px solid #f97575;
        }

        .anticon-notification {
            padding-right: 8px;
        }

        @media only screen and (max-width: 996px) {
            position: fixed;
            right: 32px;
            bottom: 240px;
            z-index: 2147483640;
            cursor: pointer;
            border-radius: 50%;
            height: 70px;
            width: 70px;
            padding: 0px;
            text-align: center;
            box-shadow: 7px 7px 19px -12px rgba(0, 0, 0, 0.32);
            transition: all 0.1s ease-in-out;

            span {
                margin: 0px;
            }

            .announcements-display svg{
                margin-top:0px;
            }

            .anticon.anticon-notification {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 30px;
            }

            p {
                display: none;
            }
        }
    }`
;

const Announcements = () => {
    return (
        <>
            <AnnouncementsButton>
                <Button className="shadow">
                    <div className="announcements-display">
                        <NotificationOutlined />
                        <p>Announcements</p>
                    </div>
                    <p>Latest News</p>
                </Button>
            </AnnouncementsButton>
        </>
    );
};
export default Announcements;
