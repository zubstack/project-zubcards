import "./CreateDeckModal.scss";
import Modal from "../Modal/Modal";
import TextButton from "../../ui/TextButton/TextButton";
import { useRef, useState } from "react";
import axios from "axios";
import endpoints from "../../services/api/endpoints";

function CreateDeckModal({ isOpen, onClose, fetchData, editId, setEditId }) {
  const [topic, setTopic] = useState("");
  const formRef = useRef();

  function handleCloseModal(ev) {
    ev.preventDefault();
    setTopic("");
    setEditId(null);
    onClose();
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (editId) {
      await axios.patch(
        endpoints.updateDeck(editId),
        { topic },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    } else {
      await axios.post(
        endpoints.createDeck,
        { topic },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
    formRef.current?.reset();
    await fetchData();
    handleCloseModal(ev);
  }
  //PENDING: Handle 'repeated topic' errors from backend
  //PENDING: Sort decks for 'created_at'
  //PENDING: Delete confirmation

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        action=""
        className="form__container"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div className="form__field">
          <label htmlFor="topic"> {editId ? "Edit deck" : "New deck"}</label>
          <input
            type="text"
            name="topic"
            id="topic"
            onChange={({ target }) => setTopic(target.value)}
          />
        </div>
        <div className="form__options">
          <TextButton type="submit">
            {editId ? "Edit deck" : "Save new deck"}
          </TextButton>
          |
          <TextButton color="red" onClick={handleCloseModal}>
            Cancel
          </TextButton>
        </div>
      </form>
    </Modal>
  );
}

export default CreateDeckModal;
