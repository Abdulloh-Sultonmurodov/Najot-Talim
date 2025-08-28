import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <CookiesProvider>
    <BrowserRouter>
      <ToastContainer />
      <App />
    </BrowserRouter>
  </CookiesProvider>
);
