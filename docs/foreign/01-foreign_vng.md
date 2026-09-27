---
title: "foreign_vng — проверка ВНЖ (вид на жительство)"
description: "Метод NEWDB foreign_vng для проверки вида на жительство (ВНЖ) иностранного гражданина по документам и ФИО."
canonical_url: https://newdb.net/docs/foreign/01-foreign_vng/
meta:
  - name: keywords
    content: "NEWDB API, foreign_vng, ВНЖ, иностранные граждане, проверка документов"
  - property: og:title
    content: "Проверка ВНЖ иностранного гражданина — метод foreign_vng"
  - property: og:description
    content: "Описание запроса, схемы и ответа метода foreign_vng для проверки вида на жительство."
---

# foreign_vng — Вид на жительство (ВНЖ)

POST `https://api.newdb.net/v2`

Метод выполняет проверку вида на жительство иностранного гражданина по данным документа и ФИО.

**Раздел:** [Иностранные граждане](index.md)

## Связанные страницы

- [Обзор раздела иностранные граждане](index.md)
- [foreign_patent — Патент](02-foreign_patent.md)
- [foreign_rvp_stamp — РВП (штамп в паспорте)](03-foreign_rvp_stamp.md)
- [foreign_rvp_blank — РВП (бланк)](04-foreign_rvp_blank.md)

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
    "method": "foreign_vng",
    "doctype": "vng",
    "firstname": "string",
    "lastname": "string",
    "doc_seria": "string",
    "doc_number": "string",
    "id_doc_seria": "string",
    "id_doc_number": "string",
    "blank_seria": "string",
    "blank_number": "string",
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
    "method": "foreign_vng",
    "doctype": "vng",
    "firstname": "Хаджиакбар",
    "lastname": "Юлдошев",
    "doc_seria": "82",
    "doc_number": "2205693712",
    "id_doc_seria": "FA",
    "id_doc_number": "4678821",
    "blank_seria": "РР",
    "blank_number": "8118448",
    "dob": "1985-12-01",
    "country": "ru"
  },
  "requestId": "b4c63a7b-45cc-031e-bbeb-a6518014bca4"
}
```

## Пример ответа
```json
{
  "params": {
    "method": "foreign_vng",
    "doctype": "vng",
    "firstname": "Хаджиакбар",
    "lastname": "Юлдошев",
    "doc_seria": "82",
    "doc_number": "2205693712",
    "id_doc_seria": "FA",
    "id_doc_number": "4678821",
    "blank_seria": "РР",
    "blank_number": "8118448",
    "dob": "1985-12-01",
    "country": "ru",
    "newdb_qid": "EJQYIJ7pnYm9MygA"
  },
  "requestId": "b4c63a7b-45cc-031e-bbeb-a6518014bca4",
  "datecreated": "2026-01-18 15:49:41",
  "state": "complete",
  "balance": 9875,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "foreign_vng": {
      "taskId": "c0fb4556-152b-4590-99d8-8779cb887a74",
      "dateupdated": "2026-01-18 15:50:13",
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
  "method": "foreign_vng",
  "intent": "Проверка вида на жительство иностранного гражданина",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["method", "doctype", "firstname", "lastname", "doc_seria", "doc_number", "id_doc_seria", "id_doc_number", "blank_seria", "blank_number", "dob", "country", "requestId"],
  "returns": ["state", "results.foreign_vng.result.status", "results.foreign_vng.result.data"]
}
```

</details>

