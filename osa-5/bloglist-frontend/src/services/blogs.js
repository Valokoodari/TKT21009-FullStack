import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
};

const removeToken = () => token = null;

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const create = async newBlog => {
    const config = {
        headers: { Authorization: token }
    };

    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
};

const like = blog => {
    const config = {
        headers: { Authorization: token }
    };

    const blogObject = {
        user: blog.user.id,
        likes: blog.likes,
        author: blog.author,
        title: blog.title,
        url: blog.url
    };

    const response = axios.put(`${baseUrl}/${blog.id}`, blogObject, config);
    return response.data;
};

const remove = blog => {
    const config = {
        headers: { Authorization: token }
    };
    
    const response = axios.delete(`${baseUrl}/${blog.id}`, config);
    return response.data;
};

export default { setToken, removeToken, getAll, create, like, remove };