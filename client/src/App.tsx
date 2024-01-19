import { BrowserRouter, useRoutes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home/Home";
import Nav from "./components/Nav/Nav";
import BaseLayout from "./layout/BaseLayout";
import Decks from "./pages/Decks/Decks";
import Cards from "./pages/Cards/Cards";

function AppRoutes() {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <BaseLayout>
          <Home />
        </BaseLayout>
      ),
    },
    {
      path: "/decks",
      element: (
        <BaseLayout>
          <Decks />
        </BaseLayout>
      ),
    },
    {
      path: "/cards",
      element: <Cards />,
    },
  ]);
  return routes;
}

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
