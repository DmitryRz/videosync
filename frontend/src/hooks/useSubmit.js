import { useState } from 'react';

const useSubmit = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const signIn = async (formData) => {
        return await submitRequest('/api/auth/signin', formData);
    };

    const signUp = async (formData) => {
        return await submitRequest('/api/auth/signup', formData);
    };

    const submitRequest = async (endpoint, formData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(import.meta.env.VITE_API_URL + endpoint, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                return { success: true, data };
            } else {
                const errorMessage = await getErrorMessage(response);
                setError(errorMessage);
                return { success: false, error: errorMessage };
            }
        } catch {
            const errorMessage = 'Ошибка соединения с сервером';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const getErrorMessage = async (response) => {
        try {
            const errorData = await response.json();
            return errorData.message || `Ошибка в try: ${response.status}`;
        } catch {
            if (response.status === 403) {
                return `Неправильный пароль или логин`
            }
            return `Неизвестная ошибка`;
        }
    };

    const resetError = () => setError(null);

    return {
        loading,
        error,
        signIn,
        signUp,
        resetError,
    };
};

export default useSubmit;