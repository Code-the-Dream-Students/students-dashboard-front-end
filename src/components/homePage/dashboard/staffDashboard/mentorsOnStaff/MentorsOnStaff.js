/** @format */

import React from "react";
import { Row, Col, Space } from "antd";
import MentorsHeader from "../mentorsHeader/MentorsHeader";
import MentorsTable from "../mentorsTable/MentorsTable";
import SmallCalendar from "../smallCalendar/SmallCalendar";
import EventsButton from "../eventsButton/eventsStaffButton";
import MeetingButton from "../meetingButton/meetingButton";
import Announcements from "../announcements/Announcements";

const MentorsOnStaff = () => {
    return (
        <div className="container-fluid">
            <Row gutter={[16, 24]}>
                <Col xs={24} sm={24} md={24} lg={14} xl={16} xxl={18}>
                    <Space direction="vertical">
                        <MentorsTable />
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
                        <SmallCalendar />
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default MentorsOnStaff;
