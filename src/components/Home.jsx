import Pool from "../UserPool";
import { IoIosAddCircle } from "react-icons/io";
import {useEffect, useState} from "react";
import axios from "axios";
import '../css/home.css';



export default function Home(props) {
    const [show, setShow] = useState(false);
    const [year, setYear] = useState("2021");
    const [session, setSession] = useState("0");
    const [semester, setSemester] = useState("1");
    const [semList, setSemList] = useState([]);


    useEffect(() => {
            axios.get("http://localhost:3001/api/getYearList/" + Pool.getCurrentUser().getUsername())
                .then((response) => {
                    let arr  = response.data;
                    setSemList(arr);
                })
    }, []);

    const onSubmitYear = (event) => {
        event.preventDefault();

        axios.post("http://localhost:3001/api/createYear", {year: year, session: session, semester: semester
            , userName: Pool.getCurrentUser().getUsername()}).then((res) => {
            console.log(res.data);
        });

        setShow((s) => !s);

    }

    const onSubmitDeleteYear = (event) => {
        event.preventDefault();

        axios.delete("http://localhost:3001/api/deleteYear/" + Pool.getCurrentUser().getUsername() + "/" + year + "/" + session + "/" + semester).then((res) => {
            console.log(res.data);
        });

        setShow((s) => !s);

    }

    return (
        <div className="big">
            <h1 className="title">List of Year</h1>

            <div className="inner">
                <div className="middleYear">
                    <button onClick={() => {
                        setShow((s) => !s)
                    }} className="addYear">
                        <IoIosAddCircle />
                    </button>

                    <form style={{ visibility: show ? "visible" : "hidden"}}>
                        <label>
                            Year: <br />
                            <select value={year} onChange={(event) => setYear(event.target.value)}>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                            </select>
                        </label> <br />
                        <label>
                            Session: <br />
                            <select value={session} onChange={(event) => setSession(event.target.value)}>
                                <option value="0">Winter</option>
                                <option value="1">Summer</option>
                            </select>
                        </label> <br />
                        <label>
                            Semester:<br />
                            <select value={semester} onChange={(event) => setSemester(event.target.value)}>
                                <option value="1">Semester 1</option>
                                <option value="2">Semester 2</option>
                            </select>
                        </label> <br />
                        <button onClick={onSubmitYear}>
                            ADD
                        </button>
                        <button onClick={onSubmitDeleteYear}>
                            DELETE
                        </button>

                    </form>
                </div>

                <div className="sems">
                    {semList.map((sem) => {
                        const {semID, totalSemGrade, userName} = sem;
                        let year = semID.toString().substr(0, 4);
                        let session = semID.toString().substr(4, 1);
                        let sessionString = "";
                        let semester = semID.toString().substr(5, 1);
                        if (session === "0") {
                            sessionString = "WINTER"
                        } else if (session === "1") {
                            sessionString = "SUMMER"
                        }

                        return (
                            <button className="semBlock" onClick={(event) => {
                                event.preventDefault();
                                props.history.push(`/courses/${semID}`)

                            }}>
                                <h1>
                                    {year} <br />
                                    {sessionString} <br />
                                    Semester {semester}<br />
                                    Grade: {totalSemGrade}<br />
                                </h1>

                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}