// import React, {useState, useEffect} from "react";
import React, { useState, useContext } from "react";
import { Table, Form, Input, Button,  Menu, Dropdown, Row, Col, Modal, Checkbox} from 'antd';
import { DownOutlined } from '@ant-design/icons';
// import styled from "styled-components";
import UserContext from "../../../contexts/UserContext";

const ActionButton = ({students, selectedStudents, courses, setChangedStudentInfo}) => {

    const [authToken, setAuthToken] = useContext(UserContext);

    console.log(authToken)

    const initialStudent = {
        name: '',
        email: '',
        id: '',
        enrolled: '',
        course: '',
        course_id: '',
    }

    const [isAddVisible, setIsAddVisible] = useState(false);
    const [isMoveVisible, setIsMoveVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);
    const [studentInfo, setStudentInfo] = useState(initialStudent);

    const [selectedMenuItem, setSelectedMenuItem] = useState([]);

    var checkedItemInitial = [false, false, false, false];
    const [checkedItem, setCheckedItem] = useState(checkedItemInitial);

    const layout = {
        labelCol: { 
            xs: { span: 4 },
            sm: { span: 4 },
        },
        wrapperCol: { 
            xs: { span: 24 },
            sm: { span: 16 }, 
        },
    };
    
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
            number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    // const onFinish = (fieldsValue: any) => {
    //     // Should format date value before submit.
    //     const values = {
    //         ...fieldsValue,
    //     };
    //     console.log('Received values of form: ', values);
    // };

    // Dropdawn menu
    const menuEdit = (
        <Menu>
            <Menu.Item key="0" onClick={handleAdd}>
                Add to Course
            </Menu.Item>
            <Menu.Item key="1" onClick={handleEdit}>
                Edit
            </Menu.Item>
            <Menu.Item key="2" onClick={handleMove}>
                Move
            </Menu.Item>
            <Menu.Item key="3" onClick={handleDelete}>
                Delete
            </Menu.Item>
        </Menu>
    );

    // Dropdawn menu
    const menu = (
        <Menu  onClick={(e) => setSelectedMenuItem(e.key)} >
            {
                courses.map( course => (
                    <Menu.Item key={course.id} >
                        <Checkbox 
                            checked={checkedItem[course.id]}
                            onChange={(e) => onChange(e, course.id)}
                        >
                            {course.course_name}
                        </Checkbox>
                    </Menu.Item>
                ))
            }
        </Menu>
    );

    //checkbox
    function onChange(e, id) {
        console.log(`checked = ${e.target.checked}`);
        console.log(`course_id= ${id}`);
        var newArray = [ ... checkedItemInitial];
        newArray[id] = e.target.checked;
        setCheckedItem(newArray);
    }

    // function handleMenuClick(e) {
    //     console.log('click', e);
    // }

    // function handleEdit(e) {
    //     console.log('click', e);
    //     setIsEditVisible(true);
    // }

    const getStudentInfo = () => {
        students.map( student => {
            if (student.student_id === selectedStudents[0]) {
                setStudentInfo({
                    name: student.first_name + ' ' + student.last_name,
                    email: student.user.email,
                    id: student.student_id,
                    enrolled: student.enrolled,
                    course: student.student_course.course.course_name,
                    course_id: student.student_course.course.id,
                })
            }
        });
    };

    console.log(studentInfo)

    //add 
    function handleAdd(e) {
        console.log('click', e);
        setIsAddVisible(true);
    }

    const handleAddOk = () => {
        setIsAddVisible(false);
    };

    const handleAddCancel = () => {
        setIsAddVisible(false);
    };

    //edit

    function getFirstLastName(e) {
        setStudentInfo({
            ...studentInfo,
            name: e.target.value
        })
    }

    function getEmail(e) {
        setStudentInfo({
            ...studentInfo,
            email: e.target.value
        })
    }

    function handleEdit(e) {
        setIsEditVisible(true);
        getStudentInfo();
    }

    const handleEditOk = () => {
        setIsEditVisible(false);
        //get changed first and last name
        var first_name= studentInfo.name.split(' ', 1)[0];
        var last_name= studentInfo.name.split(' ')[1];
        console.log(first_name);
        console.log(last_name);
        //get changed Email
        var email= studentInfo.email;
        console.log(email);

        fetch(`https://forked-student-dashboard.herokuapp.com/students/staff_update`, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', 'Authorization':authToken },
            body: JSON.stringify({
                student_id: studentInfo.id,
                first_name: first_name,
                last_name: last_name,
                email: email,
                // enrolled: studentInfo.enrolled,
            }) 
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setChangedStudentInfo(true);
            //cleans input fields 
            studentInfo(initialStudent);
        })
        .catch(err => console.error(err));
    };

    const handleEditCancel = () => {
        setIsEditVisible(false);
    };

    console.log(studentInfo);
    //move
    function handleMove(e) {
        setIsMoveVisible(true);
        getStudentInfo();
    }

    const handleMoveOk = () => {
        setIsMoveVisible(false);
        console.log(selectedMenuItem)
        fetch(`https://forked-student-dashboard.herokuapp.com/student_courses/${studentInfo.id}/update`, {
            method: 'PATCH',
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                // student_id: studentInfo.id,
                course_id: selectedMenuItem
            }) 
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setChangedStudentInfo(true);
            //cleans input fields 
            setStudentInfo(initialStudent);
            //makes all checkbox unchecked
            setSelectedMenuItem('');
        })
        .catch(err => console.error(err));
    };

    const handleMoveCancel = () => {
        setIsMoveVisible(false);
        setSelectedMenuItem('');
        setCheckedItem(checkedItemInitial);
    };

    //delete
    function handleDelete(e) {
        setIsDeleteVisible(true);
        getStudentInfo();
    }

    const handleDeleteOk = () => {
        setIsDeleteVisible(false);
        setIsMoveVisible(false);
        console.log(studentInfo.course_id)
        fetch(`https://forked-student-dashboard.herokuapp.com/student_courses/${studentInfo.id}/delete`, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                // student_id: studentInfo.id,
                course_id: studentInfo.course_id,
            }) 
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setChangedStudentInfo(true);
            //cleans input fields 
            studentInfo(initialStudent);
        })
        .catch(err => console.error(err));
    };
    const handleDeleteCancel = () => {
        setIsDeleteVisible(false);
    };
    
    return ( 
        <>
            <Dropdown overlay={menuEdit} trigger={['click']} >
                <Button type="primary" onClick={e => e.preventDefault()}> 
                    Actions <DownOutlined />
                </Button> 
            </Dropdown>
            
            <Modal width={400} 
                title="Add Student to Course" 
                visible={isAddVisible} 
                onOk={handleAddOk} 
                onCancel={handleAddCancel} 
                okText='Add'
            >
                <Row>
                    <Col>
                        <Dropdown overlay={menu} trigger={['click']} >
                            <Button onClick={e => e.preventDefault()}> 
                                Choose Course <DownOutlined />
                            </Button> 
                        </Dropdown>
                    </Col>
                </Row>
            </Modal>
            
            <Modal 
                width={400} 
                title="Move Student(s) from Course" 
                visible={isMoveVisible} 
                onOk={handleMoveOk} 
                onCancel={handleMoveCancel} 
                okText='Move'
            >
                <Row>
                    <Col>
                        <Dropdown overlay={menu} trigger={['click']} >
                            <Button onClick={e => e.preventDefault()}> 
                                Choose Course <DownOutlined />
                            </Button> 
                        </Dropdown>
                    </Col>
                </Row>
            </Modal>
​
            <Modal 
                width={700}
                title="Edit Student" 
                visible={isEditVisible} 
                onOk={handleEditOk} 
                onCancel={handleEditCancel}
                okText="Add"
                cancelText="Cancel"
            >
                <Form 
                    {...layout} 
                    // name="nest-messages" 
                    validateMessages={validateMessages}
                    // onFinish={onFinish}
                >
                    {/* <Form.Item style={{margin: '50px'}} rules={[{ required: true }]}>
                        <Dropdown overlay={menu} trigger={['click']} >
                            <Button onClick={e => e.preventDefault()}> 
                                Choose Course <DownOutlined />
                            </Button> 
                        </Dropdown>
                    </Form.Item> */}
​
                    <Form.Item label="Name" rules={[{ required: true }]}>
                        <Input value={studentInfo.name} onChange={e =>getFirstLastName(e)}/>
                    </Form.Item>
                    <Form.Item label="Email" rules={[{ type: 'email' }]}>
                        <Input value={studentInfo.email} onChange={e =>getEmail(e)}/>
                    </Form.Item>
                </Form>
            </Modal>
​
            <Modal 
                title="Delete Student(s)" 
                visible={isDeleteVisible} 
                onOk={handleDeleteOk} 
                onCancel={handleDeleteCancel} 
                okText='Remove'
            >
                <p>Are you sure you want to remove this student from the class?</p>
            </Modal>
        </>
    );
}
export default ActionButton;