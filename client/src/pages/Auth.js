import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Button, Card, Form, Row } from 'react-bootstrap';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userApi';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Auth = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const history = useHistory();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword(!showPassword);

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
                user.setIsAuth(true);
                history.push(HOME_ROUTE);
            } else {
                data = await registration(email, password);
            }
            user.setUser(data);
            history.push(HOME_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Authorization' : 'Registration'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control className="mt-3" placeholder="Enter your email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? 'text' : 'password'}
                    />
                    <div className="show-password-icon" onClick={toggleShowPassword}>
                        {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                    </div>
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ? (
                            <div>
                                Haven't account? <NavLink to={REGISTRATION_ROUTE}>Registered</NavLink>
                            </div>
                        ) : (
                            <div>
                                Have account? <NavLink to={LOGIN_ROUTE}>Log in</NavLink>
                            </div>
                        )}
                        <Button variant="outline-success" onClick={click}>
                            {isLogin ? 'Log in' : 'Register'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
