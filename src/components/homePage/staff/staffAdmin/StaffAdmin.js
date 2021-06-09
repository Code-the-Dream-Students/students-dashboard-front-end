import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import SmallCalendar from "../../dashboard/staffDashboard/smallCalendar/SmallCalendar";
import MeetingButton from "../../dashboard/staffDashboard/eventsButton/eventsStaffButton";

import { Typography, Card, Row, Col, Space, Input, Spin } from "antd";
const { Title } = Typography;

//  StaffHomeContent -> parent component
const StaffAdmin = () => {
  const [authToken] = useContext(UserContext);
  return (
    <Row>
      <Col span={24} lg={16}>
        <Card type="inner" className="cards-border">
          <Title level={4}>Admin Roles</Title>
        </Card>
      </Col>
      <Col span={24} lg={8} style={{paddingLeft: 15}}>
        <MeetingButton />
        <SmallCalendar />
      </Col>
    </Row>
  );
};

export default StaffAdmin;
