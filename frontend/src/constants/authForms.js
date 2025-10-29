// constants/authForms.js
export const SIGNUP_FIELDS = [
    {
        name: 'username',
        label: 'Имя пользователя',
        type: 'text',
        placeholder: 'Введите имя пользователя',
        required: true
    },
    {
        name: 'email',
        label: 'Почта',
        type: 'email',
        placeholder: 'Введите почту',
        required: true
    },
    {
        name: 'password',
        label: 'Пароль',
        type: 'password',
        placeholder: 'Введите пароль',
        required: true
    }
];

export const SIGNIN_FIELDS = [
    {
        name: 'username',
        label: 'Имя пользователя',
        type: 'text',
        placeholder: 'Введите имя пользователя',
        required: true
    },
    {
        name: 'password',
        label: 'Пароль',
        type: 'password',
        placeholder: 'Введите пароль',
        required: true
    }
];