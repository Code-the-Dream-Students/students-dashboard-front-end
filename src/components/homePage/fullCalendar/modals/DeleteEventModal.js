import React from 'react';
import { Modal, Form, Input, Button } from "antd";


const DeleteEventModal = () => {
	return (
		<Modal
			title="Delete Event"
			visible={visible}
			onOk={handleOk}
			onCancel={handleCancel}
		>
			<form>
				<label for="event">Event Name:</label>
				<input type="text"></input>
			</form>
		</Modal>
	)
}

export default DeleteEventModal;