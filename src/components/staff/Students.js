import React, { useState, useContext } from 'react';
import { Tabs, Input, Row, Col, Button, Modal, /* Table, */ Dropdown, Menu, Checkbox, Form/* , Space */} from 'antd';
import { PlusOutlined, FolderAddOutlined, DownOutlined } from '@ant-design/icons';
import StudentTable from './StudentTable';
import UserContext from "../contexts/UserContext";
import AddStudent from "./AddStudent";

  //for dropdown in add student modal
const menuB = (
    <Menu>
        <Menu.Item key="0">
            <Checkbox onChange={onChange}>Pirana</Checkbox>
        </Menu.Item>

        <Menu.Item key="1">
            <Checkbox onChange={onChange}>High Noon</Checkbox>
        </Menu.Item>

        <Menu.Item key="2">
            <Checkbox onChange={onChange}>Catarina</Checkbox>
        </Menu.Item>

        <Menu.Item key="3">
            <Checkbox onChange={onChange}>Phoenix</Checkbox>
        </Menu.Item>
    </Menu>
);
    //checkbox in menuB
function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
}

//for form inside modal
const onFinish = (values) => {
    console.log(values);
};
    
//form layout in modal
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 14,
    },
};

const Students = (props) => {
    //datasource from userContext
    const [ authToken, setAuthToken, userInfo, setUserInfo] = useContext(UserContext);
    
    //state from Add Student component
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [studentAdded, setStudentAdded] = useState(false);

    //datasource from backend
    const data = [];

    for (let i = 0; i < 46; i++) {
        data.push({
            key: i,
            name: `${userInfo.student.first_name} ${userInfo.student.last_name}`,
            id: `${userInfo.id}`,
            email: `${userInfo.email} ${i}`,
            course: userInfo.student.student_course.course.course_name,
        });
    };

    const { TabPane } = Tabs;
    //for input
    const { Search } = Input;
    const onSearch = value => console.log(value);

    //modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };
//MF: need to add process logic not just close modal
    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    //props passed to confirm.js
    //   const {
    //       deleteRow,
    //   }= props

    return(        
        <div>
            <div className="card-container">
                <Tabs type="card">
                    <TabPane tab="Students" key="4">
                        <Row gutter={[16, 16]}>
                            <Col span={8}>
                                <h3 style={{fontWeight: "bold"}}>Students in this course</h3>
                                <Search
                                placeholder="input search text"
                                allowClear
                                onSearch={onSearch}
                                style={{ width: 200, margin: '0' }}
                            /></Col>
                            
                            <Col span={16} >
                                <div style={{display: "flex", justifyContent: "flex-end"}}>
                                    <p>Add Student</p>
                                    <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={showModal} />
                                    <p>Track Students</p>
                                    <Button type="primary" shape="circle" icon={<FolderAddOutlined />} />              
                                </div>  
                            </Col>
                        </Row>
                        
                        {/* Modal to add Student */}
                        <Modal 
                            title="Add student to course" 
                            visible={isModalVisible}    
                            onOk={handleOk} 
                            onCancel={handleCancel} 
                            okText="Add"  
                            width={700}
                        >
                            <Dropdown overlay={menuB}>
                                <Button>
                                    Choose Course <DownOutlined />
                                </Button>
                            </Dropdown>
                            <Form {...layout} name="nest-messages" onFinish={onFinish} >
                                <Form.Item
                                    name={['user', 'name']}
                                    label="Name"
                                    rules={[
                                    {
                                        required: true,
                                    },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name={['user', 'email']}
                                    label="Email"
                                    rules={[
                                        {
                                            type: 'email',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Form>
                           {/* <AddStudent courses={courses} setStudentAdded={setStudentAdded}/> */}
                        </Modal>
                    </TabPane>
                </Tabs>
                <br />   
            </div>   
            <StudentTable />
        </div>   
    )
};


export default Students