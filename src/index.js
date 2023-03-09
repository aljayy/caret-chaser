import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { TestCtxProvider } from "./context/testctx";
import { ThemeCtxProvider } from "./context/themectx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <ThemeCtxProvider>
        <TestCtxProvider>
          <App />
        </TestCtxProvider>
      </ThemeCtxProvider>
    </HashRouter>
  </React.StrictMode>
);
