import { DialogHTMLAttributes, useEffect, useRef, useState } from "react";
import "./Modal.scss";

type ModalDialog = {
  isOpen: boolean;
};
type DialogNative = DialogHTMLAttributes<HTMLDialogElement>;
type ModalDialogProps = ModalDialog & DialogNative;

function Modal({ isOpen, children }: ModalDialogProps) {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDialogElement>(null);

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
