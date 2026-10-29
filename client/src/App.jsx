import "./App.css";

import AddGuide from "./components/AddGuide";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import MainPage from "./components/MainPage";
import About from "./components/About";
import Destination from "./components/Destination";
import Guides from "./components/Guides";
import Search from "./components/Search";
import AdminDashboard from "./components/AdminDashboard";
import AddTrail from "./components/AddTrail";
import ManageTrails from "./components/ManageTrails";
import ManageGuides from "./components/ManageGuides";
import EditGuide from "./components/EditGuide";
import EditTrail from "./components/EditTrail";
import GovernoratePage from "./components/GovernoratePage";
import Weather from "./components/Weather";
import Profile from "./components/Profile";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "reactstrap";
import TrailDetails from "./components/TrailDetails";
const ProtectedRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role === "admin" ? element : <Navigate to="/home" />;
};

function App() {
  return (
    <Container fluid>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/add-trail" element={<AddTrail />} />
          <Route path="/add-guide" element={<AddGuide />} />

          <Route path="/edit-guide/:id" element={<EditGuide />} />
          <Route path="/edit-trail/:id" element={<EditTrail />} />

          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/governorate/:name" element={<GovernoratePage />} />
          <Route path="/destinations" element={<Destination />} />
          <Route path="/trail/:id" element={<TrailDetails />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/search" element={<Search />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/admin"
            element={<ProtectedRoute element={<AdminDashboard />} />}
          />

          <Route path="/admin/trails" element={<ManageTrails />} />
          <Route path="/admin/guides" element={<ManageGuides />} />

          <Route path="/weather" element={<Weather />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;