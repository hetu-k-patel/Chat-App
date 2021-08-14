import { useState } from 'react';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

import './App.css';

const App = () => {
   const [isLogin, setIsLogin] = useState(false);
   const [data, setData] = useState({});

   return (
      <>
         {!isLogin ? (
            <Join setData={setData} setIsLogin={setIsLogin} />
         ) : (
            <Chat data={data} />
         )}
      </>
   );
};

export default App;
