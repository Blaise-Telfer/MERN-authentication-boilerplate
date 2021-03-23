import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


class Home extends Component{
  
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
  authInfo: state.authInfo
});

export default connect(mapStateToProps)(Home);