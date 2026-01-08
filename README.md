# Этап 2, Express

Поднятие сервера Express выглядит так

```ts
import express from 'express';

const app = express();

const port = 8000;

app.listen(port, () => {
  //Этот коллбек сработает когда сервер будет запущен
  console.log(`Server is running on http://localhost:${port}`);
});
```

## Роуты

Можно объявлять роуты по одному

```ts
app.get('/api/task');
app.get('/api/user');
app.get('/api/article');
```

Или можно объявлять группы роутов для большей организации. Результат аналогичен тому, что выше. Обратите внимание что они все будут начинаться с `/api`

```ts
import { Router } from 'express';

//Создаем роутер
const router = Router();

//Прописываем пути
router.get('/task');
router.get('/user');
router.get('/article');

//Применяем к приложению
app.use('/api', router);
```

## Методы

```ts
app.get('/api/task');
app.post('/api/task');
app.patch('/api/task');
app.delete('/api/task');
```

## Обработчики

```ts
app.get('/api/get', (req: Request, res: Response, next: NextFunction) => {
  //Можем выставить статус ответа
  res.status(200);

  //Можем записать данные в ответ
  res.send('Response text');

  //Не обязательно, но желательно
  return;
});
```

## Цепь обработчиков

Обработчики можно объединять в цепочки произвольной длинны

```ts
app.get('/api/get', firstHandler, secondHandler, thirdHandler);
```

Каждый обработчик в цепочке должен вызвать next(), чтобы начал работать следующий обработчик, иначе цепочка прервется.

```ts
app.get(
  '/api/get',
  (req: Request, res: Response, next: NextFunction) => {
    console.log('Код который выполнится до следующего обработчика');

    //Вызов следующего обработчика
    next();

    console.log('Код который выполнится после следующего обработчика');
    return;
  },
  anotherHandler,
);
```
