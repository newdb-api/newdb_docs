---
title: "ods_case_search — поиск судебных дел"
description: "Метод ods_case_search ищет судебные дела в ODS по номеру дела, участникам, судье, категории, тексту дела и судебным актам."
canonical_url: https://newdb.net/docs/legal/06-ods_case_search/
meta:
  - name: keywords
    content: "NEWDB API, ods_case_search, судебные дела, поиск дел, пагинация, page, offset"
  - property: og:title
    content: "Поиск судебных дел — метод ods_case_search"
  - property: og:description
    content: "Поиск судебных дел через API NEWDB с поддержкой пагинации page/page_size и offset в meta."
---

# ods_case_search — поиск судебных дел

POST `https://api.newdb.net/v2`

Метод ищет дела в `ods.cases` по номеру дела, участникам, судье, категории, тексту дела и судебным актам.

---

## Входная схема (request)

```json
{
  "params": {
    "method": "ods_case_search",
    "q": "string",
    "page": "int, optional, default 1",
    "page_size": "int, optional, default 20"
  },
  "webhook": "https://your.host/webhook",
  "requestId": "optional-string"
}
```

---

## Пагинация

| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `page` | int | `1` | Номер страницы. Также поддерживаются `page_number` и `pageNumber`. |
| `page_size` | int | `20` | Количество дел на странице. Также поддерживаются `pageSize` и `limit`. Максимум `1000`. |

`offset` передавать не нужно: он рассчитывается автоматически по формуле:

```text
offset = (page - 1) * page_size
```

В ответе в `result.meta` возвращаются `page`, `page_size` и рассчитанный `offset`.

---

## Пример запроса

```json
POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_TOKEN

{
  "params": {
    "method": "ods_case_search",
    "q": "Иванов",
    "page": 2,
    "page_size": 20
  },
  "requestId": "case-search-page-2"
}
```

Для примера выше метод вернет вторую страницу результатов: до `20` дел, начиная с `offset = 20`.

---

## Фрагмент ответа

```json
{
  "results": {
    "ods_case_search": {
      "result": {
        "status": 200,
        "data": [],
        "meta": {
          "search_text": "Иванов",
          "page": 2,
          "page_size": 20,
          "offset": 20,
          "count": 20
        }
      }
    }
  }
}
```
