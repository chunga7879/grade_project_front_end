import React, { useState } from "react";
import UserPool from "../UserPool";
import { Row, Input } from 'antd';
import '../css/sign.css';
import {CognitoUserAttribute} from "amazon-cognito-identity-js";
import {useHistory} from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let attributeList = [];

    let [firstName, setFirstName] = useState("");
    const firstNameAttribute = new CognitoUserAttribute({Name: 'given_name', Value: firstName});
    let [lastName, setLastName] = useState("");
    const lastNameAttribute = new CognitoUserAttribute({Name: 'family_name', Value: lastName});
    let [school, setSchool] = useState("");
    const schoolAttribute = new CognitoUserAttribute({Name: 'custom:school', Value: school});
    let [grade, setGrade] = useState("");
    const gradeAttribute = new CognitoUserAttribute({Name: 'custom:grade', Value: grade});

    attributeList.push(firstNameAttribute);
    attributeList.push(lastNameAttribute);
    attributeList.push(schoolAttribute);
    attributeList.push(gradeAttribute);

    let history = useHistory();

    const onSubmit = (event) => {
        event.preventDefault();

        UserPool.signUp(email, password, attributeList, null, (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(data);
            history.push('/welcome');
        });
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Row align="middle" className="signin_row">
                        <Row className="signin_contents">
                            <div className="signin_title">CREATE ACCOUNT</div>
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
                            <div className="title">
                                First Name
                            </div>
                            <div className="input_area">
                                <Input
                                    type="text"
                                    placeholder="given name"
                                    className="input"
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                />
                            </div>
                            <div className="title">
                                Last Name
                            </div>
                            <div className="input_area">
                                <Input
                                    type="text"
                                    placeholder="family name"
                                    className="input"
                                    value={lastName}
                                    onChange={(event) => setLastName(event.target.value)}
                                />
                            </div>
                            <div className="title">
                                School Name
                            </div>
                            <div className="input_area">
                                <Input
                                    type="text"
                                    placeholder="school"
                                    className="input"
                                    value={school}
                                    onChange={(event) => setSchool(event.target.value)}
                                />
                            </div>
                            <div className="title">
                                Grade
                            </div>
                            <div className="input_area">
                                <Input
                                    type="text"
                                    placeholder="grade"
                                    className="input"
                                    value={grade}
                                    onChange={(event) => setGrade(event.target.value)}
                                />
                            </div>
                            <div className="button_area">
                                <button
                                    type="submit"
                                    size="large"
                                    className="button"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </Row>
                </Row>
            </form>
        </div>
    );
};

export default Signup;

