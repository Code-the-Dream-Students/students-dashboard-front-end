import React, { useEffect, useContext } from "react";
import { Row, Col, Space } from "antd";

import UserContext from "../../contexts/UserContext";
import Progress from "./studentDashboard/progress/MainProgress";
import GetHelp from "./studentDashboard/getHelp/GetHelp";
import TodoList from "./studentDashboard/todoList/TodoList";
import SmallCalendar from "./studentDashboard/smallCalendar/SmallCalendar";
import AssignmentSummary from "./studentDashboard/assignmentSummary/AssignmentSummary";
import HomeButtons from "./studentDashboard/homeButtons/HomeButtons";
import StaffTopLinks from "./staffDashboard/staffTopLinks/StaffTopLinks";
import CurrentCourses from "./staffDashboard/currentCourses/CurrentCourses";
import Announcements from "./staffDashboard/announcements/Announcements";


const Dashboard = ({ history, menuKey, selectedKey, setSelectedKey }) => {
    const [authToken, setAuthToken, userInfo, setUserInfo] = useContext(UserContext);
    const { assignmentsKey, calendarKey, dashboardKey } = menuKey;

    useEffect(() => {
        setSelectedKey(dashboardKey);
    }, [])

    const displayDashboardContent = () => {
        if (userInfo.role === 'student') {
            return (
                <>
                    <AssignmentSummary
                        menuKey={assignmentsKey}
                        selectedKey={selectedKey}
                        setSelectedKey={setSelectedKey}
                    />
                    <Progress />
                    <GetHelp />
                </>
            )
        } else if (userInfo.role === 'staff') {
            return (
                <>
                    <StaffTopLinks />
                    <CurrentCourses />
                </>
            )
        } else {
            // Render dashboard content for more roles like "mentor", "admin"
        }
    }

    const displayRightSideContent = () => {
        if (userInfo.role === 'student') {
            return (
                <>
                    <HomeButtons />
                    <TodoList />
                    <SmallCalendar
                        history={history}
                        menuKey={calendarKey}
                        selectedKey={selectedKey}
                        setSelectedKey={setSelectedKey}
                    />
                </>
            )
        } else if (userInfo.role === 'staff') {
            return (
                <>
                    <Announcements />
                    <HomeButtons />
                    <SmallCalendar
                        history={history}
                        menuKey={calendarKey}
                        selectedKey={selectedKey}
                        setSelectedKey={setSelectedKey}
                    />
                </>
            )
        } else {
            // Render dashboard content for more roles like "mentor", "admin"
        }
    }

    return (
        <div className="container-fluid">
            <Row gutter={[16, 24]}>
                <Col xs={24} sm={24} md={24} lg={14} xl={16} xxl={18}>
                    <Space direction="vertical">
                        {
                            displayDashboardContent()
                        }
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
                        {
                            displayRightSideContent()
                        }
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
