/** @format */

import React, { useState, useContext } from "react";
import { StyledEvents, StyledCalendar } from "./styles";
import "../../../HomePage.css";
import CalendarContext from "../../../../contexts/CalendarContext";
import * as ROUTES from "../../../../../constants/routes";
import {
    Calendar,
    Badge,
    Space,
    Select,
    Radio,
    Col,
    Row,
    Typography,
    Card,
} from "antd";

function onPanelChange(value, mode) {
    console.log(value, mode);
}

const SmallCalendar = ({ history }) => {
    const [selectedDate, setSelectedDate] = useContext(CalendarContext);

    function getListData(value) {
        let listData;
        switch (value.date()) {
        }
        return listData || [];
    }

    function dateCellRender(value) {
        const listData = getListData(value);
        return (
            <StyledEvents>
                {listData.map((item, index) => (
                    <div key={index}>
                        <Badge status={item.type} text={item.content} />
                    </div>
                ))}
            </StyledEvents>
        );
    }

    function getMonthData(value) {
        if (value.month() === 8) {
            return 1394;
        }
    }

    function monthCellRender(value) {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    }

    function onSelect(selectedDate) {
        setSelectedDate(selectedDate);
        history.push(`${ROUTES.HOME}${ROUTES.CALENDAR}`);
    }
    
    return (
        <StyledCalendar>
            <Calendar
                className="staffCalendar"
                fullscreen={false}
                onSelect={onSelect}
                monthCellRender={monthCellRender}
                headerRender={({
                    value,
                    type,
                    onChange,
                    onTypeChange,
                }) => {
                    const start = 0;
                    const end = 12;
                    const monthOptions = [];
    
                    const current = value.clone();
                    console.log(current);
                    const localeData = value.localeData();
                    const months = [];
                    for (let i = 0; i < 12; i++) {
                        current.month(i);
                        months.push(localeData.monthsShort(current));
                    }
    
                    for (let index = start; index < end; index++) {
                        monthOptions.push(
                            <Select.Option
                                className="month-item"
                                key={`${index}`}>
                                {months[index]}
                            </Select.Option>
                        );
                    }
                    const month = value.month();
    
                    const year = value.year();
                    const options = [];
                    for (let i = year - 10; i < year + 10; i += 1) {
                        options.push(
                            <Select.Option
                                key={i}
                                value={i}
                                className="year-item">
                                {i}
                            </Select.Option>
                        );
                    }
                    return (
                        <div style={{ padding: 10 }}>
                            <Row gutter={8} style={{ marginBottom: 0 }} justify="center">
                                <Col>
                                    <Select
                                        size="small"
                                        dropdownMatchSelectWidth={false}
                                        value={String(month)}
                                        onChange={(selectedMonth) => {
                                            const newValue = value.clone();
                                            newValue.month(
                                                parseInt(
                                                    selectedMonth,
                                                    10
                                                )
                                            );
                                            onChange(newValue);
                                        }}>
                                        {monthOptions}
                                    </Select>
                                </Col>
                                <Col>
                                    <Typography.Title
                                        level={5}
                                        className="center"
                                        style={{ marginBottom: 0 }}
                                        >
                                        Calendar
                                    </Typography.Title>
                                </Col>
                                <Col>
                                    <Select
                                        size="small"
                                        dropdownMatchSelectWidth={true}
                                        className="my-year-select"
                                        onChange={(newYear) => {
                                            const now = value
                                                .clone()
                                                .year(newYear);
                                            onChange(now);
                                        }}
                                        value={String(year)}>
                                        {options}
                                    </Select>
                                </Col>
                            </Row>
                        </div>
                    );
                }}
                onPanelChange={onPanelChange}
            />
        </StyledCalendar>
    );
};

export default SmallCalendar;
