import { useEffect, useState } from "react";
import "./Cards.scss";
import axios from "axios";
import endpoints from "../../services/api/endpoints";
import { useSearchParams } from "react-router-dom";
import PageLayout from "../../layout/PageLayout/PageLayout";
import TextButton from "../../ui/TextButton/TextButton";
import Button from "../../ui/Button/Button";
import { FaPlay } from "react-icons/fa6";
import CreateCardModal from "../../components/CreateCardModal/CreateCardModal";

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

  // Convert Javascript date to Pg YYYY MM DD HH MI SS
  function pgFormatDate(date) {
    function zeroPad(d) {
      return ("0" + d).slice(-2);
    }
    let parsed = new Date(date);

    return [
      parsed.getUTCFullYear(),
      "-",
      zeroPad(parsed.getMonth() + 1),
      "-",
      zeroPad(parsed.getDate()),
      // " ",
      // zeroPad(parsed.getHours()),
      // ":",
      // zeroPad(parsed.getMinutes()),
      // ":",
      // zeroPad(parsed.getSeconds()),
    ].join("");
  }

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
  }

  if (!currentDeck) return <PageLayout>No decks to show</PageLayout>;

  return (
    <main id="cards__main">
      <PageLayout>
        <div className="dashboard__top" style={{ padding: "0 12px" }}>
          <h2>{currentDeck.topic}</h2>
          <div className="dashboard__top__options">
            <TextButton onClick={handleOpenCardsModal}>Add card</TextButton>
            <Button>
              <FaPlay />
              Play
            </Button>
          </div>
        </div>
        {cards ? (
          <table className="dashboard__container" style={{ margin: "auto" }}>
            <thead className="dashboard__headers">
              <tr>
                <th>Question</th>
                <th>Domain</th>
                <th>Created at</th>
                <th>Last updated</th>
              </tr>
            </thead>
            {cards.map((card) => (
              <tbody className="dashboard__items" key={card.id}>
                <tr onClick={() => handleRowFocus(card)}>
                  <td className="dashboard__question">{card.question}</td>
                  <td>{card.domain}</td>
                  <td>{pgFormatDate(card.createdAt)}</td>
                  <td>{pgFormatDate(card.updatedAt)}</td>
                  <td className="dashboard__last ">
                    <div className="options">
                      {/* <RiSettings5Fill />
                    <div className="options__menu">
                      <OptionsButton onClick={() => handleEdit(card.id)}>
                        Edit
                      </OptionsButton>
                      <OptionsButton onClick={() => handleDelete(deck.id)}>
                        Delete
                      </OptionsButton>
                    </div> */}
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        ) : (
          <p>No content to show</p>
        )}
      </PageLayout>
      <div className="aside__container">
        <div className="aside__button__top">
          <TextButton>Preview</TextButton>
        </div>
        <form className="aside__form" onSubmit={handleEditCardSubmit}>
          <label htmlFor="question">Front</label>
          <input
            className="aside__form__input"
            type="text"
            name="question"
            id="question"
            value={formValues.question}
            onChange={handleFormChanges}
          />
          <label htmlFor="answer">Back</label>
          <input
            className="aside__form__input"
            type="text"
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
