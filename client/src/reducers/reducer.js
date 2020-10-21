export const intialState = null;

export const reducer = (state, action) => {
  switch (action.type) {
    case "USER":
      return action.payload;
    case "CLEAR":
      state = null;
      return state;
    default:
      return state;
  }
};
