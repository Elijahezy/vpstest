import styles from '../../../styles/RegistrationModal.module.scss';
import Modal from 'react-modal';
import { BACKEND_URL } from '../../../services/route';
import axios from 'axios';
import { saveToken } from '../../../services/token';

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

function RegistrationModal({ setIsOpen, modalIsOpen, setUserName }) {
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
    axios
      .post(`${BACKEND_URL}/registration`, data)
      .then((response) => {
        setIsOpen(false);
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
        <h2>Регистрация</h2>
        <button onClick={closeModal}>close</button>
        <form onSubmit={(evt) => handleRegistration(evt)}>
          <label htmlFor='name'>Введите имя</label>
          <input
            type='text'
            id='name'
            name='username'
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
      </Modal>
    </div>
  );
}

export default RegistrationModal;
