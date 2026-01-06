# Используем официальный образ Node.js LTS
FROM node:24-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./
COPY yarn.lock ./

# Устанавливаем зависимости
RUN yarn

# Копируем весь исходный код
COPY . .

# Устанавливаем Prisma CLI глобально (опционально, но удобно)
RUN yarn global add prisma

# Открываем порт, на котором будет работать Express сервер и Prisma Studio
EXPOSE 3000
EXPOSE 5555

# Команда запуска (будет переопределена в docker-compose для разработки)
CMD ["yarn", "start"]