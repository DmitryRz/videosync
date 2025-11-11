import React, {useState} from 'react';
import Form from "../../components/common/Form.jsx";

const AdminPanelPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        video: null,
        preview: null,
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const fieldsConfig = [
        {
            name: 'title',
            label: 'Название видео',
            type: 'text',
            placeholder: 'Введите название видео',
            required: false,
        },
        {
            name: 'description',
            label: 'Описание видео',
            type: 'text',
            placeholder: 'Описание',
            required: false,
        },
        {
            name: 'video',
            label: "Видео",
            type: 'file',
            required: false,
            accept: 'video/mp4',
        },
        {
            name: 'preview',
            label: 'Превью',
            type: 'file',
            required: false,
            accept: 'image/*',
        }
    ];

    const handleInputChange = (fieldName, value) => {
        setFormData(prevData => {
            return {
                ...prevData,
                [fieldName]: value,
            };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccess('');
        setLoading(true);

        try {
            const data = new FormData();


            const metadata = {
                title: formData.title,
                description: formData.description,
            }

            data.append(
                'metadata',
                new Blob([JSON.stringify(metadata)], {type: 'application/json'})
            )

            if (formData.video && formData.preview) {
                data.append('file', formData.video);
                data.append('preview', formData.preview);
            } else {
                throw new Error('Пожалуйста, выберите файлы для загрузки.');
            }

            const response = await fetch(import.meta.env.VITE_API_URL + "/api/videos", {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                }
            })

            if (!response.ok) {
                let errorText = 'Ошибка при загрузке. Попробуйте позже.';
                try {
                    const errorData = await response.json();
                    errorText = errorData.message || errorData.error || `Ошибка: статус ${response.status}.`;
                } catch (e) {
                    errorText = `Ошибка на сервере: статус ${response.status}.`;
                }
                throw new Error(errorText);
            }

            const responseData = await response.json();
            console.log(response.headers)
            console.log('Успешный ответ:', responseData);
            const newResourceUri = response.headers.get('Location');
            console.log(newResourceUri);
            setSuccess(`Видео "${responseData.title}" загружено. ID: ${responseData.id}`);

        } catch (e) {
            setErrorMessage(e.message);
        } finally {
            setFormData({
                title: '',
                description: '',
                video: null,
                preview: null,
            })
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div
                    className="spinner-border text-primary"
                    role="status"
                    style={{ width: '3rem', height: '3rem' }}
                >
                    <span className="visually-hidden">Загрузка...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <Form
                fieldsConfig={fieldsConfig}       // Конфигурация полей
                formData={formData}               // Текущие данные формы
                onInputChange={handleInputChange} // Функция обновления состояния
                onSubmit={handleSubmit}           // Функция обработки отправки
                submitText="Отправить"                // Текст на кнопке отправки (опционально)
                errorMessage={errorMessage}       // Сообщение об ошибке (опционально)
                disabled={disabled}               // Отключить форму/кнопку (опционально)
                success={success}
            />
        </div>
    );
};

export default AdminPanelPage;