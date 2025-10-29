// components/common/AuthPage.jsx
import React from 'react';
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm.jsx";

const AuthPage = ({
                      title,
                      fieldsConfig,
                      formData,
                      handleInputChange,
                      onSubmit,
                      submitText,
                      linkPath,
                      linkText
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
                                onInputChange={handleInputChange}
                                onSubmit={onSubmit}
                                submitText={submitText}
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