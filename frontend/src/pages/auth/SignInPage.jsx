import React from 'react';
import {SIGNIN_FIELDS } from "../../constants/authForms.js";
import {useAuthForm} from "../../hooks/useAuthForm.js";
import AuthPage from "../../components/common/auth/AuthPage.jsx";

const SignInPage = () => {
    const {formData, handleInputChange} = useAuthForm({
        username: '',
        password: ''
    });

    const handleSubmit = () => {}

    return (
        <AuthPage
            title="Авторизация"
                fieldsConfig={SIGNIN_FIELDS}
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
            submitText="Войти"
            linkPath="/signup"
            linkText="Нет аккаунта?"
        />
    );
};

export default SignInPage;