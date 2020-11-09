import React from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';


const Modal = ({ children, hide, author, authorAvatar, loc}) => (
  ReactDOM.createPortal(
    <>
     <div className={styles.modal__overlay} />
      <div className={styles.modal__wrapper}>
      <div className={styles.modal}>
        <div className={styles.modal__fooder}>
          <span className={styles.profile__container}>
            <figure className={styles.profile__shape_md}>
              <img src={authorAvatar} alt={loc}/>
            </figure>
            <span>{author}</span>
          </span>
          <span className={styles.modal__close} data-dismiss="modal" onClick={hide} >
            &times;
          </span>
        </div>
        <div className={styles.modal__layout}>
          {children}
        </div>
        <div className={styles.modal__fooder}>
          <span><i className={styles.pinIcon} /> {loc ? loc : "Sorry, no location has been added to this photo"}</span>
        </div>
      </div>
    </div>
    </>,
    document.body
  )
);

export default Modal;