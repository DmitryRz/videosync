import React from 'react';
import AuthPage from "../../components/common/auth/AuthPage.jsx";
import {SIGNIN_FIELDS } from "../../constants/authForms.js";
import {decodeJWT} from "../../utils/index.js";
import {useAuth, useAuthForm, useSubmit} from "../../hooks/index.js";
import {AuthContext} from "../../context/AuthContext.js";
import {useNavigate} from "react-router-dom";


const SignInPage = () => {
    const { login } = useAuth(AuthContext);
    const navigate = useNavigate();

    const {formData, handleInputChange} = useAuthForm({
        username: '',
        password: ''
    });

    const { loading, error, signIn, resetError } = useSubmit();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await signIn(formData);
        if (result.success) {
            /** @type {{accessToken: string, refreshToken: string}} */
            const userData = decodeJWT(result.data.accessToken);
            login(result.data, userData);
            navigate('/dashboard');
        }
    }

    const handleInputChangeWithErrorReset = (fieldName, value) => {
        handleInputChange(fieldName, value);
        resetError();
    };

    return (
        <AuthPage
            title="Авторизация"
            fieldsConfig={SIGNIN_FIELDS}
            formData={formData}
            onInputChange={handleInputChangeWithErrorReset}
            onSubmit={handleSubmit}
            submitText={loading ? "Вход..." : "Войти"}
            linkPath="/signup"
            linkText="Нет аккаунта?"
            errorMessage={error}
            disabled={loading}
        />
    );
};

export default SignInPage;