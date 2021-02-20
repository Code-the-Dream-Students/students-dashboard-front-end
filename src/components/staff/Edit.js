import React, { useState } from "react";
import { Input, Button, Modal, Dropdown, Menu, Checkbox, Form } from 'antd';
import { DownOutlined } from '@ant-design/icons';


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 14,
    },
};


// const menuB = (
//     <Menu>
//         <Menu.Item key="0">
//         <Checkbox onChange={onChange}>Pirana</Checkbox>
//         </Menu.Item>
//         <Menu.Item key="1">
//         <Checkbox onChange={onChange}>High Noon</Checkbox>
//         </Menu.Item>
//         <Menu.Item key="2">
//         <Checkbox onChange={onChange}>Catarina</Checkbox>
//         </Menu.Item>
//         <Menu.Item key="3">
//         <Checkbox onChange={onChange}>Phoenix</Checkbox>
//        </Menu.Item>

//     </Menu>
//   );

    //for form inside modal
const onFinish = (values) => {
    console.log(values);
};

//checkbox in menuB
function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
}

const Edit = () => {

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

    return(
        <>
            <Modal title="Edit Student Info" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Edit"  width={700}>
                {/* <Dropdown overlay={menuB}>
                    <Button>
                        Choose Course <DownOutlined />
                    </Button>
                </Dropdown> */}
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
            </Modal>
            <Button onClick={showModal}>Edit</Button>
        </>
    )
};

export default Edit
