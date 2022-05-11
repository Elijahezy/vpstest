import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Message from '../components/message';
import styles from '../styles/Home.module.scss';


export default function Home() {
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  const handleWebSocket = () => {
    if (inputRef.current.value) {
      ws.current.send(inputRef.current.value);
    }
  }

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:5000/');


    // document.querySelector('#btn').addEventListener('click', () => {
    //   if (inputRef.current.value) {
    //     ws.current.send(inputRef.current.value);
    //   }
    // })

    ws.current.onmessage = (event) => {
      setMessages(JSON.parse(event.data));
    }
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Михан Лох</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>

        {/* <form className={styles.model} style={{ display: isEntered ? 'none' : 'flex' }} onSubmit={(evt) => evt.preventDefault()}>
          <div className={styles.model_content}>
            <label htmlFor="name" >Введите имя ашиндерю</label>
            <input type="text" id="name" placeholder='Введи имя, собака' required minLength={3} />
            <label htmlFor="password">Введите пароль</label>
            <input type="password" id="password" required minLength={4} />
            <button id="btn" type="button" onClick={(evt) => evt.preventDefault()} className={styles.model__register_btn_primary}>Зарегестрироваться</button>
            <button type="button" onClick={(evt) => evt.preventDefault()} className={styles.model__register_btn_secondary}>Войти</button>
          </div>

        </form>
        <form className={styles.model} style={{ display: isRegistered ? 'none' : 'flex' }} onSubmit={(evt) => evt.preventDefault()}>
          <div className={styles.model_content}>
            <label htmlFor="name" >Введите имя ашиндерю</label>
            <input type="text" id="name" placeholder='Введи имя, собака' required minLength={3} />
            <label htmlFor="password">Введите пароль</label>
            <input type="password" id="password" required minLength={4} />
            <button id="btn" type="button" onClick={(evt) => evt.preventDefault()} className={styles.model__btn_primary}>Зарегестрироваться</button>
            <button type="button" onClick={(evt) => evt.preventDefault()} className={styles.model__btn_secondary}>Войти</button>
          </div>

        </form> */}
        <div className={styles.form_container}>

          <input type="text" ref={inputRef} className={styles.content_input} maxLength={360} />
          <button id='btn' type='button' className={styles.content_button} onClick={(evt) => { evt.preventDefault(); handleWebSocket() }}>Отправить письмо любви</button>
        </div>
        <div className={styles.chat_container}>
          {messages.map((message, index) => {
            return <Message key={index} props={message} />
          })}
        </div>

      </main>
    </div>
  );
}