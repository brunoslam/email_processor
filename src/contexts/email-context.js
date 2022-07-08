import * as React from "react";

const EmailContext = React.createContext();

let processedEmails = localStorage.getItem("processedEmails");
processedEmails = processedEmails ? JSON.parse(processedEmails) : [];

function emailReducer(state, action) {
  switch (action.type) {
    case "POSITIVE_REPLY":
    case "NEUTRAL_REPLY":
    case "NOT_A_LEAD":
      const newState = {
        emails: [
          ...state.emails,
          {
            ...action.payload.email,
            user: action.payload.user,
            status: action.type,
          },
        ],
      };
      localStorage.setItem("processedEmails", JSON.stringify(newState.emails));
      return newState;
    case "RESET":
      localStorage.setItem("processedEmails", JSON.stringify([]));
      return {
        emails: [],
      };
    default:
      return state;
  }
}

function EmailProvider({ children }) {
  const [state, dispatch] = React.useReducer(emailReducer, {
    emails: processedEmails,
  });

  const value = { state, dispatch };
  return (
    <EmailContext.Provider value={value}>{children}</EmailContext.Provider>
  );
}

function useEmail() {
  const context = React.useContext(EmailContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export { EmailProvider, useEmail };
