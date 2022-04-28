import axios from "axios";
import Pool from "../UserPool";
import {useState} from "react";
import '../css/yearPopUp.css';

const DeleteYear = (props) => {
    const { open, close, header} = props;

    const [year, setYear] = useState("2021");
    const [session, setSession] = useState("0");
    const [semester, setSemester] = useState("1");

    const onSubmitDeleteYear = (event) => {
        event.preventDefault();

        axios.delete("http://localhost:4000/api/deleteYear/" + Pool.getCurrentUser().getUsername() + "/" + year + "/" + session + "/" + semester).then((res) => {
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
                        </main>
                        <footer>

                        </footer>
                    </section>
                ) : null
            }
        </div>
    );
}