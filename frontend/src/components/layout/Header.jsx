import React from 'react';
import { useAuth } from "../../hooks/index.js";
import { AuthContext } from "../../context/AuthContext.js";
import HeaderLoading from "./header/HeaderLoading.jsx";
import AuthButtons from "./header/AuthButtons.jsx";
import HeaderBrand from "./header/HeaderBrand.jsx";
import NavigationMenu from "./header/NavigationMenu.jsx";
import UserDropdown from "./header/UserDropdown.jsx";

const Header = () => {
    const { user, isAuthenticated, isLoading, logout } = useAuth(AuthContext);

    if (isLoading) {
        return <HeaderLoading />;
    }

    return (
        <header className="border-bottom">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <HeaderBrand />

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <NavigationMenu
                            isAuthenticated={isAuthenticated}
                            user={user}
                        />

                        {!isAuthenticated ? (
                            <AuthButtons />
                        ) : (
                            <UserDropdown user={user} logout={logout} />
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;