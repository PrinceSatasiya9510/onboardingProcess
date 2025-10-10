import { Provider } from "react-redux";
import Users from "./components/Users";
import { store } from "./store/store";
import { Route, Routes } from "react-router-dom";
import AssignUser from "./components/AssignUser";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div>
      <Navbar />
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/assignUser" element={<AssignUser />} />
        </Routes>
      </Provider>
    </div>
  )
}
