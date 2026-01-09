# Используем официальный образ Node.js LTS
FROM node:24-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./
COPY yarn.lock ./

# Устанавливаем зависимости
RUN yarn

# Копируем конфиг Prisma
COPY prisma ./prisma/

# Генерируем клиент Prisma
RUN yarn prisma:generate

# Копируем весь исходный код
COPY . .


# Открываем порт, на котором будет работать Express сервер и Prisma Studio
EXPOSE 3000
EXPOSE 5555

# Команда запуска (будет переопределена в docker-compose для разработки)
CMD ["yarn", "dev"]