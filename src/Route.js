import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Leads from "./pages/Leads";
import Overview from "./pages/Overview";
import { useUser } from "./contexts/user-context";

function PrivateRoute({ children, ...rest }) {
  const {
    state: { user },
  } = useUser();
  return user ? children : <Navigate to="/login" />
}

function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/leads"
          element={
            <PrivateRoute>
              <Leads />
            </PrivateRoute>
          }
        />
        <Route
          path="/overview"
          element={
            <PrivateRoute>
              <Overview />
            </PrivateRoute>
          }
        />
        <Route path="/*" element={<Navigate replace to="/leads" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRouter;
