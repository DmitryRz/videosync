import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {hasRole} from "../../../utils/index.js";

const UserDropdown = ({ user, logout }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const onClickLogout = (e) => {
        e.preventDefault();
        setShowDropdown(false);
        logout();
        navigate('/login');
    };

    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
    };

    const closeDropdown = () => {
        setShowDropdown(false);
    };

    return (
        <div className="d-flex align-items-center">
            {hasRole(user, 'ADMIN') && (
                <div className="badge bg-danger p-2 me-3">ADMIN</div>
            )}

            <div className="dropdown">
                <button
                    className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                    type="button"
                    onClick={toggleDropdown}
                    aria-expanded={showDropdown}
                >
                    <span className="me-2">{user?.username || 'Пользователь'}</span>
                </button>

                <ul className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
                    <li>
                        <Link className="dropdown-item" to="/dashboard" onClick={closeDropdown}>
                            Профиль
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item" to="/settings" onClick={closeDropdown}>
                            Настройки
                        </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                        <button className="dropdown-item text-danger" onClick={onClickLogout}>
                            Выйти
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserDropdown;