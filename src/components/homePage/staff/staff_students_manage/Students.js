import React from "react";
import { Card} from "antd";
import { Tabs } from 'antd';
import './students.css'
import StudentsTable from './StudentsTable';
<<<<<<< HEAD:src/components/homePage/staff_students_manage/Students.js
import TrackingReport from './TrackingReport';

=======
import TrackingReport from "./TrackingReport";
>>>>>>> c46d64d9a4b43d6f90d6db838a7bdab26d3cf2f5:src/components/homePage/staff/staff_students_manage/Students.js
const { TabPane } = Tabs;

const Students = () => {

    const styleCard = {
        background: '#f5f5f5', 
        padding: '0px', 
        border: 'none'
    }

    const styleTabs = {
        background: '#f5f5f5', 
        padding: '0px', 
        height: 930,
        // height: 'auto',
    }

    const styleTabPane = {
        height: 850,
        // height: 'auto',
    }

    
    return(
        <Card style={styleCard}
            type="inner"
            hoverable
            className="cards-border"
        >
            <div  className="card-container">
                <Tabs style={styleTabs} type="card">
                    <TabPane tab="Students Management" key="1" style={styleTabPane}>
                        <StudentsTable />   
                    </TabPane>
                    <TabPane tab="Tracking Report" key="2" style={styleTabPane}>
<<<<<<< HEAD:src/components/homePage/staff_students_manage/Students.js
                     <TrackingReport />
=======
                        <TrackingReport />
>>>>>>> c46d64d9a4b43d6f90d6db838a7bdab26d3cf2f5:src/components/homePage/staff/staff_students_manage/Students.js
                    </TabPane>
                </Tabs>
            </div>
        </Card>
    )
}

export default Students;