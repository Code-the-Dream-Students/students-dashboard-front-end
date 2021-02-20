/** @format */

import React, { useContext } from "react";
import { Form, Input, Button } from "antd";
import { Typography } from "antd";
import { StyledDivGithub } from "./styles";
import UserContext from "../../contexts/UserContext";

const ASSIGNMENTS = [
    "instructions_progress",
    "resources_progress",
    "assignment_progress",
];

const GithubLink = ({
    steps,
    setStep,
    setStepStatus,
    stepStatus,
    history,
    setDisabledState,
    lesson,
    progressData,
    step,
    clickedUnitKey,
    clickedLessonKey,
}) => {
    const [authToken, setAuthToken, userInfo, setUserInfo] = useContext(UserContext);

    const onFinish = async (values) => {
        const assignment = ASSIGNMENTS[step];
        const id = userInfo.student.student_id;
        const weekNumber = progressData[clickedUnitKey][clickedLessonKey].week;

        const res = await fetch(
            `${process.env.REACT_APP_UPDATE_PROGRESS}/student_weekly_progress/${id}/week_number/${weekNumber}`,
            {
                body: JSON.stringify({
                    ...values,
                    [assignment]: "2",
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PATCH",
            }
        );

        setDisabledState(null);

        setStepStatus({ ...stepStatus, [step]: 2 });
        // Set step to next step
        setStep(step + 1);
        // Go to the next step component
        history.push(`${steps[step + 1].link}`);
    };

    return (
        <StyledDivGithub>
            <Typography.Title level={5}>Assignment</Typography.Title>
            <p style={{ marginBottom: "50px" }}>
                Your assignment for this week can be found{" "}
                <a href={lesson.assignment.link} target="_blank">
                    here.
                </a>
            </p>
            <div className="githublink cards-border">
                <Form name="horizontal_login" layout="inline" onFinish={onFinish}>
                    <Form.Item>
                        <Typography.Title level={5}>
                            <strong>
                                Your Github Repository for this Assignment
                            </strong>
                        </Typography.Title>
                        <p>Share the link of your Github Repository for Review.</p>
                    </Form.Item>
                    <Form.Item
                        name="assignment_submission"
                        rules={[
                            () => ({
                                validator(rule, value) {
                                    if (!value) {
                                        return Promise.reject(
                                            "Please add your github link"
                                        );
                                    }
                                    const reg = /^((https?|ftp|smtp):\/\/)?(www.)?github+(\.com)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
                                    if (reg.test(value)) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        "The link is not a github link"
                                    );
                                },
                            }),
                        ]}>
                        <Input
                            placeholder="Github link to submit"
                            style={{ width: 250 }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </StyledDivGithub>
    );
};

export default GithubLink;
