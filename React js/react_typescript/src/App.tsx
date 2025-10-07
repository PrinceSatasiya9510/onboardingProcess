import { Routes, Route } from "react-router-dom";
import UseContext from "./Component/UseContext";
import UseEffect from "./Component/UseEffect";
import UseState from "./Component/UseState";
import UseReducer from "./Component/UseReducer";
import { counter, count } from "./context/context"
import Navbar from "./Component/Navbar";
import UseMemo from "./Component/UseMemo";
import UseCallback from "./Component/UseCallback";

export default function App() {
  return (
    <>
      <Navbar />
      <counter.Provider value={count}>
        <Routes>
          <Route path="/" element={<UseState />} />
          <Route path="/useEffect" element={<UseEffect />} />
          <Route path="/useContext" element={<UseContext />} />
          <Route path="/useReducer" element={<UseReducer />} />
          <Route path="/useMemo" element={<UseMemo />} />
          <Route path="/useCallback" element={<UseCallback />} />
        </Routes>
      </counter.Provider>
    </>
  )
}