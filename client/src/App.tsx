import { BrowserRouter, useRoutes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home/Home";
import Nav from "./components/Nav/Nav";
import Decks from "./pages/Decks/Decks";
import Cards from "./pages/Cards/Cards";
import Flashcards from "./pages/Flashcards/Flashcards";

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
    {
      path: "/cards",
      element: <Cards />,
    },
    {
      path: "/flashcards",
      element: <Flashcards />,
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
