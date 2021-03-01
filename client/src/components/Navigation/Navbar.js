import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { logoutUser } from "../../actions/userActions";
import { RightNav, Burger } from "./navStyle";
import styled from "styled-components";

const Nav = styled.nav`
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  .nav-cart {
    padding: 15px 0;
	display: flex;
	align-items: center;
	
  }
`

class Navbar extends Component{

  onLogoutClick = (e) => {
	e.preventDefault();
	this.props.logoutUser();
  };
	
  render() {
	const { authInfo } = this.props;

	return (
	  <Nav className="Navbar">
		<div>
		  <h3>MERN Auth Boilerplate</h3>
		</div>
		<Burger
		  onLogoutClick={(e) => this.onLogoutClick(e)}
		  authInfo={this.props.authInfo}
		/>
	  </Nav>
	);
  }
};


Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  authInfo: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authInfo: state.authInfo
});

export default connect(mapStateToProps, {logoutUser})(Navbar);
  
  
  
  