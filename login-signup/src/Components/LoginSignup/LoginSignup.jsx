import React, { useState } from 'react';
import './LoginSignup.css';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSignup = () => {
    const [action, setAction] = useState("Login");
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        const url = action === "Login" ? "http://localhost:5000/login" : "http://localhost:5000/signup";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            if (response.ok) {
                console.log(`${action} successful!`, result);
                // head to dashboard
            } else {
                console.error(`${action} failed`, result);
            }
        }catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Sign Up" && (
                    <>
                        <div className="input">
                            <img src={user_icon} alt="" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input">
                            
                            <img src={email_icon} alt="" />
                            <input
                                type="email"
                                placeholder="Email Id"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input">
                            <img src={user_icon} alt="" />
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input">
                            <img src={password_icon} alt="" />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </>
                )}

                {action === "Login" && (
                    <>
                        <div className="input">
                            <img src={user_icon} alt="" />
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input">
                            <img src={password_icon} alt="" />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </>
                )}


            </div>

            {action === "Login" && (
                <div className="forgot-password">
                    Forgot Password? <span>Click Here!</span>
                </div>
            )}

            <div className="submit-container">
                <div className="submit main-button" onClick={handleSubmit}>
                    {action === "Login" ? "Login" : "Sign Up"}
                </div>

                {action === "Login" && (
                    <div className="submit secondary-button" onClick={() => setAction("Sign Up")}>
                        Sign Up
                    </div>
                )}

                {action === "Sign Up" && (
                    <div className="submit secondary-button" onClick={() => setAction("Login")}>
                        Login
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginSignup;
