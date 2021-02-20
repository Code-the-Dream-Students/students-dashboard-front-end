/** @format */

import React from "react";
import { Badge, Space, Card } from "antd";

import { StyledLegend } from "../studentDashboard/smallCalendar/styles";
const CalLegends = () => {
    return (
        <>
            <Space direction="vertical ">
                <StyledLegend>
                    <Card>
                        <Badge status="success" text="Assignment Start" />
                        <br />
                        <Badge status="warning" text="Assignment Deadline" />
                        <br />
                        <Badge color="#f5222d" text="Break" />
                        <br />
                        <Badge color="#7ec2f3" text="Mentor Session" />
                        <br />
                    </Card>
                </StyledLegend>
            </Space>
        </>
    );
};
export default CalLegends;
