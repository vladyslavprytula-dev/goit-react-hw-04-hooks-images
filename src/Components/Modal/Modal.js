import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.scss';
import defaultImag from './no_icon.png';

const modalRoot = document.querySelector('#modal-root');
export default function Modal({ largeImgUrl, alternative, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handelKeyDown);
    return function cleanup() {
      window.removeEventListener('keydown', handelKeyDown);
    };
  });

  const handelKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handelOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handelOverlayClick}>
      <div className="Modal">
        <img src={largeImgUrl} alt={alternative} className="Image" />
      </div>
    </div>,
    modalRoot,
  );
}
Modal.defaultProps = {
  largeImgUrl: defaultImag,
};
Modal.propTypes = {
  largeImgUrl: PropTypes.string,
  alternative: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
