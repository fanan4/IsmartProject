import React, { useState } from "react";
import "./tarrifs.scss";

// local components
import CustomHeader from "../../components/CustomHeader/customHeader";
import SideBar from "../../components/SideBar/sideBar";
import Layer from "../../components/Layer/layer";
import TextHeader from "../../components/TextHeader/textHeader";
 
function Tarrifs() {
   
  return (
    <div className="cntr">
      <SideBar active="tarrifs" />
      <div className="page-cntr">
        <CustomHeader value="Tarrifs" />
       
  
      <div className="abonned">
        <div className="header"> abonnement  </div>
      <div className="plans-section">
      <div className="plan">
        <h2>Basic Plan</h2>
        <p className="price">$4/mois</p>
        <ul className="features-list">
 
          <li>Improved profile page</li>
          <li>Multilingual</li>
          <li>Extra pages & fields (Unlimited)</li>
          <li>Contact Form in Order History</li>
          <li>Charge up to 1200 kW</li>
          <li>Create a group of up to 3 people</li>
          <li>Up to 5 charging sessions per month</li>
        </ul>
      </div>

      <div className="plan">
        <h2>Premium Plan</h2>
        <p className="price">$8/mois</p>
        <ul className="features-list">
 
          <li>All Basic Plan features</li>
          <li>Advanced analytics</li>
          <li>Premium support</li>
          <li>Custom branding</li>
          <li>Charge up to 3000 kW</li>
          <li>Create a group of up to 5 people</li>
          <li>Up to 10 charging sessions per month</li>
        </ul>
      </div>

      <div className="plan">
        <h2>Ultimate Plan</h2>
        <p className="price">$12/mois</p>
        <ul className="features-list">
   
          <li>All Premium Plan features</li>
          <li>Priority access</li>
          <li>API access</li>
          <li>Advanced customization</li>
          <li>Unlimited charging capacity</li>
          <li>Create groups of any size</li>
          <li>Unlimited charging sessions</li>
        </ul>
      </div>
    </div>
      </div>
      <div className="non-abonned">
        <div className="header"> non abonnés </div>
      <div className="plans-section">
      <div className="plan   ">
        <h2>Reserved charging </h2>
        <div  className="flex">

        <p className="price left ">1 DH for 1 minutes</p>
           
        <p className="price right">1 DH for 1Kwh</p>
        </ div>
     
      </div>

      <div className="plan">
        <h2> Unreserved charging </h2>
        <div  className="flex">
        <p className="price left">1.3 DH for 1 minutes </p>
        <p className="price right">1.3 DH for 1Kwh </p>
</div>
       
      </div>

       
    </div>
      </div>
    </div>
    </div>
  );
}

export default Tarrifs;
