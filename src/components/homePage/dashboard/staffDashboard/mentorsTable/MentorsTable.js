/** @format */

import React, { useState, useEffect } from "react";
import { Table, Input, Button, Popconfirm, Space, Card, PageHeader } from "antd";
import { SearchOutlined, PlusOutlined, FundOutlined } from "@ant-design/icons";

//run npm install react-highlight-words
import Highlighter from "react-highlight-words";

//Mentors Table
const MentorsTable = () => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [mentors, setMentors] = useState(null);

    const getMentorsData = async () => {
        const response = await fetch(
            "https://api.airtable.com/v0/appm5NPkqO7P8ePUK/Mentors?api_key=keyclOytaXo7NHQ8M"
        );
        const mentorsData = await response.json();
        let data = [];
        mentorsData.records.forEach((element) => {
            data.push(element.fields);
        });
        return data;
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    // ref={(node) => {
                    //   //this.searchInput = node;
                    // }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ width: 188, marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? "#1890FF" : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase())
                : "",
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#FFC069", padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
        ) : (
            text
        ),
    });

    useEffect(() => {
        getMentorsData().then((data) => setMentors(data));
    }, []);

    const handleDelete = (key) => {
        console.log(key);
        setMentors((mentors) => mentors.filter((item) => item.Key !== key));
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };
    
    const columns = [
        {
            title: "Name",
            dataIndex: "Name",
            key: "Name",
            editable: true,
            ...getColumnSearchProps("Name"),
        },
        {
            title: "Email",
            dataIndex: "Email",
            key: "Email",
            editable: true,
        },
        {
            title: "Course",
            dataIndex: "Course",
            key: "Course",
            editable: true,
        },
        {
            title: "Session Days",
            dataIndex: "Dates",
            key: "Dates",
            editable: true,
        },
        {
            title: "Times",
            dataIndex: "Times",
            key: "Times",
            editable: true,
        },
        {
            title: "Actions",
            dataIndex: "operation",
            render: (_, record) => (
                mentors.length >= 1 ? (
                    <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => handleDelete(record.Key)}
                    >
                        <a>Delete</a>
                    </Popconfirm>
                ) : null
            )
        },
    ];
    const handleAdd = () => {
        const newData = {
            Name: `mentor ${mentors.length + 1}`,
            Dates: "Thursday",
            Times: "8:30 PM EST",
            Key: `${mentors.length + 1}`,
            Email: `test${mentors.length}@gmail.com`,
            Course: "High Noon",
        };
        console.log(newData);
        setMentors((mentors) => [...mentors, newData]);
    };

    return (
        <Space direction="vertical">
            <Card type="inner">
                <PageHeader
                    ghost={false}
                    title="Mentors List"
                    extra={[
                        <Button
                            onClick={handleAdd}
                            key="2"
                            type="primary"
                            style={{ marginLeft: 160 }}>
                            Add Mentor <PlusOutlined />
                        </Button>,
                        <Button key="1" type="primary">
                            Track Mentors
                            <FundOutlined />
                        </Button>,
                    ]}></PageHeader>
                <Table bordered dataSource={mentors} columns={columns} />
            </Card>
        </Space>
    );
};
export default MentorsTable;
