import * as React from "react";

const UserContext = React.createContext();

const user = localStorage.getItem("user");

function userReducer(state, action) {
  switch (action.type) {
    case "login":
      localStorage.setItem("user", action.payload);
      return {
        user: action.payload,
      };
    case "logout":
      localStorage.removeItem("user");
      return {
        user: undefined,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  const [state, dispatch] = React.useReducer(userReducer, {
    user: user ? user : undefined,
  });

  const value = { state, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUser };
