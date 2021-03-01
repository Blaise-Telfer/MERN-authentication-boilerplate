import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Dimmer, Loader } from 'semantic-ui-react';
import { logoutUser } from "../actions/userActions";


class Dashboard extends Component{
	 
  constructor() {
	super();
  }
	
  onLogoutClick = (e) => {
	e.preventDefault();
	this.props.logoutUser();
  };
  
  render(){
	return(
	  <div className="main">
		<h3>Welcome to the user dashboard</h3>
		<Link to="" onClick={this.onLogoutClick}><li> Logout </li></Link>
	  </div>
	)
  }
}

const mapStateToProps = (state) => ({
  authRegister: state.authRegister,
  authInfo: state.authInfo
});

export default connect(mapStateToProps, {logoutUser})(Dashboard);