import React, {useEffect, useState} from "react";
import axios from "axios";
import Pool from "../UserPool";
import {Input} from "antd";
import '../css/subTask.css';


export default function SubTask ({
          semID,
          courseName,
          taskName,
          subTask,
          numSubTasks
                                 }) {
    const userName = Pool.getCurrentUser().getUsername();

    const [subGrade, setSubGrade] = useState(100.0);
    const [subOutOf, setSubOutOf] = useState(100.0);

    useEffect(() => {
        axios.get("http://localhost:4000/api/getSubTask/" + userName + `/${semID}/${courseName}/${taskName}/${subTask}`)
            .then((response) => {
                let arr  = response.data;
                let one  = arr[0];
                setSubGrade(one.subGrade);
                setSubOutOf(one.subOutOf);
            })
    }, []);

    const onSubmitSubTask = (event) => {
        event.preventDefault();

        axios.post("http://localhost:4000/api/createSubTask", {courseName: courseName, semID: semID
            , userName: userName, taskName: taskName, subTask: subTask, subGrade: subGrade, subOutOf: subOutOf}).then((res) => {
            console.log(res.data);
            axios.put("http://localhost:4000/api/changeGrade/" + userName + `/${semID}/${courseName}/${taskName}/${numSubTasks}`).then((res) => {
                console.log(res.data);
            })
        });
    }

    return (
        <form onSubmit={onSubmitSubTask}>
            <div className="subTask">
                <div className="subtaskTitle">{taskName} {subTask} : </div>
                <div className="subs">
                    <Input
                        placeholder=""
                        name="grade"
                        className="input"
                        value={subGrade}
                        type="number"
                        onChange={(event) => setSubGrade(event.target.value)}
                    />

                    <div className="slash"> / </div>

                    <Input
                        placeholder=""
                        name="outOf"
                        className="input"
                        value={subOutOf}
                        type="number"
                        onChange={(event) => setSubOutOf(event.target.value)}
                    />
                    <input type="submit" value="Submit" className="submit" />
                </div>

            </div>
        </form>
    );

}

