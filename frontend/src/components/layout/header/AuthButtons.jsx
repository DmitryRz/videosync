import React from 'react';
import { Link, useLocation } from "react-router-dom";

const AuthButtons = () => {
    const location = useLocation();

    return (
        <div className="d-flex flex-column flex-lg-row gap-2">
            <Link to='/signin' className="btn btn-outline-light" state={{ from: location }}>
                Войти
            </Link>
            <Link to='/signup' className="btn btn-primary">
                Регистрация
            </Link>
        </div>
    );
};

export default AuthButtons;