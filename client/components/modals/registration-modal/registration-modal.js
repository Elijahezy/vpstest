import styles from '../../../styles/RegistrationModal.module.scss';
import Modal from 'react-modal';
import { useState } from 'react';
import { BACKEND_URL } from '../../../services/route';
import axios from 'axios';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#__next');

function RegistrationModal(props) {
  const [modalIsOpen, setIsOpen] = useState(true);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleRegistration = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log(data);
    axios
      .post('http://localhost:5000/registration', data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUsersGet = () => {
    fetch(`${BACKEND_URL}/users`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get('http://localhost:5000/users')
      .then((response) => {
        console.log(response);
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
        <h2>Регистрация</h2>
        <button onClick={closeModal}>close</button>
        <form onSubmit={(evt) => handleRegistration(evt)}>
          <label htmlFor='name'>Введите имя</label>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Введите имя'
            required
            minLength={3}
          />
          <label htmlFor='password'>Введите пароль</label>
          <input
            type='password'
            id='password'
            name='password'
            required
            minLength={6}
          />
          <button type='submit' className={styles.model__btn_primary}>
            Зарегестрироваться
          </button>
        </form>
        <button onClick={() => handleUsersGet()}>Click me</button>
      </Modal>
    </div>
  );
}

export default RegistrationModal;
