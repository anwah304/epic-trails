import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './component/Home';
import Login from "./component/Login";
import Register from "./component/Register"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 

      </Routes>
    </BrowserRouter>
  );
}

export default App;