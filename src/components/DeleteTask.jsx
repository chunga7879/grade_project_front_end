import axios from "axios";
import Pool from "../UserPool";
import React, {useState} from "react";
import '../css/yearPopUp.css';
import {Input} from "antd";

export const DeleteTask = (props) => {
    const { open, close, header, semID, courseName} = props;

    const [taskName, setTask] = useState("");
    const [perToCourse, setPercentage] = useState("0.0");
    const [numSubTasks, setNumSubTasks] = useState("1");

    const onSubmitDeleteTask = (event) => {
        event.preventDefault();

        axios.delete("http://localhost:4000/api/deleteTask/" + Pool.getCurrentUser().getUsername() + "/" + semID + "/" + courseName + "/" + taskName).then((res) => {
            console.log(res.data);
            window.location.reload(false);

        });

    }

    return (
        <div className={open ? 'openModal modal' : 'modal'}>
            {
                open ? (
                    <section>
                        <header>
                            {header}
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                        </header>
                        <main>
                            <form>
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
                            </form>
                        </main>
                        <footer>
                            <button onClick={onSubmitDeleteTask}>
                                DELETE
                            </button>
                        </footer>
                    </section>
                ) : null
            }
        </div>
    );
}