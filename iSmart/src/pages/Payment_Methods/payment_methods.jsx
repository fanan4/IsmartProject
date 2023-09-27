import React from "react";
import "./payment_methods.scss";

// local components
import CustomHeader from "../../components/CustomHeader/customHeader";
import SideBar from "../../components/SideBar/sideBar";
import PaymentMethodsGrid from "../../components/PaymentMethodsGrid/PaymentMethodsGrid";

function PaymentMethods() {
  return (
    <div className="cntr">
      <SideBar active="payment-methods" />
      <div className="page-cntr">
        <CustomHeader value="Payment Methods" />
        <PaymentMethodsGrid/>
      </div>
    </div>
  );
}

export default PaymentMethods;
