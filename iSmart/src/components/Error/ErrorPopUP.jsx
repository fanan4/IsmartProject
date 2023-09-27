// ErrorPopup.js
import React, { useEffect, useState } from 'react';
import { useError } from '../../context/errorContext';
import { CloseIcon } from '../../utils/customedSvgs';
 import "./errorPopUP.scss"
function ErrorPopup() {
  const { errorMessage,
 setErrorMessage} = useError();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        setErrorMessage('');
      }, 8000);
    }
  }, [errorMessage]);

  return (
    <> 
    { showPopup ?  <div className="error-popup-layer">
     <div className='error-popup-container'>
        <div> {errorMessage}</div>
        <div className='cancel-button' onClick={()=> {setShowPopup(false) ;setErrorMessage('');}}> <CloseIcon/></div>
     </div>
    </div> : ""}
    </>
  
  );
}

export default ErrorPopup;
