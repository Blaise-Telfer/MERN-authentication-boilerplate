import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/userActions";


class Dashboard extends Component{
  
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
  authInfo: state.authInfo
});

export default connect(mapStateToProps, {logoutUser})(Dashboard);