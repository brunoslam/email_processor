import MainRouter from "./Route";
import { UserProvider } from "./contexts/user-context";
import { EmailProvider } from "./contexts/email-context";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <EmailProvider>
        <MainRouter />
      </EmailProvider>
    </UserProvider>
  );
}

export default App;
