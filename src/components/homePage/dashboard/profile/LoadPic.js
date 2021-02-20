import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';


const getBase64=(img, callback)=> {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

const beforeUpload=(file) => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!');
	}
	return isJpgOrPng && isLt2M;
}

const Avatar = () => {
	const [loading, setLoading] = useState(false);
	const [ imageUrl, setImageUrl] = useState(false)

	// state = {
	//   loading: false,
	// };

	const handleChange = info => {
		if (info.file.status === 'uploading') {
			setLoading ({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
		// Get this url from response in real world.
			getBase64(info.file.originFileObj, imageUrl =>
				setLoading ({
					imageUrl,
					loading: false,
				}),
			);
		}
	};
	// const { loading, imageUrl } = false;
	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <UserOutlined style={{ fontSize: '36px'}}/>}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);
	
	return (
		<>
			<Upload
				name="avatar"
				listType="picture-card"
				className="avatar-uploader"
				showUploadList={false}
				action="https://api.airtable.com/v0/appm5NPkqO7P8ePUK/User_Info_Table?api_key=keyclOytaXo7NHQ8M" //connect to airtable?
				beforeUpload={beforeUpload}
				onChange={handleChange}
			>
				{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
			</Upload>
		</>
	);
}

export default Avatar;