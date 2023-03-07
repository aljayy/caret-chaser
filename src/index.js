import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TestCtxProvider } from "./context/testctx";
import { ThemeCtxProvider } from "./context/themectx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeCtxProvider>
    <TestCtxProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </TestCtxProvider>
  </ThemeCtxProvider>
);
