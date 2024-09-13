import React, { useState } from 'react';
import './LoginSignup.css';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSignup = () => {
    const [message, setMessage] = useState("");
    const [action, setAction] = useState("Login");
    const [formData, setFormData] = useState({
        fullname: "",
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
                setMessage(`${action} successful!`);
                // Redirect to dashboard or handle successful login/signup
            } else {
                setMessage(`${action} failed: ${result.error || 'Unknown error'}`);
                // Handle error (e.g., show error message to user)
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
            // Handle network errors
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
                            <img src={user_icon} alt="Full Name" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input">
                            <img src={email_icon} alt="Email" />
                            <input
                                type="email"
                                placeholder="Email Id"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                    </>
                )}
                <div className="input">
                    <img src={user_icon} alt="Username" />
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input">
                    <img src={password_icon} alt="Password" />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            {action === "Login" && (
                <div className="forgot-password">
                    Forgot Password? <span>Click Here!</span>
                </div>
            )}

            <div className="submit-container">
                <div className={`submit main-button`} onClick={handleSubmit}>
                    {action}
                </div>
                <div 
                    className={`submit secondary-button`} 
                    onClick={() => setAction(action === "Login" ? "Sign Up" : "Login")}
                >
                    {action === "Login" ? "Sign Up" : "Login"}
                </div>
            </div>
            <div>
                {message && <div className="message">{message}</div>}
            </div>
        </div>
    );
};

export default LoginSignup;
