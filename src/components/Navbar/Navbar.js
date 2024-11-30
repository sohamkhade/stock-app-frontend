import React, {useEffect, useState} from 'react';
import { Container, Nav, Navbar } from "react-bootstrap";
import './NavBar.css';
import {Link, useLocation, useNavigate} from "react-router-dom";

const NavBar = () => {
    const [display, setDisplay] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
       if (location.pathname === '/portfolio') {
            setDisplay("portfolio");
        }else if(location.pathname.startsWith('/search/')){
           setDisplay("home");
           console.log("HOME");
       }else if(location.pathname === '/watchlist'){
           setDisplay('watchlist');
       }else {
            setDisplay("");
        }
    }, [location]);
    return (
        <div className={''} style={{minHeight: "5vh"}}>
            <Navbar collapseOnSelect expand="lg" className="background-dark-blue sticky-top">
                <Container>
                    <Navbar.Brand className={"text-light btn"} onClick={() => {navigate('/search/home');}}>Stock Search</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className={'border-white'}>
                        <i className="bi bi-list text-light"></i>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="responsive-navbar-nav" className={''}>
                        <Nav className={'ms-md-auto me-lg-0'}>
                            <Link to={'/search/home'}
                                  className={`btn text-light text-start ${display === "home" ? "active" : ""}`}
                                  onClick={() => setDisplay("home")} >Search</Link>
                            <Link to={'/watchlist'}
                                  className={`btn text-light text-start ${display === "watchlist" ? "active" : ""}`}
                                  onClick={() => setDisplay("watchlist")}>Watchlist</Link>
                            <Link to={'/portfolio'}
                                  className={`btn text-light text-start ${display === "portfolio" ? "active" : ""}`}
                                  onClick={() => setDisplay("portfolio")}>Portfolio</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;
