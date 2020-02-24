import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, user, handleLike, handleRemove }) => {
    const [visible, setVisible] = useState(false);

    return (
        <div style={{ border: "1px solid black", padding: "3px", margin: "4px 0px 4px 0px", width: "400px" }}>
            {blog.title}, {blog.author}
            <button onClick={() => setVisible(!visible)} style={{ float: "right" }}>{ visible ? "hide" : "view" }</button>
            <div className="information" style={{ display: visible ? "" : "None" }}>
                <a href={blog.url}>{blog.url}</a><br />
                {blog.likes}&nbsp;
                <button onClick={() => handleLike(blog)}>like</button>
                <br />
                {blog.user.name}<br />
                <button onClick={() => handleRemove(blog)} style={{ display: blog.user.username === user.username ? "" : "None" }}>remove</button>
            </div>
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired
};

export default Blog;