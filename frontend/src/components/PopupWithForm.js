import React, { useEffect } from 'react';

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  onSubmit,
  submitButtonText,
  isSubmitLoading,
  isSubmitButtonActive
}) {
  const escClose = (ev) => {
    if (ev.key === "Escape") { // при клике на клавишу Esc
      onClose();
    }
  }
  const handleOverlay = (ev) => {
    // если есть `popup_opened` в классах блока, значит, кликнули на оверлей
    if (ev.target.classList.contains("popup_opened")) {
      onClose();
    }
  }
  function escClosePopup() {
    document.addEventListener('keydown', escClose);
  }
  function overlayClosePopup() {
    document.addEventListener("mousedown", handleOverlay);
  }
  useEffect(() => {
    if (isOpen) {
      escClosePopup();
      overlayClosePopup();
      return () => {
        document.removeEventListener('keydown', escClose);
        document.removeEventListener("mousedown", handleOverlay);
      };
    }
}, [isOpen, onClose]);
  return (
    <div className={`popup popup_type_${name} ${isOpen? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <form name={name} className="popup__form" onSubmit={onSubmit} noValidate>
          <h3 className="popup__title">{title}</h3>
            {children}
            <button type="submit" disabled={!isSubmitButtonActive} className={`popup__button ${isSubmitButtonActive? '': 'popup__button_disabled'}`}>{isSubmitLoading? `${submitButtonText}…` : submitButtonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
