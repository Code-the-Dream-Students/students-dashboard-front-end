/** @format */

import React, { useState, useEffect } from "react";
import { StyledMain, StyledSignUp } from "./styles";
import {
    Modal,
    Form,
    Input,
    Select,
    Cascader,
    DatePicker,
    Checkbox,
    Card,
    Typography,
} from "antd";
import { SolutionOutlined } from "@ant-design/icons";

const CreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    function onChange(checkedValues) {
        console.log("checked = ", checkedValues);
    }

    const plainOptions = ["Yes", "No", "Working on it"];

    //Fetching data from airtable
    const getMentorsData = async () => {
        const response = await fetch(
            "https://api.airtable.com/v0/appm5NPkqO7P8ePUK/Mentors?api_key=keyclOytaXo7NHQ8M"
        );
        const mentorsData = await response.json();
        return mentorsData;
    };

    const [mentors, setMentors] = useState(null);

    const getOptions = () => {
        let options = [];
        let unique_mentors = [
            ...new Map(mentors.records.map((o) => [o.fields.Key, o])).values(),
        ];

        unique_mentors.forEach((mentor) => {
            let object = {};
            object.value = mentor.fields.Key;
            object.label = mentor.fields.Name;
            object.children = [];
            let key = mentor.fields.Key;
            let dates_for_each_mentor = mentors.records.filter(
                (x) => x.fields.Key === key
            );

            dates_for_each_mentor.forEach((element) => {
                let new_date = {
                    value: element.fields.Dates,
                    label: element.fields.Dates,
                    children: [],
                };
                let times_foreach_date = mentors.records.filter(
                    (x) =>
                        x.fields.Key === key &&
                        x.fields.Dates === element.fields.Dates
                );
                times_foreach_date.forEach((time) => {
                    new_date.children.push({
                        value: time.fields.Times,
                        label: time.fields.Times,
                    });
                });
                object.children.push(new_date);
            });
            options.push(object);
        });
        return options;
    };

    useEffect(() => {
        getMentorsData().then((data) => setMentors(data));
    }, []);

    return (
        <Modal
            visible={visible}
            title="Mentor Session Registration"
            okText="Submit"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        console.log(values)
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log("Validate Failed:", info);
                    });
            }}>
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: "public",
                }}>
                <Form.Item label="Mentor">
                    {mentors && <Cascader options={getOptions()} />}
                </Form.Item>
                <Form.Item label="Date">
                    <DatePicker />
                </Form.Item>

                <Form.Item label="Type">
                    <Select>
                        <Select.Option value="regularsession">
                            Mentor Session
                        </Select.Option>
                        <Select.Option value="1on1">1 on 1</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Have you started the assignment? ">
                    <Checkbox.Group
                        options={plainOptions}
                        defaultValue={["Yes"]}
                        onChange={onChange}
                    />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Any questions or topics would you like to discuss at the session?">
                    <Input type="textarea" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const MentorForm = () => {
    const [visible, setVisible] = useState(false);

    const onCreate = (values) => {
        console.log("Received values of form: ", values);
        setVisible(false);
    };

    return (
        <StyledMain>
            <StyledSignUp>
                <Card
                    type="inner"
                    hoverable
                    onClick={() => {
                        setVisible(true);
                    }}>
                    <Typography.Title level={4} className="left">
                        <SolutionOutlined />
                        Mentor Session
                    </Typography.Title>
                    <p>Sign Up for a Mentor Session</p>
                    <CreateForm
                        visible={visible}
                        onCreate={onCreate}
                        onCancel={() => {
                            setVisible(false);
                        }}
                    />
                </Card>
            </StyledSignUp>
        </StyledMain>
    );
};

export default MentorForm;
