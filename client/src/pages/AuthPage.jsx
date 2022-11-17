import "../index.scss"
import { Button, Form, ButtonGroup } from "react-bootstrap"
import React, { useState } from "react"
import { useHttp } from "../hooks/http.hook"
import { useEffect } from "react"
import { useMessage } from "../hooks/message.hook"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"


export const AuthPage = () => {

    const { loading, request, error, clearError } = useHttp()

    const auth = useContext(AuthContext)

    const message = useMessage()

    const [myform, setMyForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])


    const changeHandler = event => {
        setMyForm({
            ...myform,
            [event.target.name]: event.target.value
        })
    }

    const registerHandler = async () => {
        try {
            const data = await request("/api/auth/registration", "POST", { ...myform })
            message(data.message)
        } catch (e) { }
    }

    const loginHandler = async () => {
        try {
            const data = await request("/api/auth/login", "POST", { ...myform })
            auth.login(data.token, data.userId)
        } catch (e) {

        }
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col-md-4">
                        <br />
                        <h4>Авторизация</h4>

                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email"
                                    onChange={changeHandler}
                                    placeholder="Поштаны енгізіңіз" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Құпия сөз</Form.Label>
                                <Form.Control type="password" name="password"
                                    onChange={changeHandler}
                                    placeholder="Құпия сөзді енгізіңіз" />
                            </Form.Group>
                            <ButtonGroup>
                                <Button variant="primary"
                                    onClick={loginHandler}
                                    disabled={loading}
                                    className="BLUE_BTN">
                                    Кіру
                                </Button>
                                <Button variant="primary" onClick={registerHandler}
                                    disabled={loading}
                                    className="BLUE_BTN registration_BTN">
                                    Регистрация
                                </Button>
                            </ButtonGroup>

                        </Form>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </div>
    )
}

