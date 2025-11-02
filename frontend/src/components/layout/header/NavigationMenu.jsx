import React from 'react';
import { Link, useLocation } from "react-router-dom";
import {hasRole} from "../../../utils/index.js";

const NavigationMenu = ({ isAuthenticated, user }) => {
    const location = useLocation();

    const isActiveLink = (path) => {
        return location.pathname === path ? "active" : "";
    };

    return (
        <ul className="navbar-nav me-auto">
                <li className="nav-item">
                    <Link className={`nav-link ${isActiveLink('/')}`} to="/">
                        Главная
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${isActiveLink('/videos')}`} to="/videos" >
                        Все видео
                    </Link>
                </li>

                {isAuthenticated && hasRole(user, 'ADMIN') && (
                    <li className="nav-item">
                        <Link className={`nav-link ${isActiveLink('/admin')}`} to="/admin" >
                            Админ-панель
                        </Link>
                    </li>
                )}
        </ul>
    );
};

export default NavigationMenu;