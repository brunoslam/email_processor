import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Leads from "./pages/Leads";
import Overview from "./pages/Overview";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/overview" element={<Overview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
