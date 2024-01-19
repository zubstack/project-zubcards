import { useEffect, useState } from "react";
import "./Cards.scss";
import axios from "axios";
import endpoints from "../../services/api/endpoints";
import { useSearchParams } from "react-router-dom";
import PageLayout from "../../layout/PageLayout/PageLayout";
import TextButton from "../../ui/TextButton/TextButton";
import Button from "../../ui/Button/Button";
import { FaPlay } from "react-icons/fa6";

function Cards() {
  const [cards, setCards] = useState([]);

  const [currentDeck, setCurrentDeck] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const deckId = searchParams.get("deckId");
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(endpoints.getCardsFromDeck(deckId));
      setCurrentDeck(data.deck);
      setCards(data.cards);
    }
    fetchData();
  }, []);

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

  cards.forEach((card) => {});
  if (!currentDeck) return <PageLayout>No decks to show</PageLayout>;

  return (
    <main id="cards__main">
      <PageLayout>
        <div className="dashboard__top" style={{ padding: "0 12px" }}>
          <h2>{currentDeck.topic}</h2>
          <div className="dashboard__top__options">
            <TextButton>Add card</TextButton>
            <Button>
              <FaPlay />
              Play
            </Button>
          </div>
        </div>
        {cards ? (
          <table className="dashboard__container">
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
                <tr>
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
        <form className="aside__form">
          <label htmlFor="question">Front</label>
          <input
            className="aside__form__input"
            type="text"
            name="question"
            id="question"
          />
          <label htmlFor="question">Back</label>
          <input
            size={4}
            className="aside__form__input"
            type="text"
            name="question"
          />
          <div className="aside__button__bottom">
            <TextButton>Save changes</TextButton>|
            <TextButton color={"red"}>Cancel</TextButton>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Cards;
