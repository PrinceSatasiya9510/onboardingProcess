import { Provider } from "react-redux";
import Users from "./components/Users";
import { store } from "./store/store";

export default function App() {
  return (
    <div>
      <Provider store={store}>
        <Users />
      </Provider>
    </div>
  )
}
