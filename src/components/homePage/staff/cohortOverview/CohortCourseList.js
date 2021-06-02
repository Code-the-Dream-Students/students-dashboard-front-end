import React, { useState, useEffect, useContext } from "react";
import { Table, Spin } from "antd";
import MultiPurposeModal from "../../dashboard/staffDashboard/multiPurposeModal/MultiPurposeModal";
import { Input, Row, Col } from "antd";
import UserContext from "../../../contexts/UserContext";
import TextEditor from "../../textEditor/TextEditor";
import CourseOverview from "../courseOverview/CourseOverview"

const CohortCourseList = () => {
  const [units, setUnits] = useState([]);
  const [authToken] = useContext(UserContext);
  const [unitName, setUnitName] = useState("");
  const [unitDescription, setUnitDescription] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_GET_UNITS)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUnits(data);
      })
      .catch(console.error);
  }, []);

  const columns = [
    {
      title: <strong>Course Name</strong>,
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      width: "20%",
    },
    {
      title: <strong>Description</strong>,
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      width: "45%",
    },
    {
      title: "",
      dataIndex: "viewUnit",
      key: "viewUnit",
      ellipsis: true,
      width: "11%",
    },
    {
      title: "",
      dataIndex: "editUnit",
      key: "editUnit",
      ellipsis: true,
      width: "11%",
    },
    {
      title: "",
      dataIndex: "deleteUnit",
      key: "deleteUnit",
      ellipsis: true,
      width: "14%",
    },
  ];

  const data = units.map((unit) => {
    return {
      key: unit.id,
      name: unit.unit_name,
      description: (
        <div dangerouslySetInnerHTML={{ __html: unit.description }} />
      ),
      viewUnit: <CourseOverview course={unit} />
      ,
      editUnit: (
        <MultiPurposeModal
          typeModal="Edit"
        >
          <label> Course Name: </label>
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
          <label> Course Description: </label>
          <TextEditor text={unitDescription} setText={setUnitDescription} />
          <br />
        </MultiPurposeModal>
      ),
      deleteUnit: (
        <MultiPurposeModal
          //handleOk={handleDelete}
          addTitle="Delete"
          typeModal="Delete"
        >
          {`Are you sure you want to delete "${unit.unit_name}"?`}
        </MultiPurposeModal>
      ),
    };
  });

  const handleOk = (event) => {
    event.preventDefault();
    fetch(process.env.REACT_APP_GET_UNITS, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify({
        unit_name: unitName,
        description: unitDescription,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        // console.log(data);
        window.location.reload();
      })
      .catch(console.error);
  };

  return (
    <>
      {units.length ? (
        <>
          <Row>
            <Col span={22}>
              <h2>
                {" "}
                <strong> Courses</strong>
              </h2>
            </Col>
            <Col span={2}>
              {" "}
              <MultiPurposeModal handleOk={handleOk}>
                {" "}
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
                {/* <Button type="primary" htmlType="submit" >
                                    Create Course
                                </Button> */}
              </MultiPurposeModal>
            </Col>
          </Row>

          <Table
            columns={columns}
            dataSource={data}
            scroll={{ y: 600 }}
            expandIconColumnIndex={2}
          />
        </>
      ) : (
        <Spin />
      )}
    </>
  );
};

export default CohortCourseList;
