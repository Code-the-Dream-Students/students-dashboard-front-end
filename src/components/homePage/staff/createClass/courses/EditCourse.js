import React, { useState, useContext } from 'react';
import MultiPurposeModal from '../../multiPurposeModal/MultiPurposeModal';
import { Input } from "antd";
import UserContext from '../../../../contexts/UserContext';
import TextEditor from '../../../textEditor/TextEditor';


const EditCourse = ({ course }) => {

    const [authToken] = useContext(UserContext);
    const [courseName, setCourseName] = useState(course.course_name);
    const [courseDescription, setCourseDescription] = useState(course.description);

    const handleEdit = (event) => {
        event.preventDefault();

        fetch(`${process.env.REACT_APP_GET_COURSES}/${course.id}`, {
            method: "PUT",
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
                window.location.reload();
            })
            .catch(console.error)
    };

    return (
        <MultiPurposeModal
            handleOk={handleEdit}
            addTitle="Edit Course"
            typeModal="Edit"
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
        </MultiPurposeModal>
    );
};

export default EditCourse;
