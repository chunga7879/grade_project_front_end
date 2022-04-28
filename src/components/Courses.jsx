import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Pool from "../UserPool";

import axios from "axios";
import '../css/course.css';
import {AddCourse} from "./AddCourse";
import {DeleteCourse} from "./DeleteCourse";


export default function Courses(props) {

    let params = useParams();
    const semID = parseInt(params.semID);
    const [courseList, setCourseList] = useState([]);

    const [addOpen, setAddOpen] = useState(false);
    const [delOpen, setDeleteOpen] = useState(false);

    const openAdd = () => {
        setAddOpen(true);
    };
    const closeAdd = () => {
        setAddOpen(false);
    };

    const openDelete = () => {
        setDeleteOpen(true);
    };
    const closeDelete = () => {
        setDeleteOpen(false);
    };

    useEffect(() => {
        axios.get("http://localhost:4000/api/getCourseList/" + Pool.getCurrentUser().getUsername() + `/${semID}`)
            .then((response) => {
                let arr  = response.data;
                setCourseList(arr);

            })
    }, []);

    return (
        <div className="big">
            <h1 className="title">List of Courses</h1>

            <div className="inner">
                <div className="choices">
                    <button onClick={
                        openAdd
                    } className="addYear">
                        <span>ADD COURSE</span>
                    </button>
                    <button onClick={
                        openDelete
                    } className="addYear">
                        <span>ADD COURSE</span>
                    </button>
                </div>

                <div className="middleCourse">
                    <AddCourse open={addOpen} close={closeAdd} header="ADD Course" semID={semID}/>
                </div>
                <div className="middleCourse">
                    <DeleteCourse open={delOpen} close={closeDelete} header="DELETE Course" semID={semID}/>
                </div>

                <div className="cors">
                    {courseList.map((course) => {
                        const {courseName, courseSection, totalCourseGrade, fail } = course;

                        return (
                            <button className="course" onClick={(event) => {
                                event.preventDefault();
                                props.history.push(`/tasks/${semID}/${courseName}`);
                            }}>
                                    <h1 className="courseTitle">
                                        {courseName} &nbsp;
                                        {courseSection}
                                    </h1>
                                    <h2 className="courseGrade">
                                        Grade: {totalCourseGrade} &nbsp;
                                    </h2>

                            </button>

                        );
                    })}
                </div>
            </div>

        </div>
    );
}
