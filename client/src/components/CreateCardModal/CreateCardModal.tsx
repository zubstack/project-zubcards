import "./CreateCardModal.scss";
import Modal from "../Modal/Modal";
import TextButton from "../../ui/TextButton/TextButton";
import {
  FormEventHandler,
  MouseEventHandler,
  MouseEvent,
  useRef,
  useState,
} from "react";
import axios from "axios";
import endpoints from "../../services/api/endpoints";

type CreateCardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  fetchData: () => void;
  deckId: string | null;
};

type CardInfo = {
  question?: string;
  answer?: string;
};

function CreateCardModal({
  isOpen,
  onClose,
  fetchData,
  deckId,
}: CreateCardModalProps) {
  const [cardInfo, setCardInfo] = useState<CardInfo | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleCloseModal: MouseEventHandler = (ev) => {
    ev.preventDefault();
    setCardInfo(null);
    onClose();
  };

  const handleSubmit: FormEventHandler = async (ev) => {
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
    fetchData();
    handleCloseModal(ev as MouseEvent);
  };

  //PENDING: Data validation

  return (
    <Modal isOpen={isOpen}>
      <form className="aside__form" ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor="question">Front</label>
        <input
          type="text"
          className="aside__form__input"
          name="question"
          id="question"
          onChange={({ target }) =>
            setCardInfo({ ...cardInfo, question: target.value })
          }
        />
        <label htmlFor="answer">Back</label>
        <input
          type="text"
          className="aside__form__input"
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
