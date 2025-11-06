import { useState } from 'react';

const useAuthForm = (initialFields) => {
    const [formData, setFormData] = useState(initialFields);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return {
        formData,
        handleInputChange,
        setFormData
    };
};

export default useAuthForm;