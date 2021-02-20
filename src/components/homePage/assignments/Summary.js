/** @format */

import React from "react";
import { Typography } from "antd";
const Summary = ({ weekNumber, unit }) => {
    return (
        <div>
            <Typography.Title level={5}>
                Welcome to <u>Week {weekNumber}</u> of our <u>{unit.unit_name}</u>{" "}
                Development track.
            </Typography.Title>
            <Typography.Title level={5}>Summary</Typography.Title>
            <p>
                The Front End Development Track covers the principle front-end
                development skills needed to prepare you for a career in building
                user interfaces, websites, and user experiences that delight users.
                These skills include advanced HTML, CSS, and JavaScript.
            </p>
        </div>
    );
};

export default Summary;
