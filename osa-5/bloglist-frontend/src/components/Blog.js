import React, { useState } from "react";
import PropTypes from "prop-types";
import blogService from "../services/blogs";

const Blog = ({ blog, user, blogs, setBlogs, setNotification }) => {
    const [visible, setVisible] = useState(false);
    const [likes, setLikes] = useState(blog.likes);

    const handleLike = async () => {
        try {
            blog.likes++;
            await blogService.like(blog);
            setLikes(blog.likes);
        } catch (exception) {
            setNotification({
                message: "Could not save the like.",
                type: "error"
            });
            setTimeout(() => setNotification({ message: null, type: null }), 5000);
        }
    };

    const handleRemove = async () => {
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

    return (
        <div style={{ border: "1px solid black", padding: "3px", margin: "4px 0px 4px 0px", width: "400px" }}>
            {blog.title}, {blog.author}
            <button onClick={() => setVisible(!visible)} style={{ float: "right" }}>{ visible ? "hide" : "view" }</button>
            <div style={{ display: visible ? "" : "None" }}>
                <a href={blog.url}>{blog.url}</a><br />
                {likes}&nbsp;
                <button onClick={() => handleLike()}>like</button>
                <br />
                {blog.user.name}<br />
                <button onClick={() => handleRemove()} style={{ display: blog.user.username === user.username ? "" : "None" }}>remove</button>
            </div>
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    blogs: PropTypes.array.isRequired,
    setBlogs: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired
};

export default Blog;