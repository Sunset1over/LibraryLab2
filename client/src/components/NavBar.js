import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink, useHistory} from "react-router-dom";
import {ADMIN_ROUTE, HOME_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }


    return (
        <Navbar bg="dark" variant="dark">
            <NavLink style={{paddingLeft: 200}} to={HOME_ROUTE}>Home</NavLink>
            {user.isAuth ?
                <Nav className="ml-auto" style={{paddingRight: 230}}
                >
                    <Button variant={"outline-light"} onClick={() => history.push(ADMIN_ROUTE)}>Admin panel</Button>
                    <Button variant={"outline-light"} onClick={() => logOut()} className="ml-2">LOG OUT</Button>
                </Nav>
                :
                <Nav className="ml-auto" style={{paddingRight: 230}}>
                    <Button variant={"outline-light"} onClick={() => history.push(REGISTRATION_ROUTE)}>Registration</Button>
                </Nav>
            }
        </Navbar>
    );
});

export default NavBar;