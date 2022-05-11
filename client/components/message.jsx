import React from 'react';
import styles from '../styles/Message.module.scss';

const Message = ({ props }) => {
    return (
        <div className={styles.message_container}>
            <h3 className={styles.name}>{props}</h3>
            <p className={styles.message}>{props?.message}</p>
        </div>
    );
};

export default Message;