import React from 'react';

const Form = ({
                      fieldsConfig,
                      formData,
                      onInputChange,
                      onSubmit,
                      submitText = "Отправить",
                      errorMessage,
                      disabled = false,
                      success = false,
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
                        {...(field.type !== 'file' && {
                            placeholder: field.placeholder,
                            value: formData[field.name] || '',
                        })}
                        onChange={(e) => {
                            if (field.type === 'file') {
                                onInputChange(field.name, e.target.files[0]);
                            } else {
                                onInputChange(field.name, e.target.value);
                            }
                        }}
                        required={field.required}
                        disabled={disabled}
                        accept={field.accept}
                    />
                </div>
            ))}

            {errorMessage && (
                <div className="alert alert-danger alert-dismissible fade show p-2" role="alert">
                    <div className="text-center">{errorMessage}</div>
                </div>
            )}
            {success && (
                <div className="alert alert-info alert-dismissible fade show p-2" role="alert">
                    <div className="text-center">{success}</div>
                </div>
            )}

            <button type="submit" className="btn btn-primary indigo w-100 mb-3" disabled={disabled}>
                {submitText}
            </button>
        </form>
    );
};

export default Form;