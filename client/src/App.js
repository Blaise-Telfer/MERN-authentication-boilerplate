import React, { Component } from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";

// Pages
import PrivateRoute from "./components/privateRoute";
import AdminRoute from "./components/adminRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PasswordForgot from "./pages/PasswordForgot";
import PasswordReset from "./pages/PasswordReset";
import Verification from "./pages/Verification";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

import { setCurrentUser, logoutUser } from "./actions/userActions";
import setAuthToken from "./actions/token";
import { Store } from "./store";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  Store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    Store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

export const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Router history={history}>
		  <Navbar />
		  <div className="grid-container">
		  
			<div className="main-content">
			<Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
			  <Route exact path="/register" component={Register} />
			  <Route exact path="/forgotPassword" component={PasswordForgot} />
			  <Route exact path="/resetPassword/:email/:token" component={PasswordReset} />
			  <Route exact path="/verify/:email/:token" component={Verification} />
			  
			  <AdminRoute exact path="/adminPanel" component={AdminPanel} />
			  <PrivateRoute exact path="/dashboard" component={Dashboard} />
			  <PrivateRoute exact path="/profile/:username" component={Profile} />
			  
              <Route exact path="*" component={NotFound} />
			</Switch>
			</div>
			<Footer />
			
		  </div>
        </Router>
      </Provider>
    );
  }
}


export default App;