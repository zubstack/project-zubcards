import { useEffect, useState } from "react";
import "./Cards.scss";
import axios from "axios";
import endpoints from "../../services/api/endpoints";
import { useNavigate, useSearchParams } from "react-router-dom";
import TextButton from "../../ui/TextButton/TextButton";
import Button from "../../ui/Button/Button";
import { FaChevronLeft, FaPlay } from "react-icons/fa6";
import CreateCardModal from "../../components/CreateCardModal/CreateCardModal";
import { FaTrashAlt } from "react-icons/fa";

function Cards() {
  const [cards, setCards] = useState([]);
  const [currentDeck, setCurrentDeck] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCardsCreateModalOpen, setCardsCreateModalOpen] = useState(null);

  const [selectedCard, setSelectedCard] = useState([]);
  const [formValues, setFormValues] = useState({
    question: "",
    answer: "",
    deckId: 0,
  });
  const [isFormDirty, setIsFormDirty] = useState(false);
  const navigate = useNavigate();

  const deckId = searchParams.get("deckId");
  async function fetchData() {
    const { data } = await axios.get(endpoints.getCardsFromDeck(deckId));
    setCurrentDeck(data.deck);
    setCards(data.cards);
  }

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    function initialSetUp() {
      if (cards.length > 0) {
        // console.log("we have cards", cards[0]);
        setSelectedCard(cards[0]);

        setFormValues({
          question: cards[0].question,
          answer: cards[0].answer,
          deckId: cards[0].id,
        });
      }
    }
    initialSetUp();
  }, [cards]);

  function handleOpenCardsModal() {
    setCardsCreateModalOpen(true);
  }

  function closeOpenCardsCreateModal() {
    setCardsCreateModalOpen(false);
  }

  function handleRowFocus(card) {
    setIsFormDirty(false);
    setFormValues({
      ...formValues,
      question: card.question,
      answer: card.answer,
      deckId: card.id,
    });
  }
  function handleFormChanges({ target }) {
    setFormValues({ ...formValues, [target.name]: target.value });
    setIsFormDirty(true);
  }
  async function handleEditCardSubmit(ev) {
    ev.preventDefault();
    console.log("formValues", formValues);
    await axios.patch(
      endpoints.updateCard(formValues.deckId),
      { question: formValues.question, answer: formValues.answer },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    fetchData();
    setIsFormDirty(false);
  }
  async function handleDeleteCard(id) {
    await axios.delete(endpoints.deleteCard(id));
    fetchData();
  }

  if (!currentDeck) return <div>No decks to show</div>;

  return (
    <main id="cards__main">
      <div className="container">
        <div className="container__top">
          <div className="container__top__options">
            <TextButton
              style={{ padding: "6px 0 0 0", margin: 0 }}
              onClick={() => {
                navigate("/decks");
              }}
            >
              <FaChevronLeft />
            </TextButton>
            <h2>{currentDeck.topic}</h2>
          </div>
          <TextButton onClick={handleOpenCardsModal}>Add card</TextButton>
        </div>
        <div className="table__container">
          {cards ? (
            <table id="cards__table">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Domain</th>
                  <th>Created at</th>
                  <th>Last updated</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cards.map((card) => (
                  <tr key={card.id} onClick={() => handleRowFocus(card)}>
                    <td>{card.question}</td>
                    <td className="table__item--center">{card.domain}</td>
                    <td>{card.createdAt}</td>
                    <td>{card.updatedAt}</td>
                    <td>
                      <div className="hover_options">
                        <FaTrashAlt onClick={() => handleDeleteCard(card.id)} />
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
      </div>
      <div className="aside__container">
        <div className="aside__button__top">
          <TextButton>Preview</TextButton>
        </div>
        <form className="aside__form" onSubmit={handleEditCardSubmit}>
          <label htmlFor="question">Front</label>
          <textarea
            name="question"
            id="question"
            value={formValues.question}
            onChange={handleFormChanges}
          />
          <label htmlFor="answer">Back</label>
          <textarea
            name="answer"
            id="answer"
            value={formValues.answer}
            onChange={handleFormChanges}
          />
          <div className="aside__button__bottom">
            <TextButton disabled={!isFormDirty}>Save changes</TextButton>
          </div>
        </form>
      </div>
      <CreateCardModal
        isOpen={isCardsCreateModalOpen}
        onClose={closeOpenCardsCreateModal}
        fetchData={fetchData}
        deckId={deckId}
      />
    </main>
  );
}

export default Cards;
