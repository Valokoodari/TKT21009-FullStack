import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch(action.type) {
    case "NEW_ANECDOTE":
      return state.concat(action.data);
    case "INCREASE_VOTES":
      const id = action.data.id;
      const toUpdate = state.find(a => a.id === id);
      const updated = {
        ...toUpdate,
        votes: toUpdate.votes + 1
      };
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : updated
      );
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  };
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    });
  };
};

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: anecdote
    });
  };
};

export const voteAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.vote(id);
    dispatch({
      type: "INCREASE_VOTES",
      data: { id }
    });
  }
};

export default reducer;