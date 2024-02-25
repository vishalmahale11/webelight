import ReactDOM from "react-dom/client";
import router from "./App";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./Redux/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={appStore}>
    <RouterProvider router={router} />
  </Provider>
);

reportWebVitals();
