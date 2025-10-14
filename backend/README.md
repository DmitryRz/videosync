# videos

## Стек:
Java 21, React, PostgreSQL 15, Docker

## Зависимости Java:
Spring Boot, Spring Security, Spring Data JPA, Spring WebSocket, Validation, Lombok, jjwt, Postgres Driver

## Эндпоинты:


### Авторизация и аутентификация
| Метод | Путь | Описание |
|-------|------|----------|
| POST | `/api/auth/signin` | Вход в систему |
| POST | `/api/auth/signup` | Регистрация |
| POST | `/api/auth/refresh` | Обновление токена |
| GET | `/api/auth/me` | Получить текущего пользователя |

### Видео
| Метод | Путь | Описание |
|-------|------|----------|
| POST | `/api/videos` | Загрузить видео |
| GET | `/api/videos` | Получить список видео |
| GET | `/api/videos/{id}` | Получить видео по ID |
| GET | `/api/videos/{id}/stream` | Получить видео-поток |

### Комментарии
| Метод | Путь | Описание |
|-------|------|----------|
| POST | `/api/videos/{id}/comments` | Добавить комментарий к видео |
| GET | `/api/videos/{id}/comments` | Получить комментарии видео |
| PUT | `/api/comments/{id}` | Обновить комментарий |
| DELETE | `/api/comments/{id}` | Удалить комментарий |

### Оценки
| Метод | Путь | Описание |
|-------|------|----------|
| POST | `/api/videos/{id}/ratings` | Добавить оценку видео |
| GET | `/api/videos/{id}/ratings` | Получить оценки видео |
| PUT | `/api/videos/{id}/ratings` | Обновить оценку видео |
| DELETE | `/api/videos/{id}/ratings` | Удалить оценку видео |

### Комнаты
| Метод | Путь | Описание |
|-------|------|----------|
| POST | `/api/rooms` | Создать комнату |
| GET | `/api/rooms` | Получить список комнат |
| GET | `/api/rooms/{id}` | Получить комнату по ID |
| PUT | `/api/rooms/{id}` | Обновить комнату |
| DELETE | `/api/rooms/{id}` | Удалить комнату |

### Сообщения
| Метод | Путь | Описание |
|-------|------|----------|
| POST | `/api/rooms/{id}/messages` | Отправить сообщение в комнату |
| GET | `/api/rooms/{id}/messages` | Получить сообщения комнаты |
| PUT | `/api/message/{id}` | Обновить сообщение |
| DELETE | `/api/message/{id}` | Удалить сообщение |

## Сущности БД:
- Users
- Videos  
- Comments
- Ratings
- Rooms
- Messages

## Связи между Сущностями:
| Сущность 1 | Связь | Сущность 2 |
|------------|-------|------------|
| Users | 1:M | Videos |
| Users | 1:M | Comments |
| Users | 1:M | Ratings |
| Users | 1:M | Message |
| Videos | 1:M | Comments |
| Videos | 1:M | Ratings |
| Rooms | 1:1 | Videos |
| Rooms | 1:M | Messages |