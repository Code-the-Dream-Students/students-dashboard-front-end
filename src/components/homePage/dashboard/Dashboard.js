/** @format */
import React, { useEffect, useContext } from "react";
// import SignUpMentor from "./studentDashboard/signUpMentor/signUpMentor";
// import EventsStaffButton from "./staffDashboard/eventsButton/eventsStaffButton";
import EventsButton from "./studentDashboard/eventsButton/eventsButton";
import MeetingButton from "./studentDashboard/meetingButton/meetingButton";
import { Row, Col, Space } from "antd";
import UserContext from "../../contexts/UserContext";
// import Progress from "./studentDashboard/progress/MainProgress";
import GetHelp from "./studentDashboard/getHelp/GetHelp";
// import TodoList from "./studentDashboard/todoList/TodoList";
import SmallCalendar from "./studentDashboard/smallCalendar/SmallCalendar";
// import AssignmentSummary from "./studentDashboard/assignmentSummary/AssignmentSummary";
import StaffTopLinks from "./staffDashboard/staffTopLinks/StaffTopLinks";
import CurrentCourses from "./staffDashboard/currentCourses/CurrentCourses";
// import Announcements from "./staffDashboard/announcements/Announcements";

const Dashboard = ({ history, menuKey, selectedKey, setSelectedKey, match }) => {
    const [authToken, setAuthToken, userInfo, setUserInfo] = useContext(UserContext);
    const { assignmentsKey, calendarKey, dashboardKey } = menuKey;

    useEffect(() => {
        setSelectedKey(dashboardKey);
    }, []);

    const displayDashboardContent = () => {
        if (userInfo.role === "student") {
            return (
                <>
                    {/* <AssignmentSummary
                        menuKey={assignmentsKey}
                        selectedKey={selectedKey}
                        setSelectedKey={setSelectedKey}
                    /> */}
                    {/* <Progress /> */}
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <GetHelp />
                        </Col>
                        {/* <Col span={12}>
                            <SignUpMentor />
                        </Col> */}
                    </Row>
                </>
            );
        } else if (userInfo.role === "staff") {
            return (
                <>
                    <StaffTopLinks match={match} />
                    <CurrentCourses />
                </>
            );
        } else {
            // Render dashboard content for more roles like "mentor", "admin"
        }
    };

    const displayRightSideContent = () => {
        if (userInfo.role === "student") {
            return (
                <>
                    {/* <Announcements /> */}
                    <EventsButton />
                    <MeetingButton />
                    {/* <TodoList /> */}
                    <SmallCalendar
                        history={history}
                        menuKey={calendarKey}
                        selectedKey={selectedKey}
                        setSelectedKey={setSelectedKey}
                    />
                </>
            );
        } else if (userInfo.role === "staff") {
            return (
                <>
                    {/* <Announcements /> */}
                    {/* <EventsStaffButton /> */}
                    <MeetingButton />
                    <SmallCalendar
                        history={history}
                        menuKey={calendarKey}
                        selectedKey={selectedKey}
                        setSelectedKey={setSelectedKey}
                    />
                </>
            );
        } else {
            // Render dashboard content for more roles like "mentor", "admin"
        }
    };

    return (
        <div className="container-fluid">
            <Row gutter={[16, 24]}>
                <Col xs={24} sm={24} md={24} lg={14} xl={16} xxl={18}>
                    <Space direction="vertical">{displayDashboardContent()}</Space>
                </Col>
                <Col xs={24} sm={24} md={24} lg={10} xl={8} xxl={6}>
                    <Space direction="vertical">{displayRightSideContent()}</Space>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
