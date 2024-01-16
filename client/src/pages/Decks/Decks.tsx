import { useEffect, useRef } from "react";
import TextButton from "../../ui/TextButton/TextButton";
import "./Decks.scss";
import { RiSettings5Fill } from "react-icons/ri";
import OptionsButton from "../../ui/OptionsButton/OptionsButton";

const decks = [
  {
    topic: "ultimates",
    new: 1,
    learn: 2,
    due: 3,
  },
  {
    topic: "fruits",
    new: 1,
    learn: 2,
    due: 3,
  },
  {
    topic: "frusits",
    new: 1,
    learn: 2,
    due: 3,
  },
  {
    topic: "fruitds",
    new: 1,
    learn: 2,
    due: 3,
  },
];

function Decks() {
  const optionsRef = useRef();

  function handleToggle(event) {
    // console.log("optionsRef", event.currentTarget.contains(optionsRef.current));
    // console.log("classlist", optionsRef.current?.classList);
    if (!event.currentTarget.contains(optionsRef.current)) {
      optionsRef.current?.classList.remove("options__menu--active");
    }
    const clickedElement = event.currentTarget;
    const optionsMenu = clickedElement.querySelector(".options__menu");
    optionsMenu.classList.toggle("options__menu--active");
    optionsRef.current = optionsMenu;
  }

  function handleEdit() {
    console.log("edit");
  }
  function handleDelete() {
    console.log("Delete");
  }

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!optionsRef.current?.contains(event.target)) {
        optionsRef.current?.classList.remove("options__menu--active");
      }
    });
  }, []);

  return (
    <div id="decks_dashboard">
      <div className="dashboard__top">
        <h2>Dashboard</h2>
        <TextButton onClick={handleDelete}>Create deck</TextButton>
      </div>
      <table className="dashboard__container">
        <thead className="dashboard__headers">
          <tr>
            <th className="dashboard__topic">Deck</th>
            <th>New</th>
            <th>Learn</th>
            <th className="dashboard__last">Due</th>
          </tr>
        </thead>
        {decks.map((deck) => (
          <tbody className="dashboard__items" key={deck.topic}>
            <tr>
              <td className="dashboard__topic">{deck.topic}</td>
              <td className="dashboard__items--blue">{deck.new}</td>
              <td className="dashboard__items--red">{deck.learn}</td>
              <td className="dashboard__items--green">{deck.due}</td>
              <td className="dashboard__last ">
                <div onClick={handleToggle} className="options">
                  <RiSettings5Fill />
                  <div className="options__menu">
                    <OptionsButton onClick={handleEdit}>Edit</OptionsButton>
                    <OptionsButton onClick={handleDelete}>Delete</OptionsButton>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default Decks;
