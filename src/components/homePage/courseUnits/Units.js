/** @format */

import React, { useState, useEffect } from "react";
import { Progress, Card, Row, Col, Typography, Spin } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;
const Units = () => {
    const [progress, setProgress] = useState(null);
    //Fetching data from airtable
    useEffect(() => {
        const getMentorsData = async () => {
            const response = await fetch(process.env.REACT_APP_UNITS_LINK);
            const progressData = await response.json();
            setProgress(progressData);
        };
        getMentorsData();
        // getMentorsData().then((data) => setProgress(data));
    }, []);
    
    return (
        <>
            <div className="container-fluid">
                <Card type="inner">
                    <Typography.Title level={4} className="left">
                        Course Units Progress
                    </Typography.Title>
                    <div className="progress">
                        <p>
                            Use the links below to navigate to the individual units
                            of Code the Dream’s Web Development course.
                        </p>
                        <Row gutter={24}>
                            {progress ? (
                                progress.records.map((percentage, index) => {
                                    console.log(progress);
                                    return (
                                        <Col flex="1 1 400px" key={index}>
                                            <Card
                                                hoverable
                                                style={{
                                                    height: 255,
                                                    textAlign: "center",
                                                    paddingTop: 20,
                                                    marginBottom: 20,
                                                }}
                                                cover={
                                                    <Link to="/home/assignments/">
                                                        {" "}
                                                        <Progress
                                                            type="circle"
                                                            strokeColor={{
                                                                "0%": "#ff5c35",
                                                                "100%": "#f9d418",
                                                            }}
                                                            strokeWidth={10}
                                                            percent={
                                                                percentage.fields
                                                                    .percentage
                                                            }
                                                        />
                                                    </Link>
                                                }>
                                                <Meta
                                                    title={
                                                        percentage.fields.Unit_Name
                                                    }
                                                    description="This is the description"
                                                />
                                            </Card>
                                        </Col>
                                    );
                                })
                            ) : (
                                <Row>
                                    <Col span={12} offset={12}>
                                        <Spin size="large" />
                                    </Col>
                                </Row>
                            )}
                        </Row>
                    </div>
                </Card>
            </div>
        </>
    );
};
export default Units;
