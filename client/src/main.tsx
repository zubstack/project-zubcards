import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.scss";
import Nav from "./components/Nav.tsx";
import BaseLayout from './layout/BaseLayout.jsx'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Nav/>
      <BaseLayout>
        <App />
      </BaseLayout>
  </React.StrictMode>,
);
