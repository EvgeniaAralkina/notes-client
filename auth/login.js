import React, { useState } from 'react'
import axios from 'axios';
import { DOMEN_SERVER, DOMEN_SITE } from '../../config/const';

export default function Login () {
    const [login, setLogin] = useState(() => {
        return {
            login: "",
            password: ""
        }
    })

    const changeInputRegister = event => {
        event.persist()
        setLogin(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const submitCheckin = event => {
        event.preventDefault();
        axios.post(DOMEN_SERVER + "/login", {
            login: login.login,
            password: login.password,
        }).then(res => {
            if (res.data.answ){
                alert("Неправильный логин или пароль")
            } else {
                localStorage.setItem('token', res.data.token);
                window.location.href = "/";
            }
        }).catch(() => {
            alert("Неправильный логин или пароль")
        })
    }

    const goToRegistration = event => {
        event.preventDefault();
        window.location.href = DOMEN_SITE + "/registration"
    }

    return (
        <div className="form2">
            <div className="centeredLog">
            <h2>Вход:</h2>
            <form onSubmit={submitCheckin}>
                <p><input
                    type="login"
                    id="login"
                    name="login"
                    placeholder="логин"
                    value={login.login}
                    onChange={changeInputRegister}
                /></p>
                <p> <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="пароль"
                    value={login.password}
                    onChange={changeInputRegister}
                /></p>
                <div className="rightLog">
                <input type="submit"/>
                </div>
            </form>
                <div className="rightLog">
                    <button className="reg" onClick={goToRegistration}>
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        </div>
    )
}