import React from "react";
import Container from 'react-bootstrap/Container'
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
export const Navigationbar = () => {

  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    navigate('/')
  }
  return (
    <Navbar 
    style={{borderRadius: '4px'}}
    collapseOnSelect expand="lg" bg="primary" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/main">Бренд атауы</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/main">Басты бет</Nav.Link>
          </Nav>
          <Nav>
            {auth.isAuthenticated ?
              <Nav.Link onClick={logoutHandler} href="/">Шығу</Nav.Link> :
              <Nav.Link href="/">Авторизация</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>)
}