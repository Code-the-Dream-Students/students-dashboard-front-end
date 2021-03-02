import React, { useState } from "react";
import { Button, Menu, Checkbox, Modal } from 'antd';

import CreateAssignments from '../CreateAssignments';

const CreateModal = ({ assignments, setAssignmentAdded, history }) => {

  const initialStudent = {
    username: '',
    email: ''
  }

  var checkedItemInitial = [false, false, false, false];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [studentAdd, setStudentAdd] = useState(initialStudent);
  const [selectedMenuItem, setSelectedMenuItem] = useState([]);
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

  const getStudent = (e) => {
    setStudentAdd({
      username: e.target.value.split('@', 1)[0],
      email: e.target.value,
    })
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (e) => {
    e.preventDefault()
    setIsModalVisible(false);

    fetch('https://forked-student-dashboard.herokuapp.com/student_courses/create_student_and_course', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: studentAdd.username,
        email: studentAdd.email,
        course_id: selectedMenuItem,
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setAssignmentAdded(true);
        //makes all checkbox unchecked
        setSelectedMenuItem('');
      })
      .catch(err => console.error(err));
  };


  const handleCancel = () => {
    setIsModalVisible(false);
    //makes all checkbox unchecked
    setSelectedMenuItem('');
    setCheckedItem(checkedItemInitial);
  };

  const onFinish = (fieldsValue/* : any */) => {
    // Should format date value before submit.
    const values = {
      ...fieldsValue,
    };
    console.log('Received values of form: ', values);
  };

  //Choose course
  // Dropdawn menu
  const menu = (
    <Menu onClick={(e) => setSelectedMenuItem(e.key)}>
      {
        assignments.map(assignment => (
          <Menu.Item key={assignment.id} >
            <Checkbox
              checked={checkedItem[assignment.id]}
              onChange={(e) => onChange(e, assignment.id)}
            >
              {assignment.course_name}
            </Checkbox>
          </Menu.Item>
        ))
      }
    </Menu>
  );

  function onChange(e, id) {
    console.log(`checked = ${e.target.checked}`);
    console.log(`course_id= ${id}`);
    var newArray = [...checkedItemInitial];
    newArray[id] = e.target.checked;
    setCheckedItem(newArray);
  }

  return (
    <>
      <Button type="primary" shape="circle" onClick={showModal}> + </Button>
      <Modal
        width={700}
        title="Create Assignment"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add"
        cancelText="Cancel"
      >
        <CreateAssignments history={history} />
      </Modal>
    </>
  )
}

export default CreateModal;