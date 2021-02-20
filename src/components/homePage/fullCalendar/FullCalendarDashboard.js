/** @format */

import React, { useState, useContext, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Modal, Card, Button, Popover, Space, Descriptions, Row, Col } from "antd";
import CalLegends from "../dashboard/calLegends/CalLegends";
import makeDate from "./utils/makeDate";
import moment from "moment";
import CalendarContext from "../../contexts/CalendarContext";
import UserContext from "../../contexts/UserContext";
import "./styles.css";

const FullCalendarDashboard = ({ menuKey, setSelectedKey }) => {
    const [selectedDate, setSelectedDate] = useContext(CalendarContext);
    const [authToken, setAuthToken,  userInfo , setUserInfo] = useContext(UserContext);
    const [visible, setVisibility] = useState(false);
    const [eventsInfo, setEvents] = useState([]);
    const [mentorsInfo, setMentorEvents] = useState([]);
    /*     console.log(userInfo); */
    const [state, setState] = useState({
        weekendsVisible: true,
        visible: false,
        currentEvents: [],
    });

    useEffect(() => {
        setSelectedKey(menuKey);
    }, []);

    useEffect(() => {
        if (userInfo) {
            getMentorEventData();
            getEventsData();
        }
    }, [userInfo]);

    const getMentorEventData = async () => {
        const data = await fetch(
            `https://forked-student-dashboard.herokuapp.com/mentor_courses/${userInfo.student.student_weekly_progresses[0].week.course_id}`
        );
        const mentorsInfo = await data.json();
        const sessions = mentorsInfo.reduce((acc, cur) => {
            const day = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ];
            console.log(day.indexOf(cur.day));
            return [
                ...acc,
                {
                    title: `${cur.mentor.first_name} ${cur.mentor.last_name}`,
                    daysOfWeek: [day.indexOf(cur.day)],
                    startTime: cur.start,
                    endTime: cur.end,
                    display: "block",
                    color: "#d2eafb",
                    textColor: "black",
                    extendedProps: {
                        firstName: cur.mentor.first_name,
                        lastName: cur.mentor.last_name,
                        description: cur.course.description,
                    },
                },
            ];
        }, []);

        console.log(mentorsInfo);
        
        setEvents((prevState) => {
            return [...prevState, ...sessions];
        });
    };

    const getEventsData = async () => {
        const data = await fetch(
            `https://students-dashboard-back-end.herokuapp.com/courses/${userInfo.student.student_weekly_progresses[0].week.course_id}/weeks`
        );
        const weeksInfo = await data.json();
        //console.log(weeks);
        const infoEvents = weeksInfo.weeks.reduce((acc, cur) => {
            return [
                ...acc,
                {
                    title: `${cur.unit.unit_name} - Week ${cur.week_number}`,
                    start: cur.start_date,
                    end: cur.start_date,
                    color: "#00a854",
                    textColor: "white",
                    extendedProps: {
                        unit: cur.unit.unit_name,
                        description: cur.unit.description,
                        lesson_name: cur.lesson.lesson_name,
                        end: cur.end_date,
                    },
                },

                {
                    title: `${cur.unit.unit_name} - Week ${cur.week_number}`,
                    start: cur.end_date,
                    end: cur.end_date,
                    color: "#ffce3d",
                    textColor: "black",
                    extendedProps: {
                        unit: cur.unit.unit_name,
                        description: cur.unit.description,
                        lesson_name: cur.lesson.lesson_name,
                        end: cur.end_date,
                    },
                },
            ];
        }, []);
        console.log(infoEvents);
        setEvents((prevState) => {
            return [...prevState, ...infoEvents];
        });
    };

    /*  const showModal = (selectInfo) => {
        setVisibility(true);
    };

    const handleOk = (e) => {
        console.log(e);
        setVisibility(false);
    };

    const handleCancel = (e) => {
        setVisibility(false);
    };

    const handleDateSelect = (selectInfo) => {
        // let title = prompt("Please enter a new title for your event");
        showModal();

        let calendarApi = selectInfo.view.calendar;

        calendarApi.unselect(); // clear date selection
 */
    // if (title) {
    //     calendarApi.addEvent({
    //         id: createEventId(),
    //         title,
    //         start: selectInfo.startStr,
    //         end: selectInfo.endStr,
    //         allDay: selectInfo.allDay,
    //     });
    // }
    /*    }; */

    /*const handleEventClick = (clickInfo) => {
        console.log(clickInfo);
        if (
            window.confirm(
                `Are you sure you want to delete the event '${clickInfo.event.title}'`
            )
        ) {
            clickInfo.event.remove();
        }
    };*/

    const handleEvents = (events) => {
        setState({
            ...state,
            currentEvents: events,
        });
    };

    return (
        <div className="container-fluid">
            <Row gutter={8}>
                <Col xs={24} sm={24} md={16} lg={16} xl={18} xxl={18}>
                    <div className="site-layout-background">
                        <div className="container-fluid">
                            <Card>
                                <FullCalendar
                                    plugins={[
                                        dayGridPlugin,
                                        timeGridPlugin,
                                        interactionPlugin,
                                        listPlugin,
                                    ]}
                                    headerToolbar={{
                                        left: "prev,next today",
                                        center: "title",
                                        right:
                                            "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                                    }}
                                    dateClick={(info) => {
                                        console.log(info);
                                    }}
                                    now={selectedDate ? selectedDate._d : null}
                                    initialView="dayGridMonth"
                                    editable={false}
                                    selectable={true}
                                    selectMirror={true}
                                    dayMaxEvents={true}
                                    weekends={true}
                                    events={eventsInfo} // alternatively, use the `events` setting to fetch from a feed
                                    select={""}
                                    eventContent={renderEventContent} // custom render function
                                    eventClick={""}
                                    eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                                    /*eventAdd={}
                                    eventChange={function () {}}
                                    eventRemove={function () {}}*/
                                />
                            </Card>
                        </div>
                    </div>
                </Col>
                <Col>
                    <Space direction="vertical ">
                        <CalLegends />
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

const renderContent = (eventInfo) => {
    return (
        <div>
            <Descriptions title={eventInfo.event.title} layout="horizontal" bordered>
                <Descriptions.Item label="Unit Name:" span={3}>
                    {eventInfo.event.extendedProps.unit}
                </Descriptions.Item>
                <Descriptions.Item label="Description:" span={3}>
                    {eventInfo.event.extendedProps.description}
                </Descriptions.Item>
                <Descriptions.Item label="Lesson Name:" span={3}>
                    {eventInfo.event.extendedProps.lesson_name}
                </Descriptions.Item>
                <Descriptions.Item label="Due Date:" span={3}>
                    {eventInfo.event.extendedProps.end}
                </Descriptions.Item>
            </Descriptions>

            {/*  <Descriptions
                title={mentorsInfo.event.title}
                layout="horizontal"
                bordered>
                <Descriptions.Item label="About the Mentor:" span={3}>
                    {mentorsInfo.event.mentor.title}
                </Descriptions.Item>
                <Descriptions.Item label="Day:" span={3}>
                    {mentorsInfo.event.daysOfWeek}
                </Descriptions.Item>
                <Descriptions.Item label="Start Time:" span={3}>
                    {mentorsInfo.eventstartTime}
                </Descriptions.Item>
                <Descriptions.Item label="End Time:" span={3}>
                    {mentorsInfo.event.endTime}
                </Descriptions.Item>
                <Button>Sign Up for Mentor Session</Button>
            </Descriptions> */}
        </div>
    );
};

function renderEventContent(eventInfo) {
    return (
        <>
            {}
            <Popover content={renderContent(eventInfo)}>
                <div>{eventInfo.event.title}</div>
            </Popover>
        </>
    );
}

export default FullCalendarDashboard;
