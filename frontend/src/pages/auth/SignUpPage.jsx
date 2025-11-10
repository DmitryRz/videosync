import {AuthContext} from "../../context/AuthContext.js";
import {useNavigate} from "react-router-dom";
import {useAuth, useAuthForm, useSubmit} from "../../hooks/index.js";
import {decodeJWT} from "../../utils/index.js";
import {SIGNUP_FIELDS} from "../../constants/authForms.js";
import AuthPage from "../../components/common/auth/AuthPage.jsx";

const SignUpPage = () => {
    const { login } = useAuth(AuthContext);
    const navigate = useNavigate();

    const {formData, handleInputChange} = useAuthForm({
        username: '',
        password: ''
    });

    const { loading, error, signUp, resetError } = useSubmit();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await signUp(formData);
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
            title="Регистрация"
            fieldsConfig={SIGNUP_FIELDS}
            formData={formData}
            onInputChange={handleInputChangeWithErrorReset}
            onSubmit={handleSubmit}
            submitText={loading ? "Регистрация..." : "Зарегистрироваться"}
            linkPath="/signin"
            linkText="Есть аккаунт?"
            errorMessage={error}
            disabled={loading}
        />
    );
};

export default SignUpPage;