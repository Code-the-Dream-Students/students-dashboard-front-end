/** @format */

import React, { useState } from "react";
import { Card, Row, Col, Typography, Modal, Form, Input, Button } from "antd";
import styled from "styled-components";

import { PlusOutlined } from "@ant-design/icons";

//Form Constants
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: "${label} is required!",
};

const CurrentCourses = () => {
    const Container = styled.div`
        display: flex;
        flex-flow: column;

        .ant-btn p {
            display: inline-block;
            text-align: center;
            margin-left: 10px;
        }

        @media only screen and (max-width: 996px) {
            flex-flow: column;
        }
    `;
    const TextBox = styled.div`
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        height: 140px;
        text-align: center;
        @media only screen and (max-width: 996px) {
            margin-right: 0;
        }
    `;

    //Modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    //Modal Form
    const onFinish = (values) => {
        console.log(values);
    };

    return (
        <>
            <Card
                type="inner"
                hoverable
                className="cards-border"
                style={{ paddingTop: 10 }}>
                <Container>
                    <Row gutter={[18, 6]} justify="center" align="top">
                        <Col span={22}>
                            <Typography.Title level={4} className="left">
                                Current Courses
                            </Typography.Title>
                        </Col>
                        <Col span={2}>
                            <Button
                                type="primary"
                                shape="circle"
                                size="medium"
                                style={{
                                    display: "flex",
                                    alignSelf: "flex-end",
                                    textAlign: "center",
                                }}
                                onClick={showModal}>
                                <p>+</p>
                            </Button>
                        </Col>
                    </Row>

                    <Modal
                        title="Create Course"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}>
                        <Form
                            {...layout}
                            name="nest-messages"
                            onFinish={onFinish}
                            validateMessages={validateMessages}>
                            <Form.Item
                                name={["user", "name"]}
                                label="Class Name"
                                rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={["user", "introduction"]}
                                label="Description"
                                rules={[{ required: true }]}>
                                <Input.TextArea />
                            </Form.Item>
                        </Form>
                    </Modal>

                    <br></br>

                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Card
                                type="inner"
                                hoverable
                                className="cards-border"
                                style={{ margin: 3 }}>
                                <TextBox>
                                    <h3>
                                        <strong>Phoenix II</strong>
                                    </h3>
                                    Front End II
                                </TextBox>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card
                                type="inner"
                                hoverable
                                className="cards-border"
                                style={{ margin: 3 }}>
                                <TextBox>
                                    <h3>
                                        <strong>Pirana II</strong>
                                    </h3>
                                    Back End II
                                </TextBox>
                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Card
                                type="inner"
                                hoverable
                                className="cards-border"
                                style={{ margin: 3 }}>
                                <TextBox>
                                    <h3>
                                        <strong>High Noon</strong>
                                    </h3>
                                    Full Stack
                                </TextBox>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card
                                type="inner"
                                hoverable
                                className="cards-border"
                                style={{ margin: 3 }}>
                                <TextBox>
                                    <h3>
                                        <strong>Catarina</strong>
                                    </h3>
                                    Intro to Programming
                                </TextBox>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Card>
        </>
    );
};
export default CurrentCourses;
