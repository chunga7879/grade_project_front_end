import Pool from "../UserPool";
import {useEffect, useState} from "react";
import axios from "axios";
import '../css/home.css';
import {AddYear} from "./AddYear";
import {DeleteYear} from "./DeleteYear";

export default function Home(props) {
    const [addOpen, setAddOpen] = useState(false);
    const [delOpen, setDeleteOpen] = useState(false);

    const [semList, setSemList] = useState([]);

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
            axios.get("http://localhost:4000/api/getYearList/" + Pool.getCurrentUser().getUsername())
                .then((response) => {
                    let arr  = response.data;
                    setSemList(arr);

                })
    }, []);


    return (
        <div className="big">
            <div className="choices">
                <button onClick={
                    openAdd
                } className="addYear">
                    <span>ADD YEAR</span>
                </button>
                <button onClick={
                    openDelete
                } className="addYear">
                    <span>DELETE YEAR</span>
                </button>
            </div>

            <div className="inner">
                <div className="middleYear">
                    <AddYear open={addOpen} close={closeAdd} header="ADD YEAR" />
                </div>
                <div className="middleYear">
                    <DeleteYear open={delOpen} close={closeDelete} header="DELETE YEAR" />
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