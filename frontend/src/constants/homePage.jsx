const IconGroupView = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
);

const IconLiveChat = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

const IconEaseOfUse = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
);

export const FEATURES = [
    {
        id: 1,
        title: "Групповой просмотр",
        description: "Собирайтесь с друзьями и смотрите видео вместе, независимо от расстояния",
        svg: IconGroupView,
    },
    {
        id: 2,
        title: "Живой чат",
        description: "Обсуждайте происходящее на экране в реальном времени через встроенный чат",
        svg: IconLiveChat,
    },
    {
        id: 3,
        title: "Простота использования",
        description: "Создавайте комнаты за пару кликов и делитесь ссылкой с друзьями",
        svg: IconEaseOfUse,
    },
];