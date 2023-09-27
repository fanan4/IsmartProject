import React from "react";
import "./App.scss";

import { UsersProvider } from "./context/usersContext";
import { ChargePointProvider } from "./context/chargePointsContext";
import { UserProvider } from "./context/userContext";
import { GroupsProvider } from "./context/groupsContext";
import Router from "./Router";
import { SessionsProvider } from "./context/sessionContext";
import { TransactionsProvider } from "./context/transactionContext";
import { GraphProvider } from "./context/graphContext";
import { ChargePointsGraphProvider } from "./context/chargePointGraphContext";
import  { AuthProvider } from './context/authContext'
import ErrorPopup from "./components/Error/ErrorPopUP";
import { ErrorProvider } from "./context/errorContext";
import { ReservationProvider } from "./context/reservationContext";

function App() {
   
  return (
  <ErrorProvider>
    <AuthProvider>
    <UserProvider>
      <GroupsProvider>
        <ChargePointProvider>
          <UsersProvider>
            <ReservationProvider>
            <SessionsProvider>
              <TransactionsProvider>  
                <GraphProvider>
                  <ChargePointsGraphProvider> 
                   <Router />
                  <ErrorPopup/>
                  </ChargePointsGraphProvider>
                </GraphProvider>
              </TransactionsProvider>
            </SessionsProvider>
            </ReservationProvider>
          </UsersProvider>
        </ChargePointProvider>
      </GroupsProvider>
    </UserProvider>
    </AuthProvider>  
    </ErrorProvider>
  );
}

export default App;
