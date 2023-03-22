import { Meteor } from 'meteor/meteor';
import '../../client/main.css'

import React from 'react'
import { Link } from 'react-router-dom'

export const Header: React.FC = () => {
    const logout = () => Meteor.logout();


    return (
        <div className="header-outer">
            <div className="header container">
                <div className="header__title">
                    <span>Лабораторная работа №3</span>
                </div>
                <div className="header__line" />
                    <Link className="header__link " to="/parent">Родители</Link>
                    <Link className="header__link " to="/progresss">Успеваемость</Link>
                    <Link className="header__link " to="/schoolchilds">Ученики</Link>
                    <Link className="header__link " to="/login" onClick={logout}>Авторизация</Link>
            </div>
        </div>
    )
}