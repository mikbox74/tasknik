# Technical Context

## Development Environment
- Node.js 14.17.6
- Docker для разработки
- Порт 3000 для локальной разработки

## Core Technologies
- React 16
- Create React App как основа проекта
- SCSS для стилизации
- localStorage API для хранения данных

## Project Dependencies
Основные зависимости из package.json:
- react
- react-dom
- node-sass для SCSS
- react-scripts

## Development Tools
- Docker контейнер tasknik-dev
- GitHub для версионного контроля
- GitHub Pages для публикации

## Browser APIs
- localStorage для хранения данных
- setInterval для таймеров
- File API для импорта/экспорта

## Build & Deployment
- Сборка через react-scripts build
- Деплой на GitHub Pages
- Докеризированная среда разработки

## Code Organization
```
/src
  /Helpers     - Вспомогательные функции
  /images      - Статические изображения
  /Modal       - Компонент модального окна
  /Project     - Компоненты проектов
  /Todo        - Компоненты задач
  /TotalTimer  - Компонент общего таймера
  App.js       - Основной компонент
  App.scss     - Основные стили
```

## Security Considerations
- Не используются внешние API
- Все данные хранятся локально
- Нет обработки конфиденциальных данных
