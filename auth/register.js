import React, { useState } from 'react'
import axios from 'axios';
import validator from 'validator';
import { DOMEN_SERVER, DOMEN_SITE } from '../../config/const';

export default function Register () {
    const [register, setRegister] = useState(() => {
        return {
            login: "",
            password: "",
            password2: "",
        }
    })

    const changeInputRegister = event => {
        event.persist()
        setRegister(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const submitCheckin = event => {
        event.preventDefault();
        if(register.login ===""){
            alert("Имя не может быть пустым")
        }
        if(register.password !== register.password2) {
            alert("Пароли не совпадают")
        } else if(!validator.isStrongPassword(register.password, {minSymbols: 0})) {
            alert("Пароль должен содержать буквы верхнего и нижнего регистра и цифр, а также содержать не менее 8 символов")
        } else {
            axios.post(DOMEN_SERVER + "/registration", {
                login: register.login,
                password: register.password,
                repeatPassword: register.password2,
            })
                    .then(res => {
                        console.log(res.data['answ'])
                        if (res.data['answ'] !== "ok") {
                            alert("Пользователь с таким именем уже существует")
                        } else {
                            window.location.href = DOMEN_SITE + "/login"
                        }
                    })
        }
    }

    return (
        <div className="form2">
            <div className="centeredLog">
            <h2>Register user:</h2>
            <form onSubmit={submitCheckin}>
                <p><input
                    type="login"
                    id="login"
                    name="login"
                    placeholder="логин"
                    value={register.login}
                    onChange={changeInputRegister}
                /></p>
                <p><input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="пароль"
                    value={register.password}
                    onChange={changeInputRegister}
                /></p>
                <p><input
                    type="password"
                    id="password2"
                    name="password2"
                    placeholder="подтвердите пароль"
                    value={register.password2}
                    onChange={changeInputRegister}
                /></p>
                <div className="rightLog">
                    <input type="submit"/>
                </div>
            </form>
            </div>
        </div>
    )
}