import React, { useState } from 'react';
import { PlusCircleTwoTone } from "@ant-design/icons";
import { Typography, Modal, Button } from "antd";

const MultiPurposeModal = ({ typeModal="Add", handleOk, addTitle, children }) => {

	const [ isModalVisible, setIsModalVisible ] = useState(false);

    const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

    const noAddEditDelete = (typeModal !== "Add" && typeModal !== "Edit" && typeModal !== "Delete");

    return (
        <Typography.Title level={5} className="left">
            {
                typeModal !== "Add" ? (
                    <Button 
                        type={ typeModal === "Delete" ? "danger" : "primary"}
                        onClick={ showModal } 
                    >
                        { typeModal }
                    </Button> 
                ) : (
                    <>
                        { addTitle }
                        <PlusCircleTwoTone
                            style={{ paddingLeft: 10, paddingRight: 580 }}
                            onClick={ showModal }
                        />
                    </>
                )
            }

            <Modal
                title={ addTitle }
                visible={ isModalVisible }
                okButtonProps={ noAddEditDelete && { style: { display: "none" } }}
                onOk={ handleOk }
                okText={ typeModal === "Edit" ? "Update" : addTitle }
                cancelText={ noAddEditDelete && "Close"}
                okType={ typeModal === "Delete" ? "danger" : "primary" }
                onCancel={handleCancel}
                width={ typeModal !== "Delete" ? 800 : 500 }
            >
                { children }
            </Modal>
        </Typography.Title>
    );
};

export default MultiPurposeModal;
