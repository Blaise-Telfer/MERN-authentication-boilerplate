import React, { Component } from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";

// Pages
import PrivateRoute from "./components/privateRoute";
import AdminRoute from "./components/adminRoute";
import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
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
			  
			  <PrivateRoute exact path="/dashboard" component={Dashboard} />
			  <AdminRoute exact path="/adminPanel" component={AdminPanel} />
			  
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