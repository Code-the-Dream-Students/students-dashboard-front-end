import React, { useEffect, useState } from "react";
import { Table, Row, Col, Button, Spin } from "antd";
import MultiPurposeModal from "../../dashboard/staffDashboard/multiPurposeModal/MultiPurposeModal";
import {
  Square,
  SquareDescription,
  DivMargin,
  ContainerLegend,
  DivLegend,
} from "../staff_students_manage/trackingReportStyles";

const CohortStudList = () => {
  const [students, setStudents] = useState([]);
  const [currentStudents, setCurrentStudents] = useState([]);

  useEffect(() => {
    fetch("https://forked-student-dashboard.herokuapp.com/students")
      .then((response) => response.json())
      .then((data) => {
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
      })
      .catch(console.error);
  }, []);

  const setColor = (toProcess, word) => {
    if (word === "weekAssignment") {
      return toProcess.assignmentProgress === 2
        ? "#0f0"
        : toProcess.assignmentProgress === 1
        ? "#fc0"
        : "#f00";
    }

    if (word === "weekStatus") {
      return toProcess.status === 6
        ? "#0f0"
        : toProcess.status >= 3
        ? "#fc0"
        : "#f00";
    }

    let studentWeeklyProgress =
      toProcess.reduce((acc, progress) => {
        return (
          acc +
          (word === "generalAssignments"
            ? progress.assignment_progress
            : word === "generalGithubLinks"
            ? progress.assignment_submission
            : word === "generalStatus"
            ? progress.total_progress
            : word === "unitAssignments"
            ? progress.assignment_progress
            : word === "unitGithubLinks"
            ? progress.githubLink
            : progress.status)
        );
      }, 0) / toProcess.length;

    if (word === "generalAssignments" || word === "unitAssignments") {
      studentWeeklyProgress = Math.floor(studentWeeklyProgress);
      return studentWeeklyProgress === 2
        ? "#0f0"
        : studentWeeklyProgress === 1
        ? "#fc0"
        : "#f00";
    } else if (word === "generalStatus" || word === "unitStatus") {
      return studentWeeklyProgress === 6
        ? "#0f0"
        : studentWeeklyProgress >= 3
        ? "#fc0"
        : "#f00";
    } else {
      return studentWeeklyProgress >= 2
        ? "#0f0"
        : studentWeeklyProgress > 0
        ? "#fc0"
        : "#f00";
    }
  };

  const data = currentStudents.map((student) => {
    const weeklyProgress = student.student_weekly_progresses;

    return {
      key: student.student_id,
      name: `${student.first_name} ${student.last_name}`,
      course: student.course_name,
      units: "Courses",
      assignments: (
        <Square
          squareColor={() => setColor(weeklyProgress, "generalAssignments")}
        />
      ),
      githubLink: (
        <Square
          squareColor={() => setColor(weeklyProgress, "generalGithubLinks")}
        />
      ),
      status: (
        <Square squareColor={() => setColor(weeklyProgress, "generalStatus")} />
      ),

      children: Object.entries(student.units).map((unit) => {
        const unitName = unit[0];
        const unitProgress = unit[1];

        return {
          key: unitName,
          units: unitName,
          assignments: (
            <Square
              squareColor={() => setColor(unitProgress, "unitAssignments")}
            />
          ),
          githubLink: (
            <Square
              squareColor={() => setColor(unitProgress, "unitGithubLinks")}
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
                <Square squareColor={setColor(weekData, "weekAssignment")} />
              ),
              githubLink: (
                <a href={`https://${weekData.githubLink}`}>
                  {weekData.githubLink}
                </a>
              ),
              status: <Square squareColor={setColor(weekData, "weekStatus")} />,
            };
          }),
        };
      }),
    };
  });

  const columns = [
    {
      title: <strong>Name</strong>,
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: <strong>Cohort</strong>,
      dataIndex: "course",
      key: "course",
      ellipsis: true,
    },
    {
      title: <strong>Courses</strong>,
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
    } /* ,
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            ellipsis: true,
        }, */,
  ];

  const handleOk = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {currentStudents.length ? (
        <DivMargin>
          <Row>
            <Col span={22}>
              <h2>
                <strong> Students</strong>
              </h2>
            </Col>
            <Col span={2}>
              {" "}
               <MultiPurposeModal handleOk={handleOk}>
                {/* {" "}
                <label>Course Name: </label>
                <Input
                  type="text"
                  name="unitName"
                  value={unitName}
                  onChange={(event) => {
                    event.preventDefault();
                    setUnitName(event.target.value);
                  }}
                />
                <br />
                <br />
                <label>Course Description: </label>
                <TextEditor
                  text={unitDescription}
                  setText={setUnitDescription}
                />
                <br />
                 <Button type="primary" htmlType="submit" >
                                    Create Course
                                </Button>  */}
              </MultiPurposeModal> 
            </Col>
          </Row>

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
            scroll={{ y: 400 }}
            expandIconColumnIndex={1}
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
      )}
    </>
  );
};

export default CohortStudList;
