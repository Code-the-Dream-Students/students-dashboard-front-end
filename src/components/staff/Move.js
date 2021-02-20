import React, { useState } from 'react';
import { Modal, Menu, Checkbox, Dropdown, Button, Form } from 'antd';
import { DownOutlined } from '@ant-design/icons';
// import { StyledModal } from "./styles";

//for dropdown in modal
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

const Move = () => {
    //modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };
//MF: need to add process logic not just close modal(maybe conditionals)
    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return(
        <>   
            <Modal 
                title="Move student from course" 
                description= "To where do you want to move the student" 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel} 
                okText="Move"
            >
                <Form>
                    <Dropdown overlay={menuB}>
                        <Button>
                            Choose Course <DownOutlined />
                        </Button>
                    </Dropdown>
                </Form>
            </Modal>   

            <Button onClick={showModal}>Move</Button>
        </>                    
    )
};

export default Move