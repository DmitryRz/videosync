import React, {useMemo} from 'react';
import {Link} from "react-router-dom";

const Footer = () => {
    const currentYear = useMemo(() => new Date().getFullYear(), []);

    return (
        <footer className="bg-dark border-top border-secondary py-4">
            <div className="container">
                <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
                    <div className="flex-shrink-0">
                        <span className="text-light">
                          &copy; {currentYear} Videosync. Все права защищены.
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;