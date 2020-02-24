import React, { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
    const [blogTitle, setBlogTitle] = useState("");
    const [blogAuthor, setBlogAuthor] = useState("");
    const [blogUrl, setBlogUrl] = useState("");
    const [visible, setVisible] = useState(false);

    const handleCreation = async (event) => {
        event.preventDefault();

        createBlog({
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl
        });

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
                    <div className="titleInput">
                        title:&nbsp;
                        <input
                            type="text"
                            id="title-input"
                            value={blogTitle}
                            onChange={({target}) => setBlogTitle(target.value)}
                        />
                    </div>
                    <div className="authorInput">
                        author:&nbsp;
                        <input
                            type="text"
                            id="author-input"
                            value={blogAuthor}
                            onChange={({target}) => setBlogAuthor(target.value)}
                        />
                    </div>
                    <div className="urlInput">
                        url:&nbsp;
                        <input
                            type="text"
                            id="url-input"
                            value={blogUrl}
                            onChange={({target}) => setBlogUrl(target.value)}
                        />
                    </div>
                    <button id="submit-button" type="submit">create</button>
                </form>
                <button onClick={() => setVisible(false)}>cancel</button>
            </div>
        </div>
    );
};

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
};

export default BlogForm;