import React from 'react';
import { Navbar, Nav} from "react-bootstrap";
import { Link } from 'react-router-dom';
function Header() {
    return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Micro Movie Management System</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto mr-auto">
                    <Link className="nav-link" to="/my-list">My List</Link>
                </Nav>
                
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;