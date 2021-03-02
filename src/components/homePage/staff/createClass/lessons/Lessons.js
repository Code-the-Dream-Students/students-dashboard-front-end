import React, { useContext, useState } from 'react';
import { Table, Spin } from "antd";
import MultiPurposeModal from '../../multiPurposeModal/MultiPurposeModal';
import { Input } from "antd";
import UserContext from '../../../../contexts/UserContext';


const Lessons = ({ lessons }) => {

    const [authToken] = useContext(UserContext);
    const [lessonName, setLessonName] = useState("");
    // const [ unitDescription, setUnitDescription ] = useState("");

    const columns = [
        {
            title: <strong>Lesson Name</strong>,
            dataIndex: "name",
            key: "name",
            ellipsis: true,
            width: "25%"
        }
    ];

    const data = lessons.map((lesson) => {
        return {
            key: lesson.id,
            name: lesson.lesson_name
        }
    });

    const handleOk = (event) => {
        event.preventDefault();
        fetch(process.env.REACT_APP_GET_LESSONS, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken
            },
            body: JSON.stringify({
                lesson_name: lessonName,
            })
        })
            .then(response => response.json())
            .then(() => {
                // console.log(data);
                window.location.reload();
            })
            .catch(console.error);
    };

    console.log(lessons);

    return (
        <>
            {
                lessons.length ? (
                    <>
                        <MultiPurposeModal
                            handleOk={handleOk}
                            addTitle="Add Lesson"
                        >
                            <label>Lesson Name: </label>
                            <Input
                                type="text"
                                name="courseName"
                                value={lessonName}
                                onChange={(event) => {
                                    event.preventDefault();
                                    setLessonName(event.target.value);
                                }}
                            />
                            <br /><br />
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

export default Lessons;