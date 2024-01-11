import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleUpload: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  handleUpload,
  children,
}) => {
  const modalStyle: React.CSSProperties = {
    display: isOpen ? "block" : "none",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 999,
  };

  return (
    <div
      className="flex flex-col space-y-3 shadow-xl border"
      style={modalStyle}
    >
      {children}
      <div className="flex justify-between items-center">
        <button className="py-2 px-4 border" onClick={handleUpload}>
          Upload
        </button>
        <button className="py-2 px-4 border" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
