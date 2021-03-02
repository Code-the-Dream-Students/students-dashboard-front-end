import React, { useContext } from 'react';
import MultiPurposeModal from '../../multiPurposeModal/MultiPurposeModal';
import UserContext from '../../../../contexts/UserContext';

const DeleteCourse = ({ course }) => {

    const [authToken] = useContext(UserContext);

    const handleDelete = (event) => {
        event.preventDefault();

        fetch(`${process.env.REACT_APP_GET_COURSES}/${course.id}`, {
            method: "DELETE",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken
            }
        })
            .then(response => response.json())
            .then(() => {
                window.location.reload();
            })
            .catch(console.error)
    };

    return (
        <MultiPurposeModal
            handleOk={handleDelete}
            addTitle="Delete Course"
            typeModal="Delete"
        >
            { `Are you sure you want to delete "${course.course_name}"?`}
        </MultiPurposeModal>
    );
};

export default DeleteCourse;
