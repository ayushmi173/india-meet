import React, { useState } from 'react';
import { Socket, io } from 'socket.io-client';

const App: React.FC = () => {
  const socket = io(`http://${window.location.hostname}:4000`, {
    host: '4000',
    transports: ['websocket'],
  });

  const [message, setMessage] = useState<string>('');
  const [entireMessages, setEntireMessages] = useState<Socket[]>([]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleMessageSend = () => {
    console.log('canled');
    socket.on('send_message', () => {
      console.log(socket.id, socket.connected);
    });
    socket.emit('send_message', {
      message: message,
    });
  };

  console.log(message);

  return (
    <div className="App">
      <h1>Indian Meet Chatting</h1>
      Message :
      <input type="text" value={message} onChange={handleMessageChange} />
      <button onClick={handleMessageSend}>Send</button>
    </div>
  );
};

export default App;
