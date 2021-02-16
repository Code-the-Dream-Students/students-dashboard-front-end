/** @format */

import React, { useState, useRef, useEffect, useContext } from "react";
import {
    Card,
    Row,
    Col,
    Space,
    Descriptions,
    Typography,
    Button,
    Input,
    Form,
    Tooltip,
    Checkbox,
    List,
    Avatar,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import LoadPic from "./LoadPic";
import UserContext from "../../../contexts/UserContext";
import { StyledAvatar } from "./styles";
const { Text, Paragraph } = Typography;
const color = "volcano";
{
    /*tooltip color*/
}

const AO2 = () => {
    const [isInEditMode, setIsInEditMode] = useState(false);
    const [authToken, setAuthToken, userInfo, setUserInfo] = useContext(UserContext);
    const [size, setSize] = useState("large");
    const color = "volcano";
    {
        /*tooltip color*/
    }

    const onFinish = async (values) => {
        console.log("Success:", values);
        setUserInfo((prevState) => {
            return { ...prevState, values };
        });
        const response = await fetch(
            "https://forked-student-dashboard.herokuapp.com/students",
            {
                method: "PUT",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authToken,
                },
                body: JSON.stringify(values),
            }
        );
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    // useEffect(()=>{
    // console.log(userInfo.student.last_name, "happy")

    // },[])
    //     const editButton = () => {
    //     setIsInEditMode(true);

    //     console.log('change');
    // };
    return (
        <>
            <Card>
                <Descriptions
                    title="Account Overview"
                    extra={
                        <Button type="primary" htmlType="submit">
                            Edit
                        </Button>
                    }></Descriptions>
                {/* <Typography.Title level={4}>
                    Profile
                    <Tooltip
                        color={color}
                        title="edit your name and picture"
                        placement="rightTop">
                        <EditOutlined style={{ fontSize: 12 }} />
                    </Tooltip> 
                 </Typography.Title> */}

                {/* need a left border vertical here */}

                {/* id feeds in from the database need an api call */}
                <Text strong>Student ID Number:{userInfo.id}</Text>
                <br />
                <br />
                <Row gutter={[8, 8]}>
                    <Col xs={24} sm={8}>
                        <StyledAvatar>
                            <LoadPic />
                        </StyledAvatar>
                    </Col>
                    <Col xs={24} sm={16}>
                        <Row>
                            <Form
                                layout="inline"
                                name="basic"
                                initialValues={{
                                    last_name: userInfo.student.last_name,
                                    first_name: userInfo.student.first_name,
                                    course_name:
                                        userInfo.student.student_course.course
                                            .course_name,
                                    email: userInfo.email,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}>
                                <Col span={12}>
                                    <Form.Item
                                        label={<strong>First Name</strong>}
                                        name="first_name"
                                        // rules={[{ required: true, message: 'Please input your username!' }]}
                                    >
                                        <Input bordered={false} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={<strong>Last Name</strong>}
                                        name="last_name"
                                        // rules={[{ required: true, message: 'Please input your username!' }]}
                                    >
                                        <Input bordered={false} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="course_name"
                                        label={<strong>Class</strong>}
                                        // rules={[ { required: true, },]}
                                        // hidden={true}
                                    >
                                        <Input bordered={false} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="email"
                                        label={<strong>Email</strong>}
                                        // rules={[ { required: true, },]}
                                        // hidden={true}
                                    >
                                        <Input bordered={false} />
                                    </Form.Item>
                                </Col>
                            </Form>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </>
    );
};

export default AO2;
