import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const createNew = async (content) => {
    const anecdoteObject = {
        content,
        votes: 0
    };
    const res = await axios.post(baseUrl, anecdoteObject);
    return res.data;
}

const vote = async (id) => {
    let res = await axios.get(`${baseUrl}/${id}`);
    const anecdoteObject = res.data;
    anecdoteObject.votes++;

    res = await axios.put(`${baseUrl}/${id}`, anecdoteObject);
    return res.data;
}

export default {
    getAll,
    createNew,
    vote
};