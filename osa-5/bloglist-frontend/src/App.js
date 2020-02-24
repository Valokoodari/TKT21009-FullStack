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

    const handleLike = async blog => {
        try {
            blog.likes++;
            await blogService.like(blog);
            setBlogs(blogs.filter(b => b.id !== blog.id).concat(blog));
        } catch (exception) {
            setNotification({
                message: "Could not save the like.",
                type: "error"
            });
            setTimeout(() => setNotification({ message: null, type: null }), 5000);
        }
    };

    const handleRemove = async blog => {
        try {
            if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
                await blogService.remove(blog);

                setBlogs(blogs.filter(b => b.id !== blog.id));

                setNotification({
                    message: "Blog removed successfully.",
                    type: "success"
                });
                setTimeout(() => setNotification({ message: null, type: null }), 5000);
            }
        } catch (exception) {
            setNotification({
                message: "Could not remove the blog.",
                type: "error"
            });
            setTimeout(() => setNotification({ message: null, type: null }), 5000);
        }
    };

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

    const createBlog = async (blogObject) => {
        try {
            const savedBlog = await blogService.create(blogObject);
            const blogs = await blogService.getAll();
            setBlogs(blogs);

            setNotification({
                message: `A new blog ${savedBlog.title} by ${savedBlog.author} added.`,
                type: "success"
            });
            setTimeout(() => setNotification({ message: null, type: null }), 5000);
        } catch (exception) {
            setNotification({
                message: "Could not add a new blog.",
                type: "error"
            });
            setTimeout(() => setNotification({ message: null, type: null }), 5000);
        }
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
            <BlogForm createBlog={createBlog} />
            <div id="blog-container">
                <h2>Blogs</h2>
                {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                    <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} handleRemove={handleRemove} />
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