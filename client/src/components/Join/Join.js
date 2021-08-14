import React, { useState } from 'react';

import './Join.css';

export default function Login({ setIsLogin }) {
   const [name, setName] = useState('');
   const [room, setRoom] = useState('');

   function handleClick() {
      const data = { name, room };
      localStorage.setItem('chatStorage', JSON.stringify(data));
      setIsLogin(true);
   }

   return (
      <>
         <div className="joinOuterContainer">
            <div className="joinInnerContainer">
               <h1 className="heading">Join</h1>
               <div>
                  <input
                     placeholder="Name"
                     className="joinInput"
                     type="text"
                     onChange={(event) => setName(event.target.value)}
                  />
               </div>
               <div>
                  <input
                     placeholder="Room"
                     className="joinInput mt-20"
                     type="text"
                     onChange={(event) => setRoom(event.target.value)}
                  />
               </div>
               <button
                  className={'button mt-20'}
                  onClick={(e) => (!name || !room ? e.preventDefault() : handleClick())}
                  type="submit"
               >
                  Sign In
               </button>
            </div>
         </div>
      </>
   );
}
