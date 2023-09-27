import React, { useContext } from "react";

// external components
import { HashRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

// local components
import SignIn from "./pages/sign_in_page/sign_in";
 import Auth from "./pages/authentication";
import SingUp from "./pages/sign_up_page/sign_up";
import Dashboard from "./pages/dashboard/dashboard";
import ChargePoint from "./pages/charge_points/charge_points";
import Station from "./pages/Station/station";
import Sessions from "./pages/Sessions/sessions";
import Reservation from "./pages/Reservation/reservation";
import Users from "./pages/Users/users";
import Tarrifs from "./pages/Tarrifs/tarrifs";
import Transaction from "./pages/Transaction/transaction";
import PaymentMethods from "./pages/Payment_Methods/payment_methods";
import UserPage from "./pages/user_page/UserPage";
import Groups from "./pages/Groups/Groups";
import GroupPage from "./pages/group_page/GroupPage";
import AuthContext from "./context/authContext";
import PrivateRoute from "./utils/PrivateRoute";
import ProtectedRoutes from "./utils/protectedRoute";

function Router() {
    const { isLogedIn,isAuthenticated,user }=useContext(AuthContext)  
    
     if( !isAuthenticated ){ 
         isLogedIn()
     } 
 
  return (
    <HashRouter className="app">
      <Routes>
          <Route exact path="/auth" element={<Auth/>}/>
        <Route path="signin" element={<PrivateRoute />} />
           <Route   path="signin" element={<SignIn />} />
         <Route path="signup" element={<SingUp />} /> 
        {/* <Route element={<ProtectedRoutes />}> */}
          <Route exact path="" element={<PrivateRoute />} >
              <Route  exact path="" element={<Dashboard />} />
           </Route> 
          <Route exact path="/charge-points" element={<PrivateRoute />}>
            
              <Route  exact path="/charge-points" element={<ChargePoint />} />
          </Route>
          <Route exact path="/charge-points/:id" element={<ProtectedRoutes />} > 
            <Route  exact path="/charge-points/:id" element={<Station />} />
          </Route>
          <Route exact path="/charge-points" element={<PrivateRoute />} >
             <Route   exact path="/charge-points" element={<ChargePoint />}/>
          </Route>
          <Route exact path="/sessions" element={<PrivateRoute />} >
            <Route  exact path="/sessions" element={<Sessions />} />
          </Route>
          <Route exact path="/transaction" element={<PrivateRoute />} >
             <Route  exact path="/transaction" element={<Transaction />} />
          </Route>
          <Route exact path="/reservation" element={<PrivateRoute />} >
             <Route  exact path="/reservation" element={<Reservation />}/>
          </Route>
          <Route exact path="/users" element={<PrivateRoute />} > 
             <Route  exact path="/users" element={<Users />}/>
          </Route>
           <Route exact path="/users/:id" element={<ProtectedRoutes />} > 
            <Route   exact path="/users/:id" element={<UserPage />} /> 
           </Route> 
          <Route exact path="/groups" element={<PrivateRoute />} >
            <Route  exact path="/groups" element={<Groups />}/>
          </Route>
         
            <Route  exact path="/groups/:id" element={<GroupPage />}/>
         
          <Route exact path="/tarrifs" element={<PrivateRoute />} >
            <Route exact path="/tarrifs" element={<Tarrifs />}/>
          </Route>
          <Route exact path="/payment-methods" element={<PrivateRoute />} >
             <Route exact path="/payment-methods" element={<PaymentMethods />}/> 
            </Route> 
        {/* </Route> */}
      </Routes>
    </HashRouter>
  );
}

export default Router;
