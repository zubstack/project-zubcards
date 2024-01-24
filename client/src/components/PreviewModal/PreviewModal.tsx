import { useState } from "react";
import TextButton from "../../ui/TextButton/TextButton";
import Modal from "../Modal/Modal";
import "./PreviewModal.scss";

type CardValues = {
  question: string;
  answer: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  domain: number;
};

type PreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  cards: CardValues[];
};

function PreviewModal({ isOpen, onClose, cards }: PreviewModalProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);

  function handleNext() {
    setCurrentCardIndex((prev) => (prev += 1));
  }

  function handleFinish() {
    onClose();
    setCurrentCardIndex(0);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div id="preview__modal">
        <div className="modal__options__top">
          <TextButton
            style={{
              padding: 0,
            }}
            onClick={handleFinish}
            color={"red"}
          >
            Close
          </TextButton>
        </div>
        <div className="modal__item">
          <p>{cards[currentCardIndex].question}</p>
        </div>
        <div className="modal__item">
          <p>{cards[currentCardIndex].answer}</p>
        </div>
        <div className="modal__options__bottom">
          {currentCardIndex < cards.length - 1 ? (
            <TextButton
              style={{
                padding: 0,
                fontWeight: "bold",
              }}
              onClick={handleNext}
            >
              Next
            </TextButton>
          ) : (
            <TextButton
              style={{
                fontWeight: "bold",
                padding: 0,
              }}
              onClick={handleFinish}
            >
              Finish
            </TextButton>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default PreviewModal;
