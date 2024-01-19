import "./CreateCardModal.scss";
import Modal from "../Modal/Modal";
import TextButton from "../../ui/TextButton/TextButton";
import { useRef, useState } from "react";
import axios from "axios";
import endpoints from "../../services/api/endpoints";

function CreateCardModal({ isOpen, onClose, fetchData, deckId }) {
  const [cardInfo, setCardInfo] = useState({});
  const formRef = useRef();

  function handleCloseModal(ev) {
    ev.preventDefault();
    setCardInfo(null);
    onClose();
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    await axios.post(
      endpoints.createCard,
      { ...cardInfo, deck_id: deckId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    formRef.current?.reset();
    await fetchData();
    handleCloseModal(ev);
  }

  //PENDING: Data validation

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className="aside__form" ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor="question">Front</label>
        <input
          className="aside__form__input"
          type="text"
          name="question"
          id="question"
          onChange={({ target }) =>
            setCardInfo({ ...cardInfo, question: target.value })
          }
        />
        <label htmlFor="answer">Back</label>
        <input
          size={4}
          className="aside__form__input"
          type="text"
          name="answer"
          onChange={({ target }) =>
            setCardInfo({ ...cardInfo, answer: target.value })
          }
        />
        <div className="aside__button__bottom">
          <TextButton>Save changes</TextButton>|
          <TextButton color={"red"} onClick={handleCloseModal}>
            Cancel
          </TextButton>
        </div>
      </form>
    </Modal>
  );
}

export default CreateCardModal;
