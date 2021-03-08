import React, { useState, useContext } from 'react';
import { Table, Spin } from "antd";
import MultiPurposeModal from '../../multiPurposeModal/MultiPurposeModal';
import { Input } from "antd";
import UserContext from '../../../../contexts/UserContext';
import TextEditor from '../../../textEditor/TextEditor';

const Units = ({ units }) => {

  const [authToken] = useContext(UserContext);
  const [unitName, setUnitName] = useState("");
  const [unitDescription, setUnitDescription] = useState("");

  const columns = [
    {
      title: <strong>Unit Name</strong>,
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      width: "25%"
    },
    {
      title: <strong>Description</strong>,
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      width: "75%"
    }
  ];

  const data = units.map((unit) => {
    return {
      key: unit.id,
      name: unit.unit_name,
      description: <div dangerouslySetInnerHTML={{ __html: unit.description }} />
    }
  });

  const handleOk = (event) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_ROOT}/units`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authToken
      },
      body: JSON.stringify({
        unit_name: unitName,
        description: unitDescription
      })
    })
      .then(response => response.json())
      .then(() => {
        // console.log(data);
        window.location.reload();
      })
      .catch(console.error);
  };

  return (
    <>
      {
        units.length ? (
          <>
            <MultiPurposeModal
              handleOk={handleOk}
              addTitle="Add Unit"
            >
              <label>Unit Name: </label>
              <Input
                type="text"
                name="unitName"
                value={unitName}
                onChange={(event) => {
                  event.preventDefault();
                  setUnitName(event.target.value);
                }}
              />
              <br /><br />
              <label>Unit Description: </label>
              <TextEditor
                text={unitDescription}
                setText={setUnitDescription}
              />

              <br />
              {/* <Button type="primary" htmlType="submit" >
                                    Create Course
                                </Button> */}
            </MultiPurposeModal>
            <Table
              columns={columns}
              dataSource={data}
              scroll={{ y: 600 }}
              expandIconColumnIndex={2}
            />
          </>
        ) : (
            <Spin />
          )
      }
    </>
  );
};

export default Units;