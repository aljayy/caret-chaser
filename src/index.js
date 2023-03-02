import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeCtxProvider } from "./context/themectx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeCtxProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeCtxProvider>
);
