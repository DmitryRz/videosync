import React from 'react';
import {useAuthForm} from "../../hooks/useAuthForm.js";
import {SIGNUP_FIELDS} from "../../constants/authForms.js";
import AuthPage from "../../components/common/auth/AuthPage.jsx";

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