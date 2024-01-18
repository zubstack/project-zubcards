import "./Decks.scss";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { RiSettings5Fill } from "react-icons/ri";
import TextButton from "../../ui/TextButton/TextButton";
import OptionsButton from "../../ui/OptionsButton/OptionsButton";
import CreateDeckModal from "../../components/CreateDeckModal/CreateDeckModal";
import endpoints from "../../services/api/endpoints";
import { Link } from "react-router-dom";
import PageLayout from "../../layout/PageLayout/PageLayout";

function Decks() {
  const [decks, setDecks] = useState(null);
  const [isDecksCreateModalOpen, setDecksCreateModalOpen] = useState(null);
  const [editId, setEditId] = useState(null);

  const optionsRef = useRef();

  function handleToggle(event) {
    if (!event.currentTarget.contains(optionsRef.current)) {
      optionsRef.current?.classList.remove("options__menu--active");
    }
    const clickedElement = event.currentTarget;
    const optionsMenu = clickedElement.querySelector(".options__menu");
    optionsMenu.classList.toggle("options__menu--active");
    optionsRef.current = optionsMenu;
  }

  function handleOpenDecksCreateModal() {
    setDecksCreateModalOpen(true);
  }

  function closeOpenDecksCreateModal() {
    setDecksCreateModalOpen(false);
  }

  function handleEdit(id) {
    setEditId(id);
    handleOpenDecksCreateModal();
  }
  async function handleDelete(id) {
    await axios.delete(endpoints.deleteDeck(id));
    await fetchData();
  }

  async function fetchData() {
    try {
      const { data } = await axios.get(endpoints.getDecks);
      setDecks(data);
    } catch (error) {
      error;
    }
  }
  useEffect(() => {
    fetchData();
    document.addEventListener("mousedown", (event) => {
      if (!optionsRef.current?.contains(event.target)) {
        optionsRef.current?.classList.remove("options__menu--active");
      }
    });
  }, []);

  return (
    <PageLayout>
      <div className="dashboard__top">
        <h2>Dashboard</h2>
        <TextButton onClick={handleOpenDecksCreateModal}>
          Create deck
        </TextButton>
      </div>
      {decks ? (
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
                <td className="dashboard__topic">
                  <Link to={`/cards?deckId=${deck.id}`}>{deck.topic}</Link>
                </td>
                <td className="dashboard__items--blue">{deck.new}</td>
                <td className="dashboard__items--red">{deck.learn}</td>
                <td className="dashboard__items--green">{deck.due}</td>
                <td className="dashboard__last ">
                  <div onClick={handleToggle} className="options">
                    <RiSettings5Fill />
                    <div className="options__menu">
                      <OptionsButton onClick={() => handleEdit(deck.id)}>
                        Edit
                      </OptionsButton>
                      <OptionsButton onClick={() => handleDelete(deck.id)}>
                        Delete
                      </OptionsButton>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      ) : (
        <p>No content to show</p>
      )}
      <CreateDeckModal
        isOpen={isDecksCreateModalOpen}
        onClose={closeOpenDecksCreateModal}
        fetchData={fetchData}
        editId={editId}
        setEditId={setEditId}
      />
    </PageLayout>
  );
}

export default Decks;
