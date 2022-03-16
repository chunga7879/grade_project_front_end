import React, {useState} from "react";
import UserPool from "../UserPool";
import Pool from "../UserPool";
import { Row, Input } from 'antd';
import '../css/sign.css';
import {CognitoUser, AuthenticationDetails} from "amazon-cognito-identity-js";
import {useHistory} from "react-router-dom";
import axios from "axios";

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
            axios.post('http://localhost:3001/createAccount', {userName: Pool.getCurrentUser().getUsername(), userEmail: authDetails.getUsername()}).then((res) => {
                console.log(res.data);
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
        <div className="signin">
            <form onSubmit={onSubmit} className="signin_form">
                <Row align="middle" className="signin_row">
                    <Row className="signin_contents">
                        <div className="signin_title">Login</div>
                        <div className="signin_underline" />
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
                    </Row>
                </Row>
            </form>
        </div>
    );
};

export default Login;
