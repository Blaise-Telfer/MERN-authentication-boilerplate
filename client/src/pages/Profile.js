import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Segment, Dimmer, Loader } from 'semantic-ui-react';


class Profile extends Component{
  
  componentDidMount(){
	const { match, authInfo } = this.props;
	const notUser = (match.params.username !== authInfo.user.username);
	if(notUser){
	  this.props.history.push(`/dashboard`)
	}
  }
  
  renderVerifyStatus() {
	const { user } = this.props.authInfo;
	if(!user.verified){
	  return (
		<div>
		  <h2>Your account has not been verified</h2>
		</div>
	  );
	}
	else if(user.verified){
	  return (
		<div>
		  <h2>Your account is now verified</h2>
		</div>
	  );
	}
  }
  
  render(){
	const accountName = this.props.match.params.username;
	
	return(
	  <div className="main">
		<h1>Greetings, {accountName}</h1>
		{this.renderVerifyStatus()}
	  </div>
	)
  }
}

const mapStateToProps = (state) => ({
  authInfo: state.authInfo
});

export default connect(mapStateToProps)(Profile);