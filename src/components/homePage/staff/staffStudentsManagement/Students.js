import React from "react";
import { Card, Tabs } from "antd";
import './students.css'
import StudentsTable from './StudentsTable';
import TrackingReport from "./TrackingReport";
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


    return (
        <Card style={styleCard}
            type="inner"
            hoverable
            className="cards-border"
        >
            <div className="card-container">
                <Tabs style={styleTabs} type="card">
                    <TabPane tab="Students Management" key="1" style={styleTabPane}>
                        <StudentsTable />
                    </TabPane>
                    <TabPane tab="Tracking Report" key="2" style={styleTabPane}>
                        <TrackingReport />
                    </TabPane>
                </Tabs>
            </div>
        </Card>
    )
}

export default Students;