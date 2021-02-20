import React, { useState/* , useContext */ } from 'react';
import Airtable from 'airtable';
import { Button, Input, Form, Card, Row, Col, Typography, Descriptions, List, Avatar, Space } from 'antd';
import _ from 'lodash';
import { UploadOutlined, MailOutlined, MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import LoadPic from './LoadPic';
import { StyledDivSummary } from '../../assignments/styles';
import UserContext from '../../../contexts/UserContext';


//MF: thinking can be static data but called from the backend
// const [data, setData] = useState([]);
// data = {
  //   Id: '1',  
  //   Name: 'Mel',
  //   Last: 'Ferguson',
  //   Class: 'Sunrise',
  //   Email: 'Mel@email.com',
  // }

// const base = new Airtable({apiKey: process.env.REACT_APP_USER_INFO_API_KEY}).base('appm5NPkqO7P8ePUK');

const AccountOverview = () => {
	const [data ]= useState([{
		Id: '1',  
		Name: 'Mel',
		Last: 'Ferguson',
		Class: 'Sunrise',
		Email: 'Mel@email.com',
	}]);

  // 
  // for(let i=1; i<1; i++) {
  //   listData.push({
  //     href: 'https://ant.design',
  //     title: `ant design part ${i}`,
  //     // avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  //     description:
  //       'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  //     content:
  //       'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  //   });
  // };

	function IconText({ icon, text }) {
		return (
			<Space>
				{React.createElement(icon)}
				{text}
			</Space>
		);
	}

  // const [userInfo, dispatchUser] = useContext(UserContext);
  // console.log(userInfo)
  // const updateUser = (values)=>{
  //   const { id, ...rest } = values;
  //   base('User_Info_Table').update([
  //     {
  //       "id": id,
  //       "fields": {
  //         ...rest
  //       }
  //     }
  //   ], function(err, records) {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     records.forEach(function(record) {
  //       console.log(record.get('Name'));
  //     });
  //   });
  //   dispatchUser({type: "all", payload: { field: "all", value: values}});


  // render() {
	// use for email input
	// const props = {
	//   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
	//   // onChange: {handleChange},
	//   multiple: true,
	// };

	// const layout = {
	//     labelCol: {
	//       span: 8,
	//     },
	//     wrapperCol: {
	//       span: 16,
	//     },
	//   };
	
	//   const validateMessages = {
	//     required: '${label} is required!',
	//     types: {
	//       email: '${label} is not a valid email!',
	//       number: '${label} is not a valid number!',
	//     },
	//     number: {
	//       range: '${label} must be between ${min} and ${max}',
	//     },
	//   }; 
	//   const Demo = () => {
	//     const onFinish = (values) => {
	//       console.log(values);
	//     };
	// };

	//MF: to passing the props from the user context 
//       const user = ({info}) => {
// console.log(info)
//   };

	return (
		<Card>
			<List
				itemLayout="vertical"
				size="large"
			// pagination={{
			//   onChange: page => {
			//     console.log(page);
			//   },
			//   pageSize: 3,
			// }}
				dataSource={data}
			// footer={
			//   <div>
			//     <b>ant design</b> footer part
			//   </div>
			// }
				renderItem={item => (
					<List.Item
				// key={item.title}
						extra={
							<LoadPic />			
						}
					>
				
						<List.Item.Meta
							title="User Info"
							description="You can edit your name only"
					// title={<a href={item.href}>{item.title}</a>}
					// description={item.description}
						/>
				
						<Form layout="inline">
							<Form.Item
								name={['user', 'name']}
								label="LastName"
								
								// rules={[
								// {
									
								//     required: true,
								// },
								// ]}
							>
								<Input />
							</Form.Item>
						</Form>
						{item.content}
					</List.Item>
				)}
			/>
		</Card>
	);
			// userInfo ?
			// <Card>
			//     <Typography.Title level={4}>Profile</Typography.Title>
			//     <Row>

			//         <Col>
			//         {/* <Avatar src={userInfo.hasOwnProperty(0) ? userInfo[0].Picture[0].thumbnails.large.url : null} />  */}
			//         {/* uploads a profile picture */}
				
			//         </Col>
			//         <Col>
			//         {/* <Divider orientation="left">Default Size</Divider> */}
					
			//           {/* <List
					
			//             // dataSource={data}//airtable
			//             renderItem={item => (
			//               <List.Item> */}
			//                 {/* {item.first} */}
			//                 {/* <Typography.Text mark>[ITEM] </Typography.Text> {item}
							
			//               </List.Item>
			//             )}
			//           />
			//           <br /> */}
					

					
				
					

			//             <Form {...layout} name="nest-messages"  validateMessages={validateMessages}>
			//               <Form layout="inline">
							
			//                 <Form.Item
			//                     name={['user', 'name']}
			//                     label="LastName"
								
			//                     // rules={[
			//                     // {
									
			//                     //     required: true,
			//                     // },
			//                     // ]}
			//                 >
			//                     <Input />
			//                 </Form.Item>

			//                 <Form.Item
			//                     name={['user', 'name']}
			//                     label="FirstName"
								
			//                     // rules={[
			//                     // {
									
			//                     //     required: true,
			//                     // },
			//                     // ]}
			//                 >
			//                     <Input />
			//                 </Form.Item>
			//                 </Form>

			//                 <Col>
			//             <Descriptions>
			//               <Descriptions.Item label="Class"> Sunrise </Descriptions.Item>
			//               <Descriptions.Item label="Email"> Ant@gmail.com</Descriptions.Item>          
			//           </Descriptions>
			//             </Col>


			//                 <br />
			//                 {/* <Form layout="inline" name="horzontal">
			//                 <Form.Item
			//                     name={['user', 'name']}
			//                     label="Class"
			//                     // rules={[
			//                     // {
			//                     //     required: true,
			//                     // },
			//                     // ]}
			//                 >
			//                     <Input />
			//                 </Form.Item> */}
			//                 {/* MF: tried to put icon on the outside of input */}
			//                 {/* <MailOutlined className="site-form-item-icon" />  */}
			//                 {/* <Form.Item
							
			//                     name={['user', 'email']}
			//                     label="Email" 
			//                     rules={[
			//                     {
			//                         type: 'email',
			//                     },
			//                     ] }
			//                 >
			//                     <Input prefix={<MailOutlined className="site-form-item-icon" />}/>
			//                 </Form.Item> */}
			//                 {/* </Form> */}
			//             </Form>
			//         </Col>
			//     </Row>
				// <StyledDivSummary>  
				//  <Button type="primary" disabled>Cancel</Button>
				//     <Button type="primary">Edit Profile</Button>
				// </StyledDivSummary>     
				
		// </Card>
		// : null

							// };                  

						// };
};


// const [fileList, setFileList]=useState([{
//     uid: '-1',
//     name: 'xxx.png',
//     status: 'done',
//     url: 'http://www.baidu.com/xxx.png',}]);//MF-what is this url?

//     // handleChange = info => {
//     //     let fileList = [...info.fileList];
//     //     // 1. Limit the number of uploaded files
//     // // Only to show two recent uploaded files, and old ones will be replaced by the new
//     // fileList = fileList.slice(-2);

//     // // 2. Read from response and show file link
//     // fileList = fileList.map(file => {
//     //   if (file.response) {
//     //     // Component will show file.url as link
//     //     file.url = file.response.url;
//     //   }
//     //   return file;
//     // });

//     // };
//         setFileList({ fileList });

//         const props = {
//             action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//             // onChange: {handleChange},
//             multiple: true,
//             };


//     return(
//     <>

//         <div>
//             <h1>Account Overview</h1>
//             <div className="profile-main">
//                 <div className="profile-pic">
//                     <Upload {...props} fileList={fileList}>
//                         <Button icon={<UploadOutlined />}>Upload</Button>
//                     </Upload>
//                 </div>
//                 <div className="profile-info">
//                     <h5>Profile</h5>
//                     <div className="profile-mains">
//                         <div className="column-one">
//                         </div>
//                         <Form className="column-two">
						
//                             <Form.Item label="Name">
//                                 <Input/>
//                             </Form.Item>
//                          </Form>   
//                     </div>
					
//                 </div>
//             </div>
				
//         </div>
//             <div>  {/*MF-buttons need flexing*/}
//                 <button>Cancel</button>
//                 <button>Edit Profile</button>
//             </div>   
		

		
//     </> 

//         )
// }





export default AccountOverview
