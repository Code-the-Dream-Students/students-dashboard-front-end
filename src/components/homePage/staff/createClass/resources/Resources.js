import React, { useState, useContext } from 'react';
import { Table, Spin } from "antd";
import MultiPurposeModal from '../../multiPurposeModal/MultiPurposeModal';
import { Input } from "antd";
import UserContext from '../../../../contexts/UserContext';

const Resources = ({ resources }) => {

    const [authToken] = useContext(UserContext);
    const [resourceTitle, setResourceTitle] = useState("");
    const [link, setLink] = useState("");

    const columns = [
        {
            title: <strong>Resource Title</strong>,
            dataIndex: "title",
            key: "title",
            ellipsis: true,
            width: "30%"
        },
        {
            title: <strong>Link</strong>,
            dataIndex: "link",
            key: "link",
            ellipsis: true,
            width: "70%"
        }
    ];

    const data = resources.map((resource) => {
        return {
            key: resource.id,
            title: resource.source_title,
            link: <a href={resource.link} rel="noopener noreferrer" target="_blank" >{resource.link}</a>
        }
    });

    const handleOk = (event) => {
        event.preventDefault();
        fetch(process.env.REACT_APP_GET_RESOURCES, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken
            },
            body: JSON.stringify({
                source_title: resourceTitle,
                link: link
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
                resources.length ? (
                    <>
                        <MultiPurposeModal
                            handleOk={handleOk}
                            addTitle="Add Resource"
                        >
                            <label>Resource Title: </label>
                            <Input
                                type="text"
                                name="courseName"
                                value={resourceTitle}
                                onChange={(event) => {
                                    event.preventDefault();
                                    setResourceTitle(event.target.value);
                                }}
                            />
                            <br /><br />

                            <label>Link: </label>
                            <Input
                                type="text"
                                name="Link"
                                value={link}
                                onChange={(event) => {
                                    event.preventDefault();
                                    setLink(event.target.value);
                                }}
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

export default Resources;