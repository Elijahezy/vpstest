import React from 'react';
import styles from '../../styles/Menu.module.scss';

const Menu = ({ setModalIsOpen, userName }) => {
  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu_container}>
        {userName ? (
          <p className={styles.menu_login_button}>{userName}</p>
        ) : (
          <button
            className={styles.menu_login_button}
            onClick={handleOpenModal}>
            Войти
          </button>
        )}
      </div>
    </div>
  );
};

export default Menu;
