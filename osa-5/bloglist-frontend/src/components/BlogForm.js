import React, { useState } from "react";
import PropTypes from "prop-types";
import blogService from "../services/blogs";

const BlogForm = ({blogs, setBlogs, setNotification}) => {
    const [blogTitle, setBlogTitle] = useState("");
    const [blogAuthor, setBlogAuthor] = useState("");
    const [blogUrl, setBlogUrl] = useState("");
    const [visible, setVisible] = useState(false);

    const handleCreation = async (event) => {
        event.preventDefault();

        const blogObject = {
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl
        };

        try {
            const savedBlog = await blogService.create(blogObject);
            setBlogs(blogs.concat(savedBlog));

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

        setBlogTitle("");
        setBlogAuthor("");
        setBlogUrl("");
    };

    return (
        <div>
            <div style={{ display: visible ? "None" : "" }}>
                <button onClick={() => setVisible(true)}>new blog</button>
            </div>
            <div  style={{ display: visible ? "" : "None" }}>
                <form onSubmit={handleCreation}>
                    <h2>Create a new blog</h2>
                    <div>
                        title:&nbsp;
                        <input
                            type="text"
                            value={blogTitle}
                            name="Title"
                            onChange={({target}) => setBlogTitle(target.value)}
                        />
                    </div>
                    <div>
                        author:&nbsp;
                        <input
                            type="text"
                            value={blogAuthor}
                            name="Author"
                            onChange={({target}) => setBlogAuthor(target.value)}
                        />
                    </div>
                    <div>
                        url:&nbsp;
                        <input
                            type="text"
                            value={blogUrl}
                            name="Url"
                            onChange={({target}) => setBlogUrl(target.value)}
                        />
                    </div>
                    <button type="submit">create</button>
                </form>
                <button onClick={() => setVisible(false)}>cancel</button>
            </div>
        </div>
    );
};

BlogForm.propTypes = {
    blogs: PropTypes.array.isRequired,
    setBlogs: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired
};

export default BlogForm;