/** @format */

import React, { useState, useEffect } from "react";
import { Modal, Form, DatePicker, Checkbox } from "antd";
const AddEventModal = () => {
    return (
        <Modal
            visible={visible}
            title="Add Personal Event"
            okText="Save"
            cancelText="Cancel"
            onCancel={""}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
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
                <Form.Item label="Title"></Form.Item>
                <Form.Item label="Dates">
                    <p>Start:</p>
                    <DatePicker />
                    <p>End:</p>
                </Form.Item>
                <Form.Item label="All Day">
                    <Checkbox />
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default AddEventModal;
