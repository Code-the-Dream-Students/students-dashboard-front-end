import React from 'react';
import { Row, Col } from 'antd';

import complete from '../../../graphics/complete.png';

const Done = () => {
  return (
    <>
      <Row>
        <Col span={18} offset={6}>
          <img src={complete} style={{ width: '75%', verticalAlign: 'middle' }} alt="Done"></img>
        </Col>
      </Row>
      <Row>
        <Col span={18} offset={6}>
          <h4><strong>Thank you for submitting your assignment!</strong></h4>
        </Col>
      </Row>
      <Row>
        <Col span={17} offset={7}>
          <h4>We will review it and get back to you soon.</h4>
        </Col>
      </Row>
    </>
  )
}

export default Done;