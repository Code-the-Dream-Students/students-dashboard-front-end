import React, { useState, useReducer } from 'react';
import { Steps, Button, Card } from 'antd';
import 'react-quill/dist/quill.snow.css';
import _ from "lodash";
import {
    FileDoneOutlined,
    YoutubeOutlined,
    GithubOutlined,
    SmileOutlined,
} from "@ant-design/icons";

import * as ROUTES from "../../../../../constants/routes";
import TextEditor from '../../../textEditor/TextEditor';
import { StyledDivSummary, StyledSection } from '../styles';

const { Step } = Steps;

const steps = [
    {
        title: "Instructions",
        link: `${ROUTES.HOME}/classes/assignments${ROUTES.INSTRUCTIONS}`,
        step: 0,
        icon: <FileDoneOutlined />,
    },
    {
        title: "Resources",
        link: `${ROUTES.HOME}/classes/assignments${ROUTES.VIDEOS}`,
        step: 1,
        icon: <YoutubeOutlined />,
    },
    {
        title: "Github Link",
        link: `${ROUTES.HOME}/classes/assignments${ROUTES.SUBMISSION}`,
        step: 2,
        icon: <GithubOutlined />,
    },
    {
        title: "Done",
        link: `${ROUTES.HOME}/classes/assignments${ROUTES.DONE}`,
        step: 3,
        icon: <SmileOutlined />,
    },
];

const CreateAssignments = () => {
    const [stepStatus, setStepStatus] = useState({});
    const [preview, setPreview] = useState('');
    const [current, setCurrent] = useState(0);
    const [step, setStep] = useState(0);

    const modalStepAction = (type) => {
        setPreview("");

        if (type === 'prev') {
            setStep(step - 1)
        } else {
            setStep(step + 1)
        }
    }

    const handleSubmit = () => {
        setPreview("");
        setStepStatus({ ...stepStatus, [step]: 2 })

        if (step < 3) {
            // Set step to next step
            setStep(step + 1);
        }
    }

    return (
        <>
            <Card>
                <h2>Preview {steps[step].title}</h2>
                <StyledSection>
                    <div className="cardContent">
                        <div className="previewContainer">
                            <div dangerouslySetInnerHTML={{ __html: preview }} />
                            <StyledDivSummary>
                                {step > 0 && step !== 3 && (
                                    <Button
                                        style={{ marginRight: "1rem" }}
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        Save
                                    </Button>
                                )}
                                {
                                    step > 0 && (
                                        <Button
                                            style={{ margin: "0 8px" }}
                                        >
                                            Previous
                                        </Button>
                                    )
                                }
                                {
                                    step < steps.length - 1 && (
                                        <Button type="primary">
                                            Next
                                        </Button>
                                    )
                                }
                            </StyledDivSummary>
                        </div>
                    </div>
                </StyledSection>
            </Card>
            <Steps current={current}>
                {
                    steps.map((item, index) => (
                        <Step
                            id={index}
                            key={item.title}
                            style={{ cursor: 'pointer' }}
                            status={stepStatus[index] === 2 ? 'finish' : null}
                            title={item.title}
                            onClick={() => setStep(index)}
                            icon={index !== 3 ? null : <SmileOutlined />}
                        />
                    ))
                }
            </Steps>
            <div className="card-container">
                <TextEditor
                    text={preview}
                    setText={setPreview}
                />
            </div>
            <StyledDivSummary>
                <Button
                    style={{ marginRight: "1rem" }}
                    type="primary"
                    htmlType="submit"
                    onClick={handleSubmit}
                >
                    Save
				</Button>
                {
                    step > 0 && (
                        <Button
                            style={{ margin: "0 8px" }}
                            onClick={() => modalStepAction('prev')}
                        >
                            Previous
                        </Button>
                    )
                }
                {
                    step < steps.length - 1 && (
                        <Button type="primary" onClick={() => modalStepAction('next')}>
                            Next
                        </Button>
                    )
                }
            </StyledDivSummary>
        </>
    )
}

export default CreateAssignments;