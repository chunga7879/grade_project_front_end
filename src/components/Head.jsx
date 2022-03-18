import Pool from "../UserPool";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {attributes} from "../components/Account";
import logo from '../images/signin.png';


export default function Head() {
    const user = Pool.getCurrentUser();
    const [givenName, setGivenName] = useState("");
    const [show, setShow] = useState(false);

    const logout = () => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
            setShow(false);

        }
    };

    useEffect(() => {
        attributes.then((value) => {
            setGivenName(value['given_name']);
        });
    })


    if (user) {
        return (
            <header>
                <div className="header__container">
                    <div className="logo_container">
                        <Link to="/home">
                            <img src={logo} alt="Chunga's Logo" className="logo"/>
                        </Link>
                    </div>
                    <div className="title">Grade Management</div>
                    <div className="subtitle">
                        Manage Your Course & Grade Effectively to get A+
                    </div>
                    <div>
                        <button onClick={() => {
                            setShow((s) => !s);
                        }} className="user_box" >
                            Hi, {givenName}
                        </button>
                        <button id="logout" onClick={logout} style={{ visibility: show ? "visible" : "hidden"}} className="user_box two">
                            <Link to="/login" style={{ all: 'unset' }}>Logout</Link>
                        </button>
                    </div>
                </div>
            </header>
        );
    } else {
        return (
            <header>
                <div className="header__container">
                    <div className="title">University of British Columbia</div>
                    <div className="subtitle">
                        Manage Courses and Grades Effectively!!!
                    </div>
                    <div>
                        <button className="user_box">
                            <Link to="/login" style={{ all: 'unset' }}>Login</Link>
                        </button>
                    </div>
                </div>
            </header>
        );
    }

}
