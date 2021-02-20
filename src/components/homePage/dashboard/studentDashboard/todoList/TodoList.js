/** @format */

import React, { useState, useEffect } from "react";
import { Card, Typography, Checkbox } from "antd";
import "./styles.css";

const Todo = ({ todo, completeTodo }) => {
    return (
        <div style={{ textDecoration: todo.Status ? "line-through" : "" }}>
            <div>
                <Checkbox
                    checked={todo.fields.Status ? true : null}
                    onChange={() => completeTodo(todo.id, !todo.fields.Status)}
                />
                <span style={{ paddingLeft: 10 }}>{todo.fields.ToDo}</span>
            </div>
        </div>
    );
};

const ToDoList = () => {
    const getToDoData = async () => {
        const response = await fetch(
            "https://api.airtable.com/v0/appm5NPkqO7P8ePUK/List?api_key=keyclOytaXo7NHQ8M"
        );
        const todoData = await response.json();
        return todoData;
    };

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        getToDoData().then((data) => setTodos(data.records));
    }, []);

    const completeTodo = (id, status) => {
        fetch("https://api.airtable.com/v0/appm5NPkqO7P8ePUK/List", {
            body: JSON.stringify({
                records: [
                    {
                        id: id,
                        fields: {
                            Status: status,
                        },
                    },
                ],
            }),
            headers: {
                Authorization: "Bearer keyclOytaXo7NHQ8M",
                "Content-Type": "application/json",
            },
            method: "PATCH",
        })
            .then(() => {
                getToDoData().then((data) => setTodos(data.records));
            })
            .catch((e) => {
                console.log(e);
                alert("Unable to update to do ");
            });
    };
    
    return (
        <>
            <Card className="card-todo">
                <Typography.Title level={5} style={{ color: "black" }}>
                    To Do
                </Typography.Title>
                {
                    todos && (
                        todos.map((todo, index) => (
                            <Todo
                                key={index}
                                id={todo.id}
                                todo={todo}
                                completeTodo={completeTodo}
                            />
                        ))
                    )
                }
            </Card>
        </>
    );
};

export default ToDoList;









