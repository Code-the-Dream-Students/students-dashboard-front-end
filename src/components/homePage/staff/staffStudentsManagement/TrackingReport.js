import React, { useEffect, useState } from "react";
import { Table, Row, Col, Typography, Input, Button, Spin } from "antd";
import { Square, SquareDescription, DivMargin, ContainerLegend, DivLegend, StyledDate } from './trackingReportStyles';

const { Text } = Typography;
const { Search } = Input;

const TrackingReport = () => {
    const [students, setStudents] = useState([]);
    const [currentStudents, setCurrentStudents] = useState([]);
    // const [ courses, setCourses ] = useState([]);
    const [temporarySearch, setTemporarySearch] = useState("");

    const rightNow = new Date();

    // const handleChange = (pagination, filters, sorter) => {
    //   console.log('Various parameters', pagination, filters, sorter);
    //   setSortedInfo(sorter);
    //   setFilteredInfo(filters);
    // };

    useEffect(() => {
        fetch("https://forked-student-dashboard.herokuapp.com/students")
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);

            const students = data.map((student) => {
                const units = {};

                student.student_weekly_progresses.forEach((swp) => {
                    const obj = {
                        week: `Week ${swp.week_number}`,
                        assignmentProgress: swp.assignment_progress,
                        githubLink: swp.assignment_submission,
                        status: swp.total_progress,
                    };

                    if (!units[swp.week.unit.unit_name]) {
                        units[swp.week.unit.unit_name] = [obj];
                    } else {
                        units[swp.week.unit.unit_name].push(obj);
                    }
                });

                return {
                    student_id: student.student_id,
                    first_name: student.first_name,
                    last_name: student.last_name,
                    course_name: student.student_course.course.course_name,
                    student_weekly_progresses: student.student_weekly_progresses,
                    units,
                };
            });

            setStudents(students);

            setCurrentStudents(students);
            // const courses = [];
            // data.forEach((student) => {
            //   const course = student.student_course.course.course_name
            //   if (!courses.includes(course)) {
            //     courses.push(course);
            //   }
            // })
            // setCourses(courses);
        })
        .catch(console.error);
    }, []);

    // console.log(students);

    const onSearch = (event) => {
        const name = event.toLowerCase();
        setTemporarySearch(event);
        setCurrentStudents(
            students.filter((student) => {
                const firstName = student.first_name.toLowerCase();
                const lastName = student.last_name.toLowerCase();
                const fullName = `${firstName} ${lastName}`;
                return (
                    firstName.includes(name) ||
                    lastName.includes(name) ||
                    fullName.includes(name)
                );
            })
        );
    };

    const setColor = (toProcess, word) => {
        if (word === "weekAssignment") {
            return (
                toProcess.assignmentProgress === 2 ? "#0f0" : 
                toProcess.assignmentProgress === 1 ? "#fc0" : "#f00"
            );
        }

        if (word === "weekStatus") {
            return (
                toProcess.status === 6 ? "#0f0" : 
                toProcess.status >= 3 ? "#fc0" : "#f00"
            );
        }

        let studentWeeklyProgress =
            toProcess.reduce((acc, progress) => {
                return (
                    acc + (
                        word === "generalAssignments" ? progress.assignment_progress : 
                        word === "generalGithubLinks" ? progress.assignment_submission : 
                        word === "generalStatus" ? progress.total_progress :
                        word === "unitAssignments" ? progress.assignment_progress : 
                        word === "unitGithubLinks" ? progress.githubLink : progress.status
                    )
                );
            }, 0) / toProcess.length;

        if (word === "generalAssignments" || word === "unitAssignments") {
            studentWeeklyProgress = Math.floor(studentWeeklyProgress);
            return (
                studentWeeklyProgress === 2 ? "#0f0" : 
                studentWeeklyProgress === 1 ? "#fc0" : "#f00"
            );
        } else if (word === "generalStatus" || word === "unitStatus") {
            return (
                studentWeeklyProgress === 6 ? "#0f0" : 
                studentWeeklyProgress >= 3 ? "#fc0" : "#f00"
            );
        } else {
            return (
                studentWeeklyProgress >= 2 ? "#0f0" : 
                studentWeeklyProgress > 0 ? "#fc0" : "#f00"
            );
        }
    };

    const data = currentStudents.map((student) => {
        const weeklyProgress = student.student_weekly_progresses;

        return {
            key: student.student_id,
            name: `${student.first_name} ${student.last_name}`,
            course: student.course_name,
            units: "Units",
            assignments: (
                <Square
                    squareColor={() =>
                        setColor(weeklyProgress, "generalAssignments")
                    }
                />
            ),
            githubLink: (
                <Square
                    squareColor={() =>
                        setColor(weeklyProgress, "generalGithubLinks")
                    }
                />
            ),
            status: (
                <Square
                    squareColor={() => setColor(weeklyProgress, "generalStatus")}
                />
            ),

            children: Object.entries(student.units).map((unit) => {
                const unitName = unit[0];
                const unitProgress = unit[1];

                return {
                    key: unitName,
                    units: unitName,
                    assignments: (
                        <Square
                            squareColor={() =>
                                setColor(unitProgress, "unitAssignments")
                            }
                        />
                    ),
                    githubLink: (
                        <Square
                            squareColor={() =>
                                setColor(unitProgress, "unitGithubLinks")
                            }
                        />
                    ),
                    // status: (
                    //     <Square
                    //         squareColor={() => setColor(unitProgress, "unitStatus")}
                    //     />
                    // ),

                    children: unitProgress.map((weekData) => {
                        const weekName = weekData.week;

                        return {
                            key: weekName,
                            units: weekName,
                            assignments: (
                                <Square
                                    squareColor={setColor(
                                        weekData,
                                        "weekAssignment"
                                    )}
                                />
                            ),
                            githubLink: <a href={ `https://${weekData.githubLink}` }>{ weekData.githubLink }</a>,
                            status: (
                                <Square
                                    squareColor={setColor(weekData, "weekStatus")}
                                />
                            ),
                        };
                    }),
                };
            }),
        };
    });

    // let sI = sortedInfo;
    // let fI = filteredInfo;
    // sI = sortedInfo || {};
    // fI = filteredInfo || {};

    const columns = [
        {
            title: <strong>Name</strong>,
            dataIndex: "name",
            key: "name",
            // sorter: (a, b) => a.name.localeCompare(b.name),
            // sortOrder: sI.columnKey === 'name' && sI.order,
            ellipsis: true,
        },
        {
            title: <strong>Course</strong>,
            dataIndex: "course",
            key: "course",
            ellipsis: true,
            // filters: courses.map((course) => {
            //   const st = {
            //     text: course,
            //     value: course,
            //     // filteredValue: fI.course || null,
            //     // onFilter: (value, record) => record.course.includes(value),
            //   }
            //   return st;
            // })
        },
        {
            title: <strong>Units</strong>,
            dataIndex: "units",
            key: "units",
            ellipsis: true,
        },
        {
            title: <strong>Assignments</strong>,
            dataIndex: "assignments",
            key: "assignments",
            ellipsis: true,
        },
        {
            title: <strong>Github Link</strong>,
            dataIndex: "githubLink",
            key: "githubLink",
            ellipsis: true,
        }/* ,
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            ellipsis: true,
        }, */
    ];

    return (
        <>
            {
                currentStudents.length ? (
                    <DivMargin>
                        <DivMargin>
                            <Row>
                                <Col xs={24} sm={12} md={12} lg={12}>
                                    <Text strong>
                                        <Typography.Title level={5}>
                                            CTD Student's Tracking Report
                                        </Typography.Title>
                                    </Text>
                                    <Search
                                        placeholder="Search Student"
                                        onSearch={onSearch}
                                        enterButton
                                    />
                                    {temporarySearch && (
                                        <div>
                                            <br />
                                            <p>
                                                {temporarySearch}&nbsp;
                                                <Button
                                                    type="danger"
                                                    shape="circle"
                                                    onClick={() => {
                                                        setTemporarySearch("");
                                                        setCurrentStudents(students);
                                                    }}>
                                                    x
                                                </Button>
                                            </p>
                                        </div>
                                    )}
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12}>
                                    <StyledDate>
                                        <Text strong>Date: </Text>
                                        <Text>{`${
                                            rightNow.getMonth() + 1
                                        }/${rightNow.getDate()}/${rightNow.getFullYear()}`}</Text>
                                    </StyledDate>
                                </Col>
                            </Row>
                        </DivMargin>

                        <ContainerLegend>
                            <DivLegend>
                                <SquareDescription>Complete </SquareDescription>{" "}
                                <Square squareColor="#0f0" style={{ marginLeft: 10 }} />
                            </DivLegend>
                            <DivLegend>
                                <SquareDescription>In Progress </SquareDescription>{" "}
                                <Square squareColor="#fc0" style={{ marginLeft: 10 }} />
                            </DivLegend>
                            <DivLegend>
                                <SquareDescription>Not Started </SquareDescription>{" "}
                                <Square squareColor="#f00" style={{ marginLeft: 10 }} />
                            </DivLegend>
                        </ContainerLegend>
                        <Table
                            columns={columns}
                            dataSource={data}
                            // onChange={handleChange}
                            scroll={{ y: 500 }}
                            expandIconColumnIndex={2}
                            // pagination={{ pageSize: 5 }}
                            // expandable={{
                            //   expandedRowRender: () => <p style={{ margin: 0 }}>Hello</p>,
                            //   rowExpandable: record => record.name !== 'Not Expandable',
                            // }}
                        />
                    </DivMargin>
                ) : (
                    <Row>
                        <Col span={12} offset={12}>
                            <Spin size="large" />
                        </Col>
                    </Row>
                )
            }
        </>
    );
};

export default TrackingReport;
