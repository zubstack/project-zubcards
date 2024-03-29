import "./Decks.scss";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import axios from "axios";
import { RiSettings5Fill } from "react-icons/ri";
import TextButton from "../../ui/TextButton/TextButton";
import OptionsButton from "../../ui/OptionsButton/OptionsButton";
import CreateDeckModal from "../../components/CreateDeckModal/CreateDeckModal";
import endpoints from "../../services/api/endpoints";
import { Link, useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa6";
import Button from "../../ui/Button/Button";

type DeckItems = {
  id: string;
  topic: string;
  due: number;
  new: number;
  learn: number;
};

function Decks() {
  const [decks, setDecks] = useState<DeckItems[]>([]);
  const [isDecksCreateModalOpen, setDecksCreateModalOpen] =
    useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);

  const navigate = useNavigate();
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleToggle: MouseEventHandler<HTMLDivElement> = (event) => {
    const clickedElement = event.currentTarget;
    const optionsMenu = clickedElement.querySelector(".options__menu");
    if (!clickedElement.contains(optionsMenu)) {
      optionsRef.current?.classList.remove("options__menu--active");
    }
    if (optionsMenu) {
      optionsMenu.classList.toggle("options__menu--active");
      //PENDING: Remake options to avoid the bad practice:
      optionsRef.current = optionsMenu;
    }
  };

  function handleOpenDecksCreateModal() {
    setDecksCreateModalOpen(true);
  }

  function closeDecksCreateModal() {
    setDecksCreateModalOpen(false);
  }

  function handleEdit(id: string) {
    setEditId(id);
    handleOpenDecksCreateModal();
  }
  async function handleDelete(id: string) {
    await axios.delete(endpoints.deleteDeck(id));
    await fetchData();
  }

  function handlePlayFlashcards(id: string) {
    navigate(`/flashcards?deckId=${id}`);
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
    const handleDocumentClick: EventListener = ({ target }: Event) => {
      if (!optionsRef.current?.contains(target as Node)) {
        optionsRef.current?.classList.remove("options__menu--active");
      }
    };
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <main id="decks__main">
      <div className="container">
        <div className="container__top">
          <h2>Dashboard</h2>
          <TextButton onClick={handleOpenDecksCreateModal}>
            Create deck
          </TextButton>
        </div>
        <div className="table__container">
          {decks ? (
            <table id="decks__table">
              <thead>
                <tr>
                  <th></th>
                  <th>Deck</th>
                  <th className="table__item--center">New</th>
                  <th className="table__item--center">Learn</th>
                  <th className="table__item--center">Due</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {decks.map((deck) => (
                  <tr key={deck.id}>
                    <td>
                      <Button
                        className="play__button"
                        onClick={() => {
                          handlePlayFlashcards(deck.id);
                        }}
                        style={{
                          padding: "8px 10px",
                          fontSize: "14px",
                        }}
                      >
                        <FaPlay />
                      </Button>
                    </td>
                    <td>
                      <Link to={`/cards?deckId=${deck.id}`}>{deck.topic}</Link>
                    </td>
                    <td className="table__item--center table__item--blue">
                      {deck.new}
                    </td>
                    <td className="table__item--center table__item--red">
                      {deck.learn}
                    </td>
                    <td className="table__item--center table__item--green">
                      {deck.due}
                    </td>
                    <td>
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
                ))}
              </tbody>
            </table>
          ) : (
            <p>No content to show</p>
          )}
        </div>

        <CreateDeckModal
          isOpen={isDecksCreateModalOpen}
          onClose={closeDecksCreateModal}
          fetchData={fetchData}
          editId={editId}
          setEditId={setEditId}
        />
      </div>
    </main>
  );
}

//PENDING: Play cards directly from the decks dashboard
//PENDING: Decks table add option to "See cards"
//PENDING: Preview modal

export default Decks;
