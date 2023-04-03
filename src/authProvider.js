import React, { useContext, createContext, useReducer } from "react";

const AuthContext = createContext({});

// const customReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD":
//       return { ...state, count: action.payload + state.count };
//     case "SUBSTRACT":
//       return { ...state, count: action.payload + state.count };
//     case "MULTIPLY":
//       return { ...state, count: action.payload + state.count };
//     default:
//       return state;
//   }
// };
// // actions - arr
// const actions = [
//   { type: "ADD", payload: 10 },
//   { type: "SUBSTRACT", payload: 10 },
//   { type: "MULTIPLY", payload: 5 }
// ];
// // initial state
// const initialState = {
//   count: 0
// };

// reducer function
// const reducerResult = actions.reduce(customReducer, initialState);

const actionReducer = (state, action) => {
  const actionMap = {
    LOADING: () => ({ ...state, loading: true }),
    ERROR: () => ({
      ...state,
      loading: false,
      error: action.error,
      response: null
    }),
    RESPONSE: () => ({
      ...state,
      loading: false,
      error: null,
      response: action.response
    })
  };
  return actionMap[action.type]() ?? state;
};

const myReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };

    case "ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        response: null
      };

    case "RESPONSE":
      return {
        ...state,
        loading: false,
        error: null,
        response: action.response
      };

    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(actionReducer, {
    loading: false,
    response: "",
    error: null
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };
