import { BrowserRouter, useRoutes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home/Home";
import Nav from "./components/Nav/Nav";
import BaseLayout from "./layout/BaseLayout";
import Decks from "./pages/Decks/Decks";

function AppRoutes() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/decks",
      element: <Decks />,
    },
  ]);
  return routes;
}

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <BaseLayout>
        <AppRoutes />
      </BaseLayout>
    </BrowserRouter>
  );
}

export default App;
