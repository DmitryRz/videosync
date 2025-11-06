import React from 'react';

const HeaderLoading = () => {
    return (
        <header className="border-bottom">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <div className="navbar-brand fw-bold fs-3">
                        <span className="d-inline-block">
                            {['V','i','d','e','o'].map((letter, index) => (
                                <span
                                    key={index}
                                    className="text-primary bounce-letter"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {letter}
                                </span>
                            ))}
                        </span>
                        <span className="d-inline-block">
                            {['s','y','n','c'].map((letter, index) => (
                                <span
                                    key={index}
                                    className="bounce-letter"
                                    style={{ animationDelay: `${(index + 5) * 0.1}s` }}
                                >
                                    {letter}
                                </span>
                            ))}
                        </span>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default HeaderLoading;