/** @format */

import React, { useState, useEffect } from "react";
import {
    Table,
    Input,
    Button,
    Menu,
    Dropdown,
    Row,
    Col,
    Modal,
    Checkbox,
    Spin,
    Typography,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import styled from "styled-components";
import ModalStudent from "./AddStudentModal";
import ActionButton from "./ActionButton";

// import { VariableSizeGrid as Grid } from 'react-window';
// import ResizeObserver from 'rc-resize-observer';
// import classNames from 'classnames';

const TabsContent = styled.div`
    margin: "0 20px";
`;

const HeaderStyle = styled.div`
    padding: 20px;
`;

const AddStudentStyle = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 10px;
    p {
        margin: 10px;
        padding: 10px;
    }

    @media (max-width: 576px) {
        justify-content: flex-start;
        ${"" /* justify-content: center;  */}
    }
`;

const DropDownStyle = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 10px;

    @media (max-width: 576px) {
        justify-content: flex-start;
        ${"" /* justify-content: center;  */}
        margin-left: 20px;
    }
`;

// Search
const { Search } = Input;

const onSearch = (value) => console.log(value);

const StudentsTable = () => {
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    // const [student, setStudent] = useState({});

    //true when new student added
    const [studentAdded, setStudentAdded] = useState(false);
    //true when existing student was edit
    const [studentEdited, setStudentEdited] = useState(false);

    console.log(studentAdded);

    useEffect(() => {
        getStudents();
        getCourses();
    }, [studentAdded, studentEdited]);

    const getStudents = () => {
        fetch("https://forked-student-dashboard.herokuapp.com/students", {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setStudents(data);
                setStudentAdded(false);
                setStudentEdited(false);
            })
            .catch((err) => console.error(err));
    };

    const getCourses = () => {
        fetch("https://forked-student-dashboard.herokuapp.com/courses", {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCourses(data);
            })
            .catch((err) => console.error(err));
    };

    // Table
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "ID",
            dataIndex: "id",
            width: "10%",
            sorter: {
                compare: (a, b) => a.id - b.id,
            },
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Course",
            dataIndex: "course",
        },
    ];
    // Dropdown menu
    const menu = (
        <Menu>
            {courses.map((course) => (
                <Menu.Item key={course.id}>
                    <Checkbox onChange={onChange}>{course.course_name}</Checkbox>
                </Menu.Item>
            ))}
        </Menu>
    );

    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    const data = [];
    students.map((student) =>
        data.push({
            key: student.student_id,
            id: student.student_id,
            name: student.first_name + " " + student.last_name,
            email: student.user.email,
            course: student.student_course.course.course_name,
        })
    );

    const onSelectChange = (selectedRowKey) => {
        console.log("selectedStudents changed: ", selectedRowKey);
        setSelectedStudents(selectedRowKey);
        // setStudent(students.)
    };

    const rowSelection = {
        selectedStudents,
        onChange: onSelectChange,
    };

    return (
        <>
            {students.length ? (
                <TabsContent>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12}>
                            <HeaderStyle>
                                <Typography.Title level={5}>
                                    CTD Students's List
                                </Typography.Title>
                                <Search
                                    placeholder="Search"
                                    allowClear
                                    onSearch={onSearch}
                                    style={{ width: 200 }}
                                />
                            </HeaderStyle>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12}>
                            <AddStudentStyle>
                                <p>Add Student</p>
                                <ModalStudent
                                    courses={courses}
                                    setStudentAdded={setStudentAdded}
                                />
                            </AddStudentStyle>
                            <DropDownStyle>
                                <ActionButton
                                    students={students}
                                    selectedStudents={selectedStudents}
                                    courses={courses}
                                    setStudentEdited={setStudentEdited}
                                />
                            </DropDownStyle>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Table
                                pagination={{ pageSize: 10 }}
                                size="middle"
                                rowSelection={rowSelection}
                                columns={columns}
                                dataSource={data}
                                // scroll={{ x: 1000 }}
                                scroll={{ x: 800 }}
                                // scroll={{ y: 1000}}
                            />
                        </Col>
                    </Row>
                </TabsContent>
            ) : (
                <Row>
                    <Col span={12} offset={12}>
                        <Spin size="large" />
                    </Col>
                </Row>
            )}
        </>
    );
};

export default StudentsTable;
