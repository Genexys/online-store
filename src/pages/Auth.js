import React, {useContext, useState} from 'react';
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Row, Card, Container, Form, Button} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation();
    const history = useHistory();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const authHandler = async () => {
        try {
            let dataUser;
            if (isLogin) {
                dataUser = await login(email, password);
            } else {
                dataUser = await registration(email, password);
            }

            user.setUser(dataUser);
            user.setIsAuth(true);
            history.push(SHOP_ROUTE);
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control className="mt-3" placeholder="Введите email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control className="mt-3" placeholder="Введите пароль"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  type="password"
                    />
                    <div className="d-flex align-items-center justify-content-between mt-3">
                        {isLogin ?
                            <div>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрирутесь!</NavLink></div>
                            :
                            <div>Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink></div>
                        }
                        <Button variant="outline-primary" className="mt-3 ml-3"
                                onClick={authHandler}>{isLogin ? 'Войти' : 'Регистрация'}</Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
