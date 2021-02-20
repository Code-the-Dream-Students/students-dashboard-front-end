/** @format */
import "./main.css";
let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
    {
        title: "New Assignment",
        daysOfWeek: ["3"],
        description: "Star Week 1",
        className: "cal-green",
        editable: true,
    },

    {
        title: "Assignment Due Date",
        daysOfWeek: ["3"],
        description: "Star Week 1",
        className: "cal-orange",
        editable: true,
    },
    {
        title: "Christmas Break",
        start: "2020-12-24",
        end: "2020-12-24",
        description: "Star Week 1",
        className: "cal-red",
        editable: true,
    },
    {
        title: "2 Week Assignment",
        start: "2020-12-02",
        end: "2020-12-02",
        className: "cal-purple",
        editable: true,
    },

    {
        title: "Mentor Session",
        daysOfWeek: ["3", "4", "5", "6"],
        startTime: "10:45:00",
        endTime: "12:45:00",
        className: "cal-blue",
        editable: true,
    },
];

export function createEventId() {
    return String(eventGuid++);
}
