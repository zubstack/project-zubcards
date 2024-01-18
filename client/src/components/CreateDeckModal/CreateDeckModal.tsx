import "./CreateDeckModal.scss";
import Modal from "../Modal/Modal";
import TextButton from "../../ui/TextButton/TextButton";
import { useState } from "react";
import axios from "axios";
import endpoints from "../../services/api/endpoints";

function CreateDeckModal({ isOpen, onClose, fetchData }) {
  const [topic, setTopic] = useState(null);

  function handleCloseModal(ev) {
    ev.preventDefault();
    onClose();
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    await axios.post(
      endpoints.createDeck,
      { topic },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    await fetchData();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form action="" className="form__container" onSubmit={handleSubmit}>
        <div className="form__field">
          <label htmlFor="topic">New deck</label>
          <input
            type="text"
            name="topic"
            onChange={({ target }) => setTopic(target.value)}
          />
        </div>
        <div className="form__options">
          <TextButton type="submit">Save new card</TextButton>|
          <TextButton color="red" onClick={handleCloseModal}>
            Cancel
          </TextButton>
        </div>
      </form>
    </Modal>
  );
}

export default CreateDeckModal;
