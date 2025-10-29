import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className="border-bottom">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand fw-bold fs-3" to="/">
                        <span className="text-primary">Video</span>sync
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Главная</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/videos">Все видео</Link>
                            </li>
                        </ul>

                        <div className="d-flex">
                            <Link to='/signin' type="button" className="btn btn-outline-light me-2">Войти</Link>
                            <Link to='/signup' type="button" className="btn btn-primary">Регистрация</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;