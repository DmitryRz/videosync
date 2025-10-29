import React from 'react';

const AuthForm = ({
                      fieldsConfig,
                      formData,
                      onInputChange,
                      onSubmit,
                      submitText = "Отправить"
                  }) => {
    return (
        <form onSubmit={onSubmit}>
            {fieldsConfig.map(field => (
                <div key={field.name} className="mb-3">
                    <label htmlFor={field.name} className="form-label">
                        {field.label}
                    </label>
                    <input
                        type={field.type}
                        className="form-control border-secondary"
                        id={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ''}
                        onChange={(e) => onInputChange(field.name, e.target.value)}
                        required={field.required}
                    />
                </div>
            ))}

            <button type="submit" className="btn btn-primary indigo w-100 mb-3">
                {submitText}
            </button>
        </form>
    );
};

export default AuthForm;