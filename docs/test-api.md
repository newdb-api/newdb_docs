---
title: "Тестовый контур NewDB API (Sandbox / Test Environment)"
description: "Изолированный тестовый контур NewDB API по адресу https://api.newdb.net/test/v2/ для отладки интеграции по POST и GET запросам с синтетическими данными."
canonical_url: https://newdb.net/docs/test-api/
---

# Тестовый контур NewDB API (Sandbox)

Для быстрой и безопасной отладки интеграции ваших систем с NewDB API развернут изолированный тестовый контур (песочница / sandbox).

- **Базовый URL тестового контура:**
  - `https://api.newdb.net/test/v2/`
  - `http://api.newdb.net/test/v2/`

---

## Ключевые особенности тестового контура

1. **Бесплатность и отсутствие списаний:**
   Тестовые запросы **не списывают баланс** с вашего аккаунта. В ответе всегда возвращается тестовый баланс (`999999`).
2. **Мгновенный результат (Zero-Latency):**
   Запросы не отправляются в очереди распределенной обработки и не обращаются к внешним государственным реестрам. Статус `state: complete` и полные результаты отдаются сразу (< 5 мс).
3. **Эталонные синтетические данные:**
   Каждый метод NewDB возвращает максимально полный JSON-ответ со всеми полями, вложенными объектами и AI-интерпретациями (`ai_interpretation`), строго соответствующими спецификации OpenAPI 3.1.
4. **Гибкая авторизация:**
   Тестировать можно даже до получения боевого API-ключа. Если заголовок `X-API-KEY` не передан, контур использует тестовый токен по умолчанию `test_token_newdb_sandbox`.
5. **Поддержка GET и POST:**
   Поддерживаются как асинхронные POST-запросы, так и синхронные GET-вызовы, вебхуки, проверка баланса и скриншоты.

---

## Поддерживаемые эндпоинты

| Эндпоинт | Метод | Описание |
| :--- | :--- | :--- |
| `/test/v2` | `POST` | Асинхронная отправка запроса (метод передается в теле JSON). |
| `/test/v2/{method}` | `POST` | Отправка запроса с указанием метода в URL. |
| `/test/v2/run?method={method}&...` | `GET` | Синхронный вызов любого метода через GET-запрос. |
| `/test/v2/{method}?param=...` | `GET` | Прямой GET-вызов конкретного метода с параметрами в query string. |
| `/test/v2/balance` | `GET` | Проверка баланса (возвращает тестовые 999 999 запросов). |
| `/test/v2/screen` | `GET` | Получение тестового скриншота (возвращает валидный PNG-файл). |
| `/test/v2/data?requestId={id}` | `GET` | Получение сохраненного результата по `requestId`. |

---

## Примеры запросов через cURL

### 1. Асинхронный POST-запрос (`POST /test/v2`)
```bash
curl -X POST https://api.newdb.net/test/v2 \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: test_token" \
  -d '{
    "method": "passport_mvd",
    "params": {
      "seria": "4510",
      "number": "123456",
      "firstname": "Иван",
      "lastname": "Иванов"
    }
  }'
```

**Пример ответа:**
```json
{
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "state": "complete",
  "method": "passport_mvd",
  "datecreated": "2026-09-08 22:00:00",
  "cost": 1,
  "balance": 999999,
  "tasks": 1,
  "taskId": "7b8c0e12-4f3b-4b67-9c1f-2e5a7d9b8c10",
  "is_repeat": false,
  "is_test": true,
  "params": {
    "method": "passport_mvd",
    "seria": "4510",
    "number": "123456",
    "firstname": "Иван",
    "lastname": "Иванов",
    "country": "ru"
  },
  "results": {
    "passport_mvd": {
      "taskId": "7b8c0e12-4f3b-4b67-9c1f-2e5a7d9b8c10",
      "dateupdated": "2026-09-08 22:00:00",
      "result": {
        "status": 200,
        "data": {
          "status": "VALID",
          "description": "Среди недействительных не значится",
          "seria": "4510",
          "number": "123456",
          "check_date": "2026-09-08"
        },
        "ai_interpretation": {
          "status": "success",
          "risk_level": "low",
          "summary": "Паспорт действителен по учетным данным МВД РФ. Признаков утраты или недействительности не обнаружено.",
          "confidence": 1.0
        }
      }
    }
  }
}
```

---

### 2. Синхронный GET-запрос (`GET /test/v2/run`)
```bash
curl -X GET "https://api.newdb.net/test/v2/run?method=egrul&inn=7707083893" \
  -H "X-API-KEY: test_token"
```

---

### 3. Проверка баланса (`GET /test/v2/balance`)
```bash
curl -X GET https://api.newdb.net/test/v2/balance \
  -H "X-API-KEY: test_token"
```

**Ответ:**
```json
{
  "token": "test_token",
  "balance": 999999,
  "overdraft": 0,
  "allow_overdraft": false,
  "is_test": true
}
```

---

### 4. Комплексная проверка (`complex_by_passport` / `complex_by_inn`)
При вызове комплексных методов тестовый контур возвращает полный агрегированный результат со всеми подметодами:

```bash
curl -X POST https://api.newdb.net/test/v2/complex_by_passport \
  -H "Content-Type: application/json" \
  -d '{
    "seria": "4510",
    "number": "123456",
    "firstname": "Иван",
    "lastname": "Иванов",
    "regioncode": "77"
  }'
```
В поле `results` будут сразу доступны результаты по всем 16 подметодам: `passport_mvd`, `passport_fns`, `fssp_person`, `bankrot_person`, `arbitr_person`, `pravo_search`, `fns_block_person`, `terrorist`, `mvd_wanted`, `inoagent`, `pledge_person`, `egrul_ip`, `self_employed`, `fns_mass_founders`, `fns_mass_leaders` и `intellectual_property`.

---

## Использование в официальных SDK

Во всех официальных библиотеках NewDB предусмотрен встроенный переключатель в тестовый режим.

### Python SDK (`newdb`)

```python
from newdb import NewDBClient

# 1. Через флаг test_mode=True
client = NewDBClient(test_mode=True)

# 2. Либо через переменную окружения:
# export NEWDB_TEST_MODE=1
# client = NewDBClient()

# Вызов метода — результат готов мгновенно
passport = client.person.check_passport_mvd(
    seria="4510",
    number="123456",
    firstname="Иван",
    lastname="Иванов"
)
print(passport.results)
```

---

### TypeScript / Node.js SDK (`@newdb/sdk`)

```typescript
import { NewDBClient } from '@newdb/sdk';

// 1. Через параметр testMode: true
const client = new NewDBClient({ testMode: true });

// 2. Либо через переменную окружения:
// process.env.NEWDB_TEST_MODE = '1';
// const client = new NewDBClient();

async function run() {
  const result = await client.person.checkPassportMvd({
    seria: '4510',
    number: '123456',
    firstname: 'Иван',
    lastname: 'Иванов',
  });
  console.log(result.results);
}
run();
```

---

### PHP SDK (`newdb/sdk`)

```php
<?php

require_once __DIR__ . '/vendor/autoload.php';

use NewDB\Client;

// 1. Через параметр testMode: true
$client = new Client(testMode: true);

// 2. Либо через переменную окружения:
// putenv('NEWDB_TEST_MODE=1');
// $client = new Client();

$result = $client->checkPassportMvd('4510', '123456', 'Иван', 'Иванов');
print_r($result);
```
