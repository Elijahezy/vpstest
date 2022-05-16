import React from 'react';
import styles from '../../../styles/Message.module.scss';

const Message = ({ message, username }) => {
    return (
        <div className={styles.message_container}>
            <h3 >{username}</h3>
            <p >{message}</p>
        </div>
    );
};

export default Message;