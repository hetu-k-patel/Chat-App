import { useState } from 'react';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

import './App.css';

const App = () => {
   const [isLogin, setIsLogin] = useState(false);
   const storageData = JSON.parse(localStorage.getItem('chatStorage'));

   if (!storageData) {
      return <Join setIsLogin={setIsLogin} />;
   } else {
      return <Chat data={storageData} />;
   }
};

export default App;
