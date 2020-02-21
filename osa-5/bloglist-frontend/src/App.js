import React, { useState, useEffect } from "react";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

const App = () => {
    const [notification, setNotification] = useState({message: null, type: null});
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        );
    }, []);

    useEffect(() => {
        const savedUser = localStorage.getItem("blogAppUser");
        if (savedUser) {
            const user = JSON.parse(savedUser);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleLogout = () => {
        setUser(null);
        blogService.removeToken();
        window.localStorage.removeItem("blogAppUser");

        setNotification({
            message: "Logged out.",
            type: "success"
        });
        setTimeout(() => setNotification({ message: null, type: null }), 5000);
    };

    const login = () => (
        <LoginForm
            setUser={setUser}
            setNotification={setNotification}
        />
    );
    
    const app = () => (
        <div>
            <div>
                logged in as {user.name}&nbsp;
                <button onClick={handleLogout}>logout</button>
            </div>
            <BlogForm blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} />
            <div>
                <h2>Blogs</h2>
                {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                    <Blog key={blog.id} blog={blog} user={user} blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} />
                )}
            </div>
        </div>
    );

    return (
        <div>
            <Notification notification={notification} />
            {user === null ? login() : app()}
        </div>
    );
};

export default App;