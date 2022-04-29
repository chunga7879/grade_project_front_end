import React, {useState} from "react";
import UserPool from "../UserPool";
import Pool from "../UserPool";
import { Row, Input } from 'antd';
import '../css/sign.css';
import {CognitoUser, AuthenticationDetails} from "amazon-cognito-identity-js";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let history = useHistory();
    const onSubmit = (event) => {
        event.preventDefault();

        const user = new CognitoUser({
            Username: email,
            Pool: UserPool
        });

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        });

        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
            console.log("onSuccess: ", data);

            console.log(Pool.getCurrentUser().getUsername());
            axios.post('http://localhost:4000/api/createAccount', {userName: Pool.getCurrentUser().getUsername(), userEmail: authDetails.getUsername()}).then((res) => {
                console.log(res.data);
                window.location.reload(false);

            });


            history.push('/home')
            },
            onFailure: (err) => {
            console.error("onFailure: ", err);
            },
            newPasswordRequired: (data) => {
            console.log("newPasswordRequired: ", data);
            },
        });

    };

    return (
        <div className="login">
            <div className="signin">
                <form onSubmit={onSubmit} className="signin_form">
                    <div align="middle" className="signin_row">
                        <div className="signin_contents">
                            <div className="signin_title">Login</div>
                            <div className="email_title">
                                Email
                                <span className="required"> *</span>
                            </div>
                            <div className="input_area">
                                <Input
                                    placeholder="Email"
                                    autoComplete="email"
                                    name="email"
                                    className="input"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>
                            <div className="title">
                                Password
                                <span className="required"> *</span>
                            </div>
                            <div className="input_area">
                                <Input
                                    type="password"
                                    autoComplete="current-password"
                                    className="input"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <p className="passwordRequirements">
                                    - minimum 8 length <br />
                                    - lowercase letters + numbers
                                </p>
                            </div>
                            <div className="button_area">
                                <button
                                    type="submit"
                                    className="button"
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>

                </form>

                <div className="or">
                    OR
                </div>

                <div>
                    <Link to="/signup" style={{ all: 'unset' }}>
                        <button className="signup_box">
                            Sign Up
                        </button>
                    </Link>
                </div>

            </div>

        </div>



    );
};

export default Login;

