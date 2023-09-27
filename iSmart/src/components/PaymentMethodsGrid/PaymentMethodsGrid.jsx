import React from 'react';
import './PaymentMethodsGrid.scss';
import visaImage from '../../assets/images/visa_logo.png';
import mastercardImage from '../../assets/images/mastercard_logo.png';
import paypalImage from '../../assets/images/paypal_logo.png';

const PaymentMethodsGrid = () => {
  const paymentMethods = [
    { name: 'Visa', image:visaImage },
    { name: 'MasterCard', image: mastercardImage },
    { name: 'PayPal', image: paypalImage },
  ];

  return (
    <div className="payment-methods-grid">
      {paymentMethods.map((method, index) => (
        <div key={index} className="payment-method-card">
          <img src={method.image} alt={method.name} className="payment-method-image" />
          
        </div>
      ))}
    </div>
  );
};

export default PaymentMethodsGrid;
