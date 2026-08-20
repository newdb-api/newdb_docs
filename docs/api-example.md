---
title: "Примеры вызова API"
description: "Синхронный и асинхронный варианты вызова API, получение результата по requestId и работа с webhook."
---

# Примеры вызова API

Ниже приведены три типовых сценария интеграции: синхронный вызов, асинхронный вызов с polling по `requestId` и асинхронный вызов с `webhook`.

## Когда использовать

Используйте эту страницу, когда нужно быстро выбрать режим интеграции с API NEWDB и понять, как получать результат по `requestId`.

## Типовые кейсы

- Подготовка первой интеграции с API NEWDB
- Выбор между синхронным ожиданием результата и асинхронной обработкой
- Настройка callback-уведомлений через `webhook`
- Проверка формата запросов, токена и структуры ответа API

## Общая логика

1. Клиент отправляет запрос в NEWDB и передаёт параметры проверки в объекте `params`.
2. NEWDB создаёт задачу и связывает её с `requestId`.
3. Если результат уже готов, API возвращает состояние `complete` и объект `results`.
4. Если обработка ещё идёт, клиент получает промежуточное состояние и может повторно запросить результат по тому же `requestId`.
5. Если в запросе передан `webhook`, NEWDB дополнительно отправляет HTTP-уведомление на указанный URL после обновления состояния запроса.

`requestId` рекомендуется формировать на стороне клиента в формате UUIDv4. Повторный запрос с тем же `requestId` не создаёт новую проверку: API вернёт уже сохранённый результат или текущее состояние ранее созданной задачи.

## Синхронный метод (run)

Синхронный режим ставит задачу в очередь и удерживает соединение до получения результата или таймаута. Максимальное время ожидания — 3600 секунд. Если `requestId` не передан, он будет создан автоматически. Если `requestId` уже существует, API вернёт ранее сохранённый результат.

**Пример GET-запроса**

```http
GET https://api.newdb.net/v2/run?method=passport_mvd&seria=4115&number=350298&firstname=Александр&lastname=Сидоров&country=ru&token=<your_token>&requestId=<uuid4>
```

**Пример `curl`**

```bash
curl --get 'https://api.newdb.net/v2/run' \
  --data-urlencode 'method=passport_mvd' \
  --data-urlencode 'seria=4115' \
  --data-urlencode 'number=350298' \
  --data-urlencode 'firstname=Александр' \
  --data-urlencode 'lastname=Сидоров' \
  --data-urlencode 'country=ru' \
  --data-urlencode 'token=<your_token>' \
  --data-urlencode 'requestId=b4c61a6b-34cc-430e-bbeb-a6518014bca4'
```

**Успешный ответ (пример)**

```json
{
  "requestId": "b4c61a6b-34cc-430e-bbeb-a6518014bca4",
  "state": "complete",
  "results": {
    "passport_mvd": {
      "result": {
        "status": 200,
        "data": [
          {
            "doc_status": "Данные не найдены"
          }
        ]
      }
    }
  }
}
```

**Ответ по таймауту**

```json
{
  "requestId": "b4c61a6b-34cc-430e-bbeb-a6518014bca4",
  "state": "timeout",
  "error": "Task execution timeout"
}
```

## Асинхронный метод

Асинхронный режим используется, когда клиент не должен держать HTTP-соединение открытым до завершения проверки. Он состоит из двух шагов: отправка запроса и последующее получение результата по `requestId`.

**Шаг 1. Отправка запроса**

Отправьте POST на `https://api.newdb.net/v2` и передайте токен в заголовке `X-API-KEY`.

```bash
curl -X POST 'https://api.newdb.net/v2' \
  -H 'Content-Type: application/json' \
  -H 'X-API-KEY: <your_token>' \
  -d '{
    "params": {
      "seria": "4115",
      "number": "350298",
      "method": "passport_mvd",
      "firstname": "Александр",
      "lastname": "Сидоров",
      "country": "ru"
    },
    "requestId": "b4c61a6b-34cc-430e-bbeb-a6518014bca4"
  }'
```

Тело запроса:

```json
{
  "params": {
    "seria": "4115",
    "number": "350298",
    "method": "passport_mvd",
    "firstname": "Александр",
    "lastname": "Сидоров",
    "country": "ru"
  },
  "requestId": "b4c61a6b-34cc-430e-bbeb-a6518014bca4"
}
```

**Шаг 2. Получение результата через polling**

```http
POST https://api.newdb.net/v2
```

Отправьте повторный POST-запрос с тем же `requestId`. Параметры проверки можно оставить теми же: NEWDB найдёт существующую задачу по `requestId` и вернёт её текущее состояние.

Или получить результат через отдельный GET-метод по `requestId`:

```http
GET https://api.newdb.net/v2/data?requestId=b4c61a6b-34cc-430e-bbeb-a6518014bca4&token=<your_token>
```

Где:
- `requestId` — идентификатор ранее отправленного запроса
- `token` — API-токен

**Пример `curl` для получения результата**

```bash
curl --get 'https://api.newdb.net/v2/data' \
  --data-urlencode 'requestId=b4c61a6b-34cc-430e-bbeb-a6518014bca4' \
  --data-urlencode 'token=<your_token>'
```

**Пример ответа**

```json
{
  "params": {
    "seria": "4115",
    "number": "350298",
    "method": "passport_mvd",
    "firstname": "Александр",
    "lastname": "Сидоров",
    "country": "ru",
    "newdb_qid": "EL4VILiX9MW7MygB"
  },
  "requestId": "b4c61a6b-34cc-430e-bbeb-a6518014bca4",
  "datecreated": "2026-01-13 22:02:33",
  "state": "complete",
  "balance": 9884,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "passport_mvd": {
      "taskId": "f7bb40dd-703c-40c6-8c9b-2a0d4306f90b",
      "dateupdated": "2026-01-13 22:03:19",
      "result": {
        "status": 200,
        "data": [
          {
            "doc_status": "Данные не найдены"
          }
        ]
      }
    }
  }
}
```

## Асинхронный метод с webhook

`webhook` нужен, чтобы NEWDB сам уведомил вашу систему об изменении состояния запроса. Это удобнее polling, если проверка может занимать заметное время или если нужно обрабатывать результат в фоновом процессе.

### Как это работает

1. В запросе на `POST https://api.newdb.net/v2` передайте поле `webhook` на верхнем уровне JSON.
2. NEWDB примет задачу и вернёт `requestId` и текущее состояние.
3. Когда состояние запроса обновится, NEWDB отправит HTTP POST на указанный `webhook` URL.
4. Ваш обработчик принимает уведомление, сохраняет `requestId` и результат.
5. Если уведомление не дошло или обработчик временно недоступен, результат можно получить обычным polling-запросом по `requestId`.

### Требования к webhook URL

- Используйте публично доступный HTTPS URL.
- Обработчик должен принимать `POST` с JSON-телом.
- Возвращайте HTTP `2xx`, когда уведомление успешно принято.
- Обрабатывайте повторные уведомления идемпотентно: ключом должен быть `requestId`.
- Не запускайте новую проверку из webhook-обработчика, если уведомление относится к уже известному `requestId`.

### Пример запроса с webhook

```bash
curl -X POST 'https://api.newdb.net/v2' \
  -H 'Content-Type: application/json' \
  -H 'X-API-KEY: <your_token>' \
  -d '{
    "params": {
      "seria": "4115",
      "number": "350298",
      "method": "passport_mvd",
      "firstname": "Александр",
      "lastname": "Сидоров",
      "country": "ru"
    },
    "requestId": "b4c61a6b-34cc-430e-bbeb-a6518014bca4",
    "webhook": "https://example.com/newdb/webhook"
  }'
```

Тело запроса:

```json
{
  "params": {
    "seria": "4115",
    "number": "350298",
    "method": "passport_mvd",
    "firstname": "Александр",
    "lastname": "Сидоров",
    "country": "ru"
  },
  "requestId": "b4c61a6b-34cc-430e-bbeb-a6518014bca4",
  "webhook": "https://example.com/newdb/webhook"
}
```

### Что должен сделать webhook-обработчик

Минимальная логика на стороне клиента:

1. Принять POST-запрос от NEWDB.
2. Прочитать JSON-тело.
3. Найти `requestId`.
4. Проверить поле `state`.
5. Если `state = complete`, сохранить `results`.
6. Вернуть HTTP `200` или другой `2xx` статус.

Пример псевдокода:

```text
on POST /newdb/webhook:
  payload = parse_json(request.body)
  request_id = payload.requestId

  if payload.state == "complete":
    save_result(request_id, payload.results)
  else:
    save_state(request_id, payload.state)

  return 200
```

Формат уведомления соответствует обычному ответу API по `requestId`: в нём используются те же поля `requestId`, `state`, `params`, `results`, `tasks`, `balance` и служебные даты, если они доступны для конкретного запроса.

### Когда выбирать webhook

Используйте `webhook`, если результат не нужен прямо в пользовательском HTTP-запросе, проверка запускается из очереди или CRM/скоринга, а ваша система готова принимать входящие callback-запросы. Если входящие запросы принять нельзя, используйте асинхронный режим с polling по `requestId`.

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "run | async | async_with_webhook",
  "intent": "Быстрый старт по синхронному и асинхронному вызову API NEWDB, polling и webhook",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["method", "country"],
  "optional_fields": ["requestId", "webhook"],
  "returns": ["state", "results.<method>.result.status", "results.<method>.result.data"]
}
```

</details>
