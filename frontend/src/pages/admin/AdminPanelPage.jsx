import React, {useState} from 'react';
import Form from "../../components/common/Form.jsx";


// TODO: Отрефакторить, сделать декомпозицию

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
        setDisabled(true);

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
            const newResourceUri = response.headers.get('Location'); // TODO: придумать для чего можно использовать
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
            setDisabled(false);
        }
    };

    return (
        <div className="container mt-5">
            <Form
                fieldsConfig={fieldsConfig}       // Конфигурация полей
                formData={formData}               // Текущие данные формы
                onInputChange={handleInputChange} // Функция обновления состояния
                onSubmit={handleSubmit}           // Функция обработки отправки
                submitText={loading ? "Идет отправление..." : "Отправить"}              // Текст на кнопке отправки (опционально)
                errorMessage={errorMessage}       // Сообщение об ошибке (опционально)
                disabled={disabled}               // Отключить форму/кнопку (опционально)
                success={success}                 // Текст при удачной отправление формы
            />
        </div>
    );
};

export default AdminPanelPage;