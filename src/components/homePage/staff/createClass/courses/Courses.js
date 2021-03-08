import React, { useContext, useState } from 'react';
import { Table, Spin } from "antd";
import MultiPurposeModal from '../../multiPurposeModal/MultiPurposeModal';
import { Input } from "antd";
import UserContext from '../../../../contexts/UserContext';
import TextEditor from '../../../textEditor/TextEditor';
import EditCourse from './EditCourse';
import DeleteCourse from './DeleteCourse';
import UnitsCourse from './UnitsCourse';

const Courses = ({ courses }) => {

    const [authToken] = useContext(UserContext);
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");

    const columns = [
        {
            title: <strong>Course Name</strong>,
            dataIndex: "name",
            key: "name",
            ellipsis: true,
            width: "20%"
        },
        {
            title: <strong>Description</strong>,
            dataIndex: "description",
            key: "description",
            ellipsis: true,
            width: "49%"
        },
        {
            title: "",
            dataIndex: "units",
            key: "units",
            ellipsis: true,
            width: "11%"
        },
        {
            title: "",
            dataIndex: "editCourse",
            key: "editCourse",
            ellipsis: true,
            // width: "13%"
        },
        {
            title: "",
            dataIndex: "deleteCourse",
            key: "deleteCourse",
            ellipsis: true,
            // width: "13%"
        }
    ];

    const data = courses.map((course) => {
        return {
            key: course.id,
            name: course.course_name,
            description: <div dangerouslySetInnerHTML={{ __html: course.description }} />,
            units: <UnitsCourse course={course} />,
            editCourse: <EditCourse course={course} />,
            deleteCourse: <DeleteCourse course={course} />
        }
    });

    const handleOk = (event) => {
        event.preventDefault();
        fetch(`${process.env.REACT_APP_API_ROOT}/courses`, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken
            },
            body: JSON.stringify({
                course_name: courseName,
                description: courseDescription
            })
        })
            .then(response => response.json())
            .then(() => {
                // console.log(data);
                window.location.reload();
            })
            .catch(console.error);
    };

    return (
        <>
            {
                courses.length ? (
                    <>
                        <MultiPurposeModal
                            handleOk={handleOk}
                            addTitle="Add Course"
                        >
                            <label>Course Name: </label>
                            <Input
                                type="text"
                                name="courseName"
                                value={courseName}
                                onChange={(event) => {
                                    event.preventDefault();
                                    setCourseName(event.target.value);
                                }}
                            />
                            <br /><br />
                            <label>Course Description: </label>
                            <TextEditor
                                text={courseDescription}
                                setText={setCourseDescription}
                            />

                            <br />
                            {/* <Button type="primary" htmlType="submit" >
                                Create Course
                            </Button> */}
                        </MultiPurposeModal>
                        <Table
                            columns={columns}
                            dataSource={data}
                            scroll={{ y: 600 }}
                            expandIconColumnIndex={2}
                        />
                    </>

                ) : (
                        <Spin />
                    )
            }
        </>
    );
};

export default Courses;
