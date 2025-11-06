import React from 'react';
import AuthPage from "../../components/common/auth/AuthPage.jsx";
import {SIGNUP_FIELDS} from "../../constants/authForms.js";
import {useAuthForm} from "../../hooks/index.js";

const SignUpPage = () => {
    const { formData, handleInputChange } = useAuthForm({
        username: '',
        email: '',
        password: '',
    })

    const handleSubmit = () => {}

    return (
        <AuthPage
            title="Регистрация"
            fieldsConfig={SIGNUP_FIELDS}
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            submitText="Зарегистрироваться"
            linkPath="/signin"
            linkText="Есть аккаунт?"
        />
    );
};

export default SignUpPage;