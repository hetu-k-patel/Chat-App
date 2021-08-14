import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import './InfoBar.css';

const InfoBar = ({ room }) => {
   const handleCloseChat = () => {
      localStorage.removeItem('chatStorage');
      localStorage.removeItem('messages');

      window.close();
   };

   return (
      <>
         <div className="infoBar">
            <div className="leftInnerContainer">
               <img className="onlineIcon" src={onlineIcon} alt="online icon" />
               <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
               <button className="closeChat" onClick={handleCloseChat}>
                  <img src={closeIcon} alt="close icon" />
               </button>
            </div>
         </div>
      </>
   );
};
export default InfoBar;
