import React, {useEffect, useState} from "react";
import Pool from "../UserPool";
import axios from "axios";
import '../css/task.css';
import SubTask from "./SubTask";
import {useParams} from "react-router-dom";
import {AddTask} from "./AddTask";
import {DeleteTask} from "./DeleteTask";
import Footer from "./Footer";

export default function Tasks() {

    const {semID, courseName} = useParams();
    const [courseGrade, setCourseGrade] = useState();

    const [taskList, setTaskList] = useState([]);

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
        axios.get("http://localhost:4000/api/getTaskList/" + Pool.getCurrentUser().getUsername() + `/${semID}/${courseName}`)
            .then((response) => {
                let arr  = response.data;
                setTaskList(arr);

                axios.get("http://localhost:4000/api/getCourseGrade/" + Pool.getCurrentUser().getUsername() + `/${semID}/${courseName}`).then((response) => {
                    let arr2  = response.data;
                    let grade = arr2[0].totalCourseGrade;
                    setCourseGrade(grade);
                });
            });

    }, []);

    return (
        <div className="taskList inner">
            <div className="choices">
                <button onClick={
                    openAdd
                } className="add">
                    <span>ADD TASK</span>
                </button>
                <button onClick={
                    openDelete
                } className="delete">
                    <span>DELETE TASK</span>
                </button>
            </div>

            <div className="middleTask">
                <AddTask open={addOpen} close={closeAdd} header="TASK" semID={semID} courseName={courseName}/>
            </div>
            <div className="middleTask">
                <DeleteTask open={delOpen} close={closeDelete} header="TASK" semID={semID} courseName={courseName}/>
            </div>
            <div className="grade">
                <h2>Total Grade: { Number.parseFloat(courseGrade).toFixed(2) }</h2>
            </div>

            <div className="tasks">
                {taskList.map((task, j) => {
                    const {taskName, numSubTasks, totalTaskGrade, perToCourse} = task;

                    return (
                        <div className="task" key={j}>
                            <div className="titles">
                                <p className="taskTitle">
                                    {taskName}
                                </p>
                                <p className="taskDetail">
                                % {perToCourse} &nbsp;
                                    Grade:{Number.parseFloat(totalTaskGrade).toFixed(2)}
                                </p>
                            </div>
                            <div className="subTasks">
                                {[...Array(numSubTasks)].map((e, i) => {
                                    return (
                                        <div className="subParts" key={i}>
                                            <SubTask
                                                semID={semID}
                                                courseName={courseName}
                                                taskName={taskName}
                                                subTask={i + 1}
                                                numSubTasks={numSubTasks}
                                            />
                                        </div>

                                    );
                                })}
                            </div>
                            <div>
                                <ColoredLine color="grey" />
                            </div>

                        </div>

                    );
                })}
            </div>

        </div>
    );
}

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color,
            backgroundColor: color,
            position: 'absolute',
            left: '5%',
            height: '1px',
            width: '100%'
        }}
    />
);