import { useState, useEffect } from 'react';
import io from 'socket.io-client';

import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;
const Chat = ({ data: { name, room } }) => {
   const [message, setMessage] = useState('');
   const [messages, setMessages] = useState([]);

   const SOCKET_SERVER = 'http://localhost:5000';

   useEffect(() => {
      socket = io(SOCKET_SERVER);

      const getMessagesFromLocalStorage = localStorage.getItem('messages');
      if (getMessagesFromLocalStorage) {
         setMessages(JSON.parse(getMessagesFromLocalStorage));
      }

      socket.emit('join', { name, room }, (error) => {
         if (error) {
            window.alert(error);
         }
      });

      return () => {
         socket.disconnect();
         socket.off();
      };
   }, [SOCKET_SERVER, name, room]);

   useEffect(() => {
      socket.on('message', (message) => {
         setMessages([...messages, message]);
      });

      localStorage.setItem('messages', JSON.stringify(messages));
   }, [messages]);

   const sendMessage = (event) => {
      event.preventDefault();

      if (message) {
         console.log();
         socket.emit('sendMessage', message, () => setMessage(''));
      }
   };

   return (
      <div className="outerContainer">
         <div className="container">
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
         </div>
      </div>
   );
};

export default Chat;
