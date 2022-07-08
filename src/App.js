import MainRouter from "./Route";
import { UserProvider } from "./contexts/user-context";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <MainRouter />
    </UserProvider>
  );
}

export default App;
