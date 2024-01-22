import axios from "axios";
import "./Flashcards.scss";
import endpoints from "../../services/api/endpoints";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TextButton from "../../ui/TextButton/TextButton";
function Flashcards() {
  const [cards, setCards] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showAnswer, setShowAnwser] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const navigate = useNavigate();

  const deckId = searchParams.get("deckId");
  async function fetchData() {
    const { data } = await axios.get(endpoints.getCardsFromDeck(deckId));
    setCards(data.cards);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleToggleShowAnswer() {
    setShowAnwser(!showAnswer);
  }

  async function handleAnswerRate(rate) {
    handleToggleShowAnswer();
    setCurrentCardIndex((prev) => (prev += 1));
    await axios.patch(
      endpoints.updateCard(cards[currentCardIndex].id),
      {
        domain: rate,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  function handleFinishAttemp() {
    navigate("/decks");
  }
  return (
    <main id="flashcards__main">
      <div className="container">
        <div className="container__top">
          <h3>fruits</h3>
          <TextButton onClick={handleFinishAttemp}>Finish attemp</TextButton>
        </div>
        <div className="flashcards__container">
          {currentCardIndex < cards.length ? (
            <>
              <div
                className={`flashcards__container__question ${
                  showAnswer && "flashcards__container__question--underline"
                }`}
              >
                <p>{cards[currentCardIndex]?.question}</p>
              </div>
              <div className="flashcards__container__answer">
                <p>{showAnswer ? `${cards[currentCardIndex]?.answer}` : ""}</p>
              </div>
              <div className="flashcards__container__options">
                {showAnswer ? (
                  <>
                    <TextButton onClick={() => handleAnswerRate(1)}>
                      Hard
                    </TextButton>
                    <TextButton onClick={() => handleAnswerRate(2)}>
                      Medium
                    </TextButton>
                    <TextButton onClick={() => handleAnswerRate(3)}>
                      Easy
                    </TextButton>
                  </>
                ) : (
                  <TextButton onClick={handleToggleShowAnswer}>
                    Show Answer
                  </TextButton>
                )}
              </div>
            </>
          ) : (
            <div className="flashcards__container__empty">
              <p>No more cards to show</p>
              <div className="flashcards__container__options">
                <TextButton onClick={handleFinishAttemp}>Finish</TextButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Flashcards;
