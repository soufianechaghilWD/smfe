export const initialState = {
    user: null,
    users: [],
    sugg: [],
    userDB: null
};
const reducer = (state, action) => {
    switch (action.type) {
      case "SET__USER":
        return {
          ...state,
          user: action.user
        }
      case "SET__USERDB":
        return {
          ...state,
          userDB: action.userDB
        }
      case "SET__USERS":
        return {
          ...state,
          users: action.users
        }
      case "SET__SUGG":
        return {
          ...state,
          sugg: action.sugg
        }
      default:
        return state;
    }
  };
  
  export default reducer;