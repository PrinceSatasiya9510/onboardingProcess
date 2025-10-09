import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Users from "./Component/Users";
import AddUsers from "./Component/AddUsers";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/addUsers" element={<AddUsers />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}