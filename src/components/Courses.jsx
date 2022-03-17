import React, {Component, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Pool from "../UserPool";
import {IoIosAddCircle} from "react-icons/io";
import {Input} from "antd";
import axios from "axios";
import '../css/course.css';
import Tasks from '../components/Tasks';


export default function Courses() {

    let params = useParams();
    const semID = parseInt(params.semID);
    const userName = Pool.getCurrentUser().getUsername();
    const [show, setShow] = useState(false);
    const [courseName, setCourse] = useState("");
    const [courseSection, setSection] = useState(0);
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/getCourseList/" + Pool.getCurrentUser().getUsername() + `/${semID}`)
            .then((response) => {
                let arr  = response.data;
                setCourseList(arr);
            })
    }, []);

    const onSubmitCourse = (event) => {
        event.preventDefault();

        axios.post("http://localhost:4000/api/createCourse", {courseName: courseName, courseSection: courseSection, semID: semID
            , userName: userName}).then((res) => {
            console.log(res.data);
        });

        setShow((s) => !s);

    }

    const onSubmitCourseDelete = (event) => {
        event.preventDefault();

        axios.delete("http://localhost:4000/api/deleteCourse/" + Pool.getCurrentUser().getUsername() + "/" + semID + "/" + courseName).then((res) => {
            console.log(res.data);
        });

        setShow((s) => !s);

    }

    return (
        <div className="big">
            <h1 className="title">List of Courses</h1>

            <div className="inner">
                <div className="middle">
                    <button onClick={() => {
                        setShow((s) => !s)
                    }} className="addCourse">
                        <IoIosAddCircle />
                    </button>

                    <form style={{ visibility: show ? "visible" : "hidden"}} onSubmit={onSubmitCourse} className="courseAdd">
                        <label>
                            CourseName: <br />
                            <Input
                                placeholder="Course Name"
                                type="text"
                                name="courseName"
                                className="input"
                                value={courseName}
                                onChange={(event) => setCourse(event.target.value)}
                            />
                        </label> <br />
                        <label>
                            Section Number: <br />
                            <Input
                                placeholder="Course Section Number"
                                name="courseSection"
                                className="input"
                                value={courseSection}
                                type="number"
                                onChange={(event) => setSection(event.target.value)}
                            />
                        </label> <br />

                        <button onClick={onSubmitCourse}>
                            ADD
                        </button>
                        <br />
                        <button onClick={onSubmitCourseDelete}>
                            DELETE
                        </button>
                    </form>
                </div>

                <div className="cors">
                    {courseList.map((course) => {
                        const {courseName, courseSection, totalCourseGrade, fail } = course;

                        return (
                            <div className="course">
                                <h1 className="courseTitle">
                                    {courseName} &nbsp;
                                    {courseSection}
                                </h1>
                                <h2 className="courseGrade">
                                    Grade: {totalCourseGrade} &nbsp;
                                </h2>
                                <div className="course_underline" />

                                <Tasks
                                    semID={semID}
                                    courseName={courseName}
                                />

                            </div>

                        );
                    })}
                </div>
            </div>

        </div>
    );
}
