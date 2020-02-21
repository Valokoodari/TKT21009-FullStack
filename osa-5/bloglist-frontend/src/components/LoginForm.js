import React, { useState } from "react";
import PropTypes from "prop-types";
import blogService from "../services/blogs";
import loginService from "../services/login";

const LoginForm = ({setUser, setNotification}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username, password
            });

            setUsername("");
            setPassword("");

            window.localStorage.setItem(
                "blogAppUser", JSON.stringify(user)
            );
            setUser(user);
            blogService.setToken(user.token);

            setNotification({
                message: `Successfully logged in as ${user.name}`,
                type: "success"
            });
            setTimeout(() => setNotification({ message: null, type: null }), 5000);
        } catch (exception) {
            setUsername("");
            setPassword("");

            setNotification({
                message: "Invalid username or password",
                type: "error"
            });
            setTimeout(() => setNotification({ message: null, type: null }), 5000);
        }
    };
    
    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username&nbsp;
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password&nbsp;
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired
};

export default LoginForm;