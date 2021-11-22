import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers, deleteUser } from "../actions/userActions";
import { Button, Message, Segment, Dimmer, Loader, Modal } from 'semantic-ui-react';


const AdminPanel = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [userId, setId] = useState("");
  const [userName, setName] = useState("");
  const dispatch = useDispatch();
  
  const userList = useSelector((state) => state.userList);
  const { users, loading, error } = userList;
  
  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = userDelete;
  
  const handleOpen = (user) => {
	setModalOpen(true);
	setId(user._id);
	setName(user.username);
  }
  const handleClose = () => {
	setModalOpen(false);
  }
  const deleteHandler = () => {
    dispatch(deleteUser(userId));
	handleClose();
  };
  
  useEffect(() => {
	dispatch(fetchUsers());
  }, [successDelete]);
	
  return (
	<div className="main">
	  {loading ? (<Dimmer active inverted size="massive"><Loader inverted>Loading...</Loader></Dimmer>) 
	  : 
	  error ? (<div> {error.message} </div>) 
	  : (
	  <div className="users-layout">
	    
		<h3>New Admin Panel</h3>
		<div>
		  {users.map((user) => (
			<li key={user._id}>
				<div>{user._id}</div>
				<div>{user.username}</div>
				<Button color='red' onClick={() => handleOpen(user)}> Delete User </Button>
				
				<Modal
				  open={modalOpen}
				  onClose={handleClose}
				  closeIcon
				>
				  <Modal.Header>Are you sure you want to delete {userName}'s account?</Modal.Header>
				  <Modal.Content>
				    <Button color='red' onClick={deleteHandler}> Delete </Button>
				  </Modal.Content>
				  <Button color='green' onClick={handleClose} inverted> Cancel </Button>
				</Modal>
			</li>
		  ))}
		</div>
	  </div>
	  )}
	</div>
  );
};

export default AdminPanel;
