import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { saveToken } from '../../../services/token';
import styles from '../../../styles/modals/Login.module.scss';
import { customStyles } from '../../../utils/utils';

Modal.setAppElement('#__next');

const LoginModal = ({
  setIsOpen,
  modalIsOpen,
  setUserName,
  setIsRegistrationOpen,
}) => {
  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openRegistrationModal = () => {
    setIsRegistrationOpen(true);
    setIsOpen(false);
  };

  const handleLogin = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    axios
      .post('http://localhost:5000/login', data)
      .then((response) => {
        closeModal();
        console.log(response.data.token);
        saveToken(response.data.token);
        setUserName(response.data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'>
        <h2>Войти</h2>
        <form onSubmit={(evt) => handleLogin(evt)} className={styles.form}>
          <input
            type='text'
            id='name'
            name='username'
            placeholder='Введите имя'
            required
            minLength={3}
          />
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Введите пароль'
            required
            minLength={6}
          />
          <button type='submit'>Войти</button>
          <button type='button' onClick={openRegistrationModal}>
            Зарегестрироваться
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default LoginModal;
