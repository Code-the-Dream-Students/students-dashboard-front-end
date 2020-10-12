import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout,  Menu, Button, Row, Col} from 'antd';
import{ SlackOutlined,GithubOutlined,}from '@ant-design/icons';
import Login from './Login'
const { Footer,Content } = Layout;
const Main = () => {
  return (
    <>
  <Layout className="content-landing">
      <Menu mode="horizontal">
        <Button className="modified-item" type="link"href="https://www.codethedream.org/about/" target="_blank">About</Button>
        <Button className="modified-item" type="link" href="https://www.codethedream.org/classes/" target="_blank">FAQS</Button>
        <Button className="apply-btn" type="primary" href="https://www.codethedream.org/apply-now/" target="_blank" >Apply Now</Button>
      </Menu>
      <Content >
          <Row gutter={[8,8]} >
            <Col xs={24} sm={12}>
            <div className="info">
                <img className="logo" src='/images/logo_red.png' alt="CTD Logo"></img>
                <div>
                  <p className="text-info">
                    This website is your main hub for class materials for Code the Dream’s classes.</p><p>Login to access and start your assignments.
                  </p>
                </div>
                  <div><Login /></div>
              </div> 
            </Col>
          </Row>  
      </Content>
      <Footer>
        <div className="icons-list">CODE THE DREAM | WWW.CODETHEDREAM.ORG </div>
        <div className="icons-list">
          <Button type="link" href="https://www.codethedream.org/" target="_blank"><img src='/images/ctd.png' alt=" Code the Dream"></img></Button>
          <Button  type="link" href="https://teamtreehouse.com/home" target="_blank"><img  src='/images/treehouse.png' alt="Team Treehouse"></img></Button>
          <Button type="link" href="https://app.slack.com/client/T07EHJ738/learning-slack" target="_blank"><SlackOutlined/></Button>
          <Button type="link" href="https://github.com/Code-the-Dream-School?type=source" target="_blank"><GithubOutlined /></Button>
         </div>
      </Footer>
    </Layout>
    </>
  );
}

export default Main;