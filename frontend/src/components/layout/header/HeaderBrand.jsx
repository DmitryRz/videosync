import React from 'react';
import { Link } from "react-router-dom";

const HeaderBrand = () => {
    return (
        <Link className="navbar-brand fw-bold fs-3" to="/">
            <span className="text-primary">Video</span>sync
        </Link>
    );
};

export default HeaderBrand;