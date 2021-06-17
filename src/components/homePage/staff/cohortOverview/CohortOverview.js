import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Space, Input, Spin } from "antd";
//import { useHistory } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../../contexts/UserContext";
import CohortDescription from "./CohortDescription";
import CohortCourseList from "./CohortCourseList";
import SmallCalendar from "../../dashboard/studentDashboard/smallCalendar/SmallCalendar";
import MeetingButton from "../../dashboard/staffDashboard/eventsButton/eventsStaffButton";
import CohortStudList from "./CohortStudentsList";
//import MentorsTable from "../../dashboard/staffDashboard/mentorsTable/MentorsTable"
import Announcements from "../../dashboard/staffDashboard/announcements/Announcements";
import EventsButton from "../../dashboard/staffDashboard/eventsButton/eventsStaffButton";
import CohortMentors from "./CohortMentors"

//  StaffHomeContent -> parent component

const CohortOverView = (props) => {
  const [courses, setCourses] = useState([]);
  const [authToken] = useContext(UserContext);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(`${process.env.REACT_APP_API_ROOT}/courses`);
      response = await response.json();
      setCourses(response);
      console.log(response);
    }
    fetchMyAPI();
  }, []);
console.log(courses)
  const url = props.location.pathname;
  const cohortName = url.slice(13);

  const displayCohortInfo = () => {
    for (let i = 0; i < courses.length; i++) {
      let name = courses[i].course_name;
      let descr = courses[i].description;
      if (name === cohortName) {
        return (
          <>
            <Row>
              <Col span={16}>
                <Card
                  type="inner"
                  className="cards-border"
                  style={{ margin: 1 }}
                  key={cohortName}
                >
                  <CohortDescription name={name} description={descr} />
                </Card>
                <br></br>
                <Card>
                  <CohortCourseList />
                </Card>
              </Col>
              <Col span={1}></Col>
              <Col>
                <Announcements />
                <EventsButton />
                <MeetingButton />
                <SmallCalendar />
              </Col>
            </Row>
            <br></br>
            <Row >
              <Col span={23}>
                <Card>
                  <CohortMentors />
                </Card>
              </Col>
            </Row>
           <Row>
             <Col span={23}>
                <Card>
                  <CohortStudList />
                </Card>
             </Col> 
         </Row>
         </>
        );
      }
    }
  };

  return <>{courses.length ? <div>{displayCohortInfo()}</div> : <Spin />}</>;
};

export default CohortOverView;
