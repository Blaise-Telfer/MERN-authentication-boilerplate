import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUsers, deleteUser } from "../actions/userActions";
import {
  Button,
  Container,
  Form,
  Icon,
  Message,
  Segment, Dimmer, Loader, Modal
} from 'semantic-ui-react';


class AdminPanel extends Component{

  constructor() {
	super();
	this.state = {
	  modalOpen: false,
	  id: ""
	}
  }

  componentDidMount() {
	this.props.fetchUsers();
  }
  
  deleteHandler = (e) => {
	e.preventDefault();
	this.props.deleteUser(this.state.id);
	this.handleClose();
  };
  
  handleOpen = (id) => this.setState({ modalOpen: true, id: id });
  handleClose = () => this.setState({ modalOpen: false });
  
  render(){
	const { users, loading, error } = this.props.userList;
	
	return(
	  <div className="main">
		<h3>Welcome to the admin panel</h3>
		{loading ? (<Dimmer active inverted size="massive"><Loader inverted>Loading...</Loader></Dimmer>) 
		: 
		error ? (<div> {error.message} </div>) 
		: (
		
		  <div>
			{users.map((user) => (
			  <li key={user._id}>
				<div>{user.email}</div>
				<div>{user.username}</div>
				<Button color='red' onClick={() => this.handleOpen(user._id)}> Delete User </Button>
				<Modal
				  open={this.state.modalOpen}
				  onClose={this.handleClose}
				  closeIcon
				>
				  <Modal.Header>Are you sure you want to delete this account?</Modal.Header>
				  <Modal.Content>
				  <Button color='red' onClick={this.deleteHandler}> Delete </Button>
				  </Modal.Content>
				  <Button color='green' onClick={this.handleClose} inverted> Cancel </Button>
				</Modal>
			  </li>
			))}
		  </div>
		  
		)}
	  </div>
	)
  }
}

const mapStateToProps = (state) => ({
  userList: state.userList,
  userDelete: state.userDelete,
  authInfo: state.authInfo
});


export default connect(mapStateToProps, {fetchUsers, deleteUser})(AdminPanel);
