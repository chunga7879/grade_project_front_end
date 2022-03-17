import {IoIosAddCircle} from "react-icons/io";
import {Input} from "antd";
import React, {useEffect, useState} from "react";
import Pool from "../UserPool";
import axios from "axios";
import '../css/task.css';
import SubTask from "./SubTask";



export default function Tasks({
        semID,
        courseName
                              }) {

    const userName = Pool.getCurrentUser().getUsername();
    const [show, setShow] = useState(false);
    const [taskName, setTask] = useState("");
    const [perToCourse, setPercentage] = useState("0.0");
    const [numSubTasks, setNumSubTasks] = useState("1");
    const [taskList, setTaskList] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:4000/api/getTaskList/" + Pool.getCurrentUser().getUsername() + `/${semID}/${courseName}`)
            .then((response) => {
                let arr  = response.data;
                setTaskList(arr);
            })
    }, []);

    const onSubmitTask = (event) => {
        event.preventDefault();

        axios.post("http://localhost:4000/api/createTask", {courseName: courseName, semID: semID
            , userName: userName, taskName: taskName, perToCourse: perToCourse, numSubTasks: numSubTasks}).then((res) => {
            console.log(res.data);
        });

        setShow((s) => !s);
    }

    const onSubmitDeleteTask = (event) => {
        event.preventDefault();

        axios.delete("http://localhost:4000/api/deleteTask/" + Pool.getCurrentUser().getUsername() + "/" + semID + "/" + courseName + "/" + taskName).then((res) => {
            console.log(res.data);
        });

        setShow((s) => !s);

    }

    return (
        <div className="inner">
            <div className="middleTask">
                <button onClick={() => {
                    setShow((s) => !s);
                }} id="taskAdd">
                    <IoIosAddCircle />
                </button>

                <form style={{ visibility: show ? "visible" : "hidden"}} onSubmit={onSubmitTask} id="taskForm">
                    <label>
                        Task Name: <br />
                        <Input
                            placeholder="Midterm"
                            type="text"
                            name="taskName"
                            className="input"
                            value={taskName}
                            onChange={(event) => setTask(event.target.value)}
                        />
                    </label> <br />
                    <label>
                        Percentage To Course : <br />
                        <Input
                            placeholder="20.0"
                            name="perToCourse"
                            className="input"
                            value={perToCourse}
                            onChange={(event) => setPercentage(event.target.value)}
                        />
                    </label> <br />
                    <label>
                        Number of Sub-tasks : <br />
                        <Input
                            placeholder="1"
                            name="numSubTasks"
                            className="input"
                            value={numSubTasks}
                            onChange={(event) => setNumSubTasks(event.target.value)}
                        />
                    </label> <br />
                    <button onClick={onSubmitTask}>
                        ADD
                    </button>
                    <br />
                    <button onClick={onSubmitDeleteTask}>
                        DELETE
                    </button>
                </form>
            </div>

            <div className="tasks">
                {taskList.map((task) => {
                    const {taskName, numSubTasks, totalTaskGrade, perToCourse} = task;

                    return (
                        <div className="task">
                            <div className="taskTitles">
                                <p className="taskTitle">
                                    &#183;&nbsp;{taskName} &nbsp;
                                </p>
                                <span className="taskDetail">
                                    %: {perToCourse} &nbsp;
                                    Grade:{totalTaskGrade}
                                </span>
                            </div>
                            {[...Array(numSubTasks)].map((e, i) => {
                                return (
                                    <SubTask
                                        semID={semID}
                                        courseName={courseName}
                                        taskName={taskName}
                                        subTask={i + 1}
                                        numSubTasks={numSubTasks}
                                    />
                                );

                            })}

                        </div>

                    );
                })}
            </div>
        </div>
    );
}