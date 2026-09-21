---
title: "foreign_rvp_blank — проверка РВП (бланк)"
description: "Метод NEWDB foreign_rvp_blank для проверки разрешения на временное проживание (бланк) иностранного гражданина."
canonical_url: https://newdb.net/docs/foreign/04-foreign_rvp_blank/
meta:
  - name: keywords
    content: "NEWDB API, foreign_rvp_blank, РВП, бланк, иностранные граждане"
  - property: og:title
    content: "Проверка РВП (бланк) — метод foreign_rvp_blank"
  - property: og:description
    content: "Описание запроса, схемы и ответа метода foreign_rvp_blank для проверки РВП."
---

# foreign_rvp_blank — РВП (бланк)

POST `https://api.newdb.net/v2`

Метод выполняет проверку разрешения на временное проживание (бланк) иностранного гражданина по данным документа и ФИО.

**Раздел:** [Иностранные граждане](index.md)

## Связанные страницы

- [Обзор раздела иностранные граждане](index.md)
- [foreign_rvp_stamp — РВП (штамп в паспорте)](03-foreign_rvp_stamp.md)
- [foreign_rnr — Разрешение на работу (РНР)](05-foreign_rnr.md)
- [foreign_patent — Патент](02-foreign_patent.md)

## Когда использовать

Используйте метод, когда нужно проверить статус документа или разрешительного основания иностранного гражданина.

## Типовые кейсы

- Проверка ВНЖ, патента, РВП или разрешения на работу перед оформлением
- Контроль миграционных документов в HR или compliance-процессе
- Подтверждение статуса документа по данным анкеты и реквизитам

## Заголовки
```
Content-Type: application/json
X-API-KEY: <your_token>
```

## Входная схема (request)
```json
{
  "params": {
    "method": "foreign_rvp_blank",
    "doctype": "rvp_blank",
    "firstname": "string",
    "lastname": "string",
    "secondname": "string",
    "doc_seria": "string",
    "doc_number": "string",
    "id_doc_seria": "string",
    "id_doc_number": "string",
    "dob": "YYYY-MM-DD",
    "country": "ru"
  },
  "requestId": "optional-string"
}
```


## Пояснения к полям
- `doc_seria` и `doc_number` — реквизиты документа, который проверяем.
- `blank_seria` и `blank_number` — серия и номер бланка.
- `id_doc_seria` и `id_doc_number` — серия и номер документа, удостоверяющего личность.

## Пример запроса
```http
POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_TOKEN

{
  "params": {
    "method": "foreign_rvp_blank",
    "doctype": "rvp_blank",
    "firstname": "Хаджиакбар",
    "lastname": "Юлдошев",
    "secondname": "Джумабой Угли",
    "doc_seria": "82",
    "doc_number": "2205693712",
    "id_doc_seria": "FA",
    "id_doc_number": "4678821",
    "dob": "1985-12-01",
    "country": "ru"
  },
  "requestId": "b4c65a6b-45cc-430e-bbeb-a6518014bca4"
}
```

## Пример ответа
```json
{
  "params": {
    "method": "foreign_rvp_blank",
    "doctype": "rvp_blank",
    "firstname": "Хаджиакбар",
    "lastname": "Юлдошев",
    "secondname": "Джумабой Угли",
    "doc_seria": "82",
    "doc_number": "2205693712",
    "id_doc_seria": "FA",
    "id_doc_number": "4678821",
    "dob": "1985-12-01",
    "country": "ru",
    "newdb_qid": "EJkZIMOh1Iy9MygC"
  },
  "requestId": "b4c65a6b-45cc-430e-bbeb-a6518014bca4",
  "datecreated": "2026-01-18 17:49:25",
  "state": "complete",
  "balance": 9868,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "foreign_rvp_blank": {
      "taskId": "3bd7c40b-137d-4b43-8801-d188e37499f2",
      "dateupdated": "2026-01-18 17:49:57",
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

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "foreign_rvp_blank",
  "intent": "Проверка РВП по бланку",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["method", "doctype", "firstname", "lastname", "secondname", "doc_seria", "doc_number", "id_doc_seria", "id_doc_number", "dob", "country", "requestId"],
  "returns": ["state", "results.foreign_rvp_blank.result.status", "results.foreign_rvp_blank.result.data"]
}
```

</details>

