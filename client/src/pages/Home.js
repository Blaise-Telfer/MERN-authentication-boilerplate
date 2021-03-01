import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Dimmer, Loader } from 'semantic-ui-react';


class Home extends Component{
	 
  constructor() {
	super();
  }
	
  componentDidMount() {
	
  }
  
  render(){
	return(
	  <div className="main">
		<h3>Home page</h3>
		<Link to="/dashboard">You must be logged in to visit the dashboard here</Link>
	  </div>
	)
  }
}

const mapStateToProps = (state) => ({
  authRegister: state.authRegister,
  authInfo: state.authInfo
});


export default connect(mapStateToProps)(Home);