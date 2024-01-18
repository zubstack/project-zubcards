import { useEffect, useRef, useState } from "react";
import "./Modal.scss";
function Modal({ isOpen, onClose, children }) {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef();

  // function handleCloseModal() {
  //   onClose();
  //   setModalOpen(false);
  // }

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  return (
    <dialog className="modal" id="modal" ref={modalRef}>
      {/* <button
        id="closeModal"
        className="modal-close-btn"
        onClick={handleCloseModal}
      >
        Close
      </button> */}
      {children}
    </dialog>
  );
}

export default Modal;
