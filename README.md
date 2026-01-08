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

app.use('/api/task'); // use будет перехватывать все запросы независимо от метода
```

## Обработчики

```ts
app.get('/api/get', (req: Request, res: Response, next: NextFunction) => {
  //Можем выставить статус ответа
  res.status(200);

  //Можем записать данные в ответ
  res.send('Response text');

  // Альтернативно можно использовать res.json() для JSON
  res.json({ message: 'Hello' });

  // Кроме того, res.send() умеет сам определять тип сообщения
  res.send({ message: 'Hello' }); // Отправит как JSON
  res.send('<h1>Hello</h1>'); // Отправит как HTML

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

    //Вызов следующего обработчика (anotherHandler)
    next();

    console.log('Код который выполнится после следующего обработчика');
    return;
  },
  anotherHandler,
);
```

Все обработчики делят между собой одни и те же объекты res и req, так что данные между обработчиками можно передавать путем путирования этих объектов

> **Важно!** После того, как была вызвана функция next(), менять тело ответа или заголовки больше нельзя! После вызова next, express уже начнет отправку данных на клиент!

## Middleware

Middleware это точно такие же обработчики, как и любые другие. И подключаются они точно так же.

Например, встроенный middleware `express.json()` автоматически парсит body, если
Content-Type выставлен в application/json

Его можно повесить как на

```ts
app.get('/api/get', express.json(), (req: Request, res: Response) => {
  console.log(req.body);

  res.json();

  return;
});
```

Таким же образом мы можем повесить middleware на весь набор роутов

```ts
const router = Router();

router.use(express.json());
```

Или вообще на все приложение целиком

```ts
const app = express();

app.use(express.json());
```
