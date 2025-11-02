import React from 'react';
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm.jsx";

const AuthPage = ({
                      title,
                      fieldsConfig,
                      formData,
                      onInputChange,
                      onSubmit,
                      submitText,
                      linkPath,
                      linkText,
                      errorMessage,
                      disabled = false
                  }) => {
    return (
        <div className="container">
            <div className="row justify-content-center min-vh-100 align-items-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h2 className="card-title text-center mb-4">{title}</h2>
                            <AuthForm
                                fieldsConfig={fieldsConfig}
                                formData={formData}
                                onInputChange={onInputChange}
                                onSubmit={onSubmit}
                                submitText={submitText}
                                errorMessage={errorMessage}
                                disabled={disabled}
                            />

                            <div className="text-center">
                                <Link to={linkPath} className="text-decoration-none text-secondary">
                                    {linkText}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;