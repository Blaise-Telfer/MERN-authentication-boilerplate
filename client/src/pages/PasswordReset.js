import React, { Component } from "react";
import { connect } from "react-redux";
import { resetPassword } from "../actions/userActions";
import {
  Button,
  Container,
  Form,
  Icon,
  Message,
  Segment, Dimmer, Loader
} from 'semantic-ui-react';


class ResetPassword extends Component{
  
  constructor() {
	super();
	this.state = {
	  password: "",
	  confirmPassword: ""
	};
  }
  
  onChange = (e) => this.setState({
	...this.state, [e.target.name]: e.target.value 
  });
  
  onSubmit = (e) => {
	e.preventDefault();
	const formData = {
	  password: this.state.password,
	  confirmPassword: this.state.confirmPassword,
	  email: this.props.match.params.email,
	  token: this.props.match.params.token
	};
	this.props.resetPassword(formData, this.props.history);
  };
  
  render(){
	const { loading, error, message } = this.props.passwordReset;
	
	return(
	  <div className="main">
		<Container text>
		  <h2>You may reset your email</h2>
		  
		  <Form onSubmit={this.onSubmit} className="submitForm">
			{loading ? (<Dimmer active inverted size="massive"><Loader inverted>Loading...</Loader></Dimmer>)
			: 
			message ? <Message className="success-text" content={message.message} />
			:
			error ? <Message className="error-text" content={error.message} />
			: null}
			<Segment>
			  <Form.Input
				fluid
				required
				icon="lock"
				iconPosition="left"
				label="Password"
				placeholder="password..."
				name="password"
				type="password"
				value={this.state.password}
				onChange={this.onChange}
			  />
			  <Form.Input
				fluid
				required
				icon="lock"
				iconPosition="left"
				label="Confirm Password"
				placeholder="confirm password..."
				name="confirmPassword"
				type="password"
				value={this.state.confirmPassword}
				onChange={this.onChange}
			  />
			  <Button primary
				icon="signup"
				type="submit"
				content="Submit"
			  />
			</Segment>
		  </Form>
		</Container>
	  </div>
	)
  }
}

const mapStateToProps = (state) => ({
  authInfo: state.authInfo,
  passwordReset: state.passwordReset
});

export default connect(mapStateToProps, { resetPassword })(ResetPassword);