/** @format */

import React, { useEffect } from "react";
import { Card, Row, Col, Space } from "antd";
import ChangePass from "./ChangePass";
import Students from "../../staff/staffStudentsManagement/Students";
import AO3 from "./AO3";
import Announcements from "../staffDashboard/announcements/Announcements";
import EventsButton from "../studentDashboard/eventsButton/eventsButton";
import MeetingButton from "../studentDashboard/meetingButton/meetingButton";
import TodoList from "../studentDashboard/todoList/TodoList";
import SmallCalendar from "../studentDashboard/smallCalendar/SmallCalendar";

const ProfilePage = ({ history }) => {
    return (
        <div>
            <Row gutter={[16, 24]}>
                <Col xs={24} sm={24} md={24} lg={14} xl={16} xxl={18}>
                    <Space direction="vertical">
                        <AO3 />
                        <ChangePass />
                    </Space>
                </Col>
                <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={10}
                    xl={8}
                    xxl={6}
                    className="site-layout-right">
                    <Space direction="vertical">
                        <Announcements />
                        <EventsButton />
                        <MeetingButton />
                        <TodoList />
                        <SmallCalendar history={history} />
                    </Space>
                </Col>
            </Row>
        </div>
    );
};
// }

export default ProfilePage;
