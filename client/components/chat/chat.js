import React from 'react';
import Message from '../message';

const Chat = () => {
  return (
    <>
      <div className={styles.form_container}>
        <input
          type='text'
          ref={inputRef}
          className={styles.content_input}
          maxLength={360}
        />
        <button
          id='btn'
          type='button'
          className={styles.content_button}
          onClick={(evt) => {
            evt.preventDefault();
            handleWebSocket();
          }}>
          Отправить письмо любви
        </button>
      </div>
      <div className={styles.chat_container}>
        {messages
          .map((message, index) => {
            return <Message key={index} props={message} />;
          })
          .reverse()}
      </div>
    </>
  );
};

export default Chat;
