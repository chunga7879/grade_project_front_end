import axios from "axios";
import Pool from "../UserPool";
import React, {useState} from "react";
import '../css/yearPopUp.css';
import {Input} from "antd";

export const AddCourse = (props) => {
    const { open, close, header, semID} = props;

    const [courseName, setCourse] = useState("");
    const [courseSection, setSection] = useState(0);

    const onSubmitCourse = (event) => {
        event.preventDefault();

        axios.post("http://localhost:4000/api/createCourse", {courseName: courseName, courseSection: courseSection, semID: semID
            , userName: Pool.getCurrentUser().getUsername()}).then((res) => {
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

                            </form>
                        </main>
                        <footer>
                            <button onClick={onSubmitCourse}>
                                ADD
                            </button>
                        </footer>
                    </section>
                ) : null
            }
        </div>
    );
}