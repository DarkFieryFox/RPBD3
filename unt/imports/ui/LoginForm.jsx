import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import {Link} from "react-router-dom";


export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = e => {
        e.preventDefault();

        Meteor.loginWithPassword(username, password);
    };

    return (
        <form onSubmit={submit} className="login-form">
            <div>
                <label htmlFor="username">Имя пользователя</label>

                <input
                    type="text"
                    placeholder="Логин"
                    name="username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="password">Пароль</label>

                <input
                    type="password"
                    placeholder="Пароль"
                    name="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div>
                <button className="button">Войти</button>

            </div>
             <Link to="/register">Зарегистрироваться</Link>
        </form>

    );
};
