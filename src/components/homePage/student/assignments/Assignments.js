/** @format */

import React, { useState, useEffect, useContext, useReducer } from "react";
import { Link, Switch } from "react-router-dom";
import {
    Card,
    Menu,
    Dropdown,
    Tabs,
    Button,
    Spin,
    Row,
    Col,
    // Form,
    Steps,
    Space,
    // message,
} from "antd";
import _ from "lodash";
import {
    FileDoneOutlined,
    DownOutlined,
    YoutubeOutlined,
    GithubOutlined,
    SmileOutlined,
} from "@ant-design/icons";
// import Announcements from "../dashboard/staffDashboard/announcements/Announcements";
import * as ROUTES from "../../../../constants/routes";
import { StyledSection, StyledDiv, StyledDivSummary } from "./styles";
import UserContext from "../../../contexts/UserContext";
import PrivateRoute from "../../../routes/PrivateRoute";
import Instructions from "./Instructions";
import Summary from "./Summary";
import Videos from "./Resources";
import GithubLink from "./GithubLink";
import EventsButton from "../../dashboard/studentDashboard/eventsButton/eventsButton";
import MeetingButton from "../../dashboard/studentDashboard/meetingButton/meetingButton";
import Done from "./Done";
// import TodoList from "../dashboard/studentDashboard/todoList/TodoList";
import SmallCalendar from "../../dashboard/studentDashboard/smallCalendar/SmallCalendar";
const { TabPane } = Tabs;
const { Step } = Steps;

const INITIAL_STATE = {};

const ACTIONS_CLASS_INFO = {
    SET_COURSE: "course",
    SET_UNITS: "units",
    SET_LESSONS: "lessons",
    SET_SOURCES: "sources",
    SET_ALL: "all",
};

const reducerClassInfo = (state, action) => {
    switch (action.type) {
        case ACTIONS_CLASS_INFO.SET_COURSES:
            return { ...state, [action.payload.field]: action.payload.value };
        case ACTIONS_CLASS_INFO.SET_UNITS:
            return { ...state, [action.payload.field]: action.payload.value };
        case ACTIONS_CLASS_INFO.SET_LESSONS:
            return { ...state, [action.payload.field]: action.payload.value };
        case ACTIONS_CLASS_INFO.SET_SOURCES:
            return { ...state, [action.payload.field]: action.payload.value };
        case ACTIONS_CLASS_INFO.SET_ALL:
            return { ...action.payload.value };
        default:
            throw new Error();
    }
};

const ACTIONS_PROGRESS = {
    SET_WEEK: "week",
    SET_ALL: "all",
};

const reducerProgress = (state, action) => {
    switch (action.type) {
        case ACTIONS_PROGRESS.SET_WEEK:
            return { ...state, [action.payload.field]: action.payload.value };
        case ACTIONS_PROGRESS.SET_ALL:
            return { ...action.payload.value };
        default:
            throw new Error();
    }
};

const Assignments = ({ match, history }) => {
    const [state, setState] = useState({ key: "Week 1" });
    const [disabledState, setDisabledState] = useState(true);
    const { key } = state;
    const [clickedUnitKey, setClickedUnitKey] = useState(0);
    const [clickedLessonKey, setClickedLessonKey] = useState(0);
    const [stepStatus, setStepStatus] = useState({});
    // const [stepStatus, setStepStatus] = useState([])
    const [current, setCurrent] = useState(-1);
    const [step, setStep] = useState(-1);
    const [classInfo, dispatchClass] = useReducer(reducerClassInfo, INITIAL_STATE);
    const [progressData, dispatchProgress] = useReducer(
        reducerProgress,
        INITIAL_STATE
    );
    const [authToken, setAuthToken, userInfo, setUserInfo] = useContext(UserContext);

    console.log(userInfo);

    const stepsPath = {
        "/home/assignments": -1,
        "/home/assignments/instructions": 0,
        "/home/assignments/videos": 1,
        "/home/assignments/submission": 2,
        "/home/assignments/done": 3,
    };

    const assignments = [
        "instructions_progress",
        "resources_progress",
        "assignment_progress",
    ];

    console.log(progressData);

    // useEffect(() => {
    //     const getAssignments = async () => {
    //         const dataUnits = await fetch(
    //             `${process.env.REACT_APP_GET_COURSES}${userInfo.student.student_course.course.id}`
    //         );
    //         const resUnits = await dataUnits.json();
    //         console.log(resUnits);
    //         dispatchClass({
    //             type: "all",
    //             payload: { field: "all", value: resUnits.course },
    //         });
    //     };
    //     getAssignments();
    // }, []);

    useEffect(() => {
        const getAssignments = async () => {
            const dataUnits = await fetch(`${process.env.REACT_APP_GET_COURSES}/${userInfo.student.student_course.course.id}`);
            const resUnits = await dataUnits.json();
            console.log(resUnits);
            dispatchClass({
                type: "all",
                payload: { field: "all", value: resUnits.course },
            });
        };
        getAssignments();
    }, []);

    useEffect(() => {
        determineStep(history.location.pathname);
    }, [history.location.pathname]);

    // Populate progress per week when week tab changes
    useEffect(() => {
        setStepsStatusFinish();
    }, [clickedLessonKey]);

    useEffect(() => {
        setStepsStatusFinish();
    }, [clickedUnitKey]);

    const setStepsStatusFinish = async () => {
        const progress = await getProgressData();

        setStepStatus({
            0: progress[clickedUnitKey][clickedLessonKey].instructions_progress,
            1: progress[clickedUnitKey][clickedLessonKey].resources_progress,
            2: progress[clickedUnitKey][clickedLessonKey].assignment_progress,
        });

        if (progress[clickedUnitKey][clickedLessonKey].assignment_progress === 2) {
            setDisabledState(null);
        } else {
            setDisabledState(true);
        }

        dispatchProgress({
            type: "all",
            payload: { field: "all", value: progress },
        });
        // setStepStatus({ 0: parseInt(progress[clickedUnitKey][clickedLessonKey].Instructions), 1: parseInt(progress[clickedUnitKey][clickedLessonKey].Treehouse), 2: parseInt(progress[clickedUnitKey][clickedLessonKey].Assignment) })

        // dispatchProgress({
        //     type: "all",
        //     payload: { field: "all", value: progress },
        // });
    };

    // const getProgressData = async () => {
    //     const response = await fetch(
    //         process.env.REACT_APP_AIRTABLE_LINK
    //     );
    //     const data = await response.json();
    //     console.log(data)
    //     return data.records.reduce((acc, curr) => {
    //         switch (curr.fields.Unit) {
    //             case 'Frontend 1':
    //                 return { ...acc, 0: [...acc[0], { id: curr.id, ...curr.fields }] }
    //             case 'Frontend 2':
    //                 return { ...acc, 1: [...acc[1], { id: curr.id, ...curr.fields }] }
    //         }

    //     }, { 0: [], 1: [] })
    // };

    const getProgressData = async () => {
        const id = userInfo.student.student_id;
        const response = await fetch(
            `${process.env.REACT_APP_GET_PROGRESS}/${id}/student_tracking`
        );
        const data = await response.json();
        const units = data.units;

        return Object.keys(units).reduce((acc, curr, index) => {
            return { ...acc, [index]: units[curr] };
        }, {});
        // return data.reduce((acc, curr) => {
        //     switch (curr.week.unit.unit_name) {
        //         case 'Front-End 1':
        //             return { ...acc, 0: [...acc[0], { ...curr }] }
        //         case 'Front-End 2':
        //             return { ...acc, 1: [...acc[1], { ...curr }] }
        //     }
        // }, { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [] })
    };

    const determineStep = (pathLocation) => {
        setStep(stepsPath[pathLocation]);
    };

    const menu = () => {
        return (
            <Menu onClick={({ key }) => setClickedUnitKey(key)}>
                {
                    classInfo ? (
                        classInfo.units.map((unit, index) => (
                            <Menu.Item key={index}>
                                <a target="_blank" rel="noopener noreferrer">
                                    {unit.unit_name}
                                </a>
                            </Menu.Item>
                        )
                        )
                    ) : null
                }
            </Menu>
        );
    };

    const AssignmentsDropdown = () => {
        return (
            <Dropdown overlay={menu}>
                <Button
                    type="primary"
                    className="ant-dropdown-link"
                    to="#"
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                >
                    Your Units <DownOutlined />
                </Button>
            </Dropdown>
        );
    };

    const steps = [
        {
            title: "Instructions",
            link: `${match.path}${ROUTES.INSTRUCTIONS}`,
            icon: <FileDoneOutlined />,
        },
        {
            title: "Resources",
            link: `${match.path}${ROUTES.VIDEOS}`,
            icon: <YoutubeOutlined />,
        },
        {
            title: "Github Link",
            link: `${match.path}${ROUTES.SUBMISSION}`,
            icon: <GithubOutlined />,
        },
        {
            title: "Done",
            link: `${match.path}${ROUTES.DONE}`,
            icon: <SmileOutlined />,
        },
    ];

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = async () => {
        let assignment = assignments[step];
        const id = userInfo.student.student_id;
        const weekNumber = progressData[clickedUnitKey][clickedLessonKey].week;

        // Store step after save progress button is clicked
        setStepStatus({ ...stepStatus, [step]: 2 });
        // setStepStatus([...stepStaus, step]);

        // const res = await fetch(process.env.REACT_APP_UPDATE_PROGRESS_COPY, {
        //     body: JSON.stringify({
        //         records: [
        //             {
        //                 id: progressData[clickedUnitKey][clickedLessonKey].id,
        //                 fields: {
        //                     [assignment]: '2',
        //                 },
        //             },
        //         ],
        //     }),
        //     headers: {
        //         Authorization: "Bearer keyclOytaXo7NHQ8M",
        //         "Content-Type": "application/json",
        //     },
        //     method: "PATCH",
        // });

        const res = await fetch(
            `${process.env.REACT_APP_API_ROOT}/student_weekly_progress/${id}/week_number/${weekNumber}`,
            {
                body: JSON.stringify({
                    [assignment]: "2",
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PATCH",
            }
        );
        // Set step to next step
        nextStep();
        // Go to the next step component
        history.push(`${steps[step + 1].link}`);
    };

    console.log(clickedLessonKey);
    console.log(clickedUnitKey);

    const tabPanes = (classKey) => {
        return classInfo.units[classKey].lessons.map((lesson, index) => {
            return (
                <TabPane
                    tab={<Link to={match.path}>Week {index + 1}</Link>}
                    key={`${index}`}
                >
                    <Steps size="small" current={current}>
                        {
                            !_.isEmpty(stepStatus) ? steps.map((item, index) =>
                                index === 3 ? (
                                    <Step
                                        id={index}
                                        key={item.title}
                                        status={
                                            stepStatus[2] === 2 ? "finish" : null
                                        }
                                        title={
                                            stepStatus[2] === 2 ? (
                                                <Link
                                                    to={item.link}
                                                    style={{ color: "inherit" }}
                                                >
                                                    {item.title}
                                                </Link>
                                            ) : (
                                                    item.title
                                                )
                                        }
                                        icon={
                                            index !== 3 ? null : <SmileOutlined />
                                        }
                                    />
                                ) : (
                                        <Step
                                            id={index}
                                            key={item.title}
                                            status={
                                                stepStatus[index] === 2 ? "finish" : null
                                            }
                                            title={
                                                <Link
                                                    to={item.link}
                                                    style={{ color: "inherit" }}>
                                                    {item.title}
                                                </Link>
                                            }
                                            icon={
                                                index !== 3 ? null : <SmileOutlined />
                                            }
                                        />
                                    )
                            ) : null
                        }
                    </Steps>
                    <div className="cardContent">
                        <Switch>
                            <PrivateRoute
                                exact
                                path={`${match.path}`}
                                lesson={lesson.lesson_name}
                                weekNumber={index + 1}
                                unit={
                                    classInfo ? classInfo.units[clickedUnitKey] : null
                                }
                                component={Summary}
                            />
                            <PrivateRoute
                                exact
                                path={`${match.path}${ROUTES.INSTRUCTIONS}`}
                                lesson={lesson.lesson_name}
                                component={Instructions}
                            />
                            <PrivateRoute
                                exact
                                path={`${match.path}${ROUTES.VIDEOS}`}
                                lessons={
                                    classInfo.units[clickedUnitKey].lessons[
                                    clickedLessonKey
                                    ]
                                }
                                component={Videos}
                            />
                            <PrivateRoute
                                exact
                                path={`${match.path}${ROUTES.SUBMISSION}`}
                                lesson={lesson}
                                progressData={progressData}
                                clickedUnitKey={clickedUnitKey}
                                clickedLessonKey={clickedLessonKey}
                                step={step}
                                steps={steps}
                                disabledState={disabledState}
                                setDisabledState={setDisabledState}
                                stepStatus={stepStatus}
                                setStepStatus={setStepStatus}
                                setStep={setStep}
                                history={history}
                                component={GithubLink}
                            />
                            <PrivateRoute
                                exact
                                path={`${match.path}${ROUTES.DONE}`}
                                component={Done}
                            />
                        </Switch>
                        <StyledDivSummary>
                            {step !== -1 && step !== 3 ? (
                                <Button
                                    id={index}
                                    style={{ marginRight: "1rem" }}
                                    type="primary"
                                    htmlType="submit"
                                    onClick={handleSubmit}
                                    disabled={
                                        step === 2 && disabledState ? true : null
                                    }>
                                    Save Progress
                                </Button>
                            ) : null}
                            {step > -1 && (
                                <Link
                                    to={
                                        step > 0 ? steps[step - 1].link : match.path
                                    }>
                                    <Button
                                        style={{ margin: "0 8px" }}
                                        onClick={() => prevStep()}>
                                        Previous
                                    </Button>
                                </Link>
                            )}
                            {step < steps.length - 1 &&
                                (step === 2 ? (
                                    <Link to={steps[step + 1].link}>
                                        <Button
                                            type="primary"
                                            disabled={
                                                stepStatus[2] === 2 ? null : true
                                            }
                                            onClick={() => nextStep()}>
                                            Next
                                        </Button>
                                    </Link>
                                ) : (
                                        <Link to={steps[step + 1].link}>
                                            <Button
                                                type="primary"
                                                onClick={() => nextStep()}>
                                                Next
                                        </Button>
                                        </Link>
                                    ))}
                        </StyledDivSummary>
                    </div>
                </TabPane>
            );
        });
    };

    return (
        <div className="container-fluid">
            <Row>
                <Col xs={24} sm={24} md={24} lg={14} xl={16} xxl={18}>
                    <StyledDiv>
                        {!_.isEmpty(classInfo) ? (
                            <Card
                                title={
                                    !_.isEmpty(classInfo)
                                        ? classInfo.units[clickedUnitKey].unit_name
                                        : null
                                }
                                extra={<AssignmentsDropdown />}
                                activeTabKey={key}>
                                <StyledSection>
                                    <div className="card-container">
                                        <Tabs
                                            type="card"
                                            onChange={(key) =>
                                                setClickedLessonKey(key)
                                            }
                                        >
                                            {tabPanes(clickedUnitKey)}
                                        </Tabs>
                                    </div>
                                </StyledSection>
                            </Card>
                        ) : (
                                <Row>
                                    <Col span={12} offset={12}>
                                        <Spin size="large" />
                                    </Col>
                                </Row>
                            )}
                    </StyledDiv>
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
                        {/* <Announcements /> */}
                        <EventsButton />
                        <MeetingButton />
                        {/* <TodoList /> */}
                        <SmallCalendar history={history} />
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default Assignments;
