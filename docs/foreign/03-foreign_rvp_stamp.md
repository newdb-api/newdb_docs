---
title: "foreign_rvp_stamp — проверка РВП (штамп в паспорте)"
description: "Метод NEWDB foreign_rvp_stamp для проверки разрешения на временное проживание (штамп в паспорте) иностранного гражданина."
canonical_url: https://newdb.net/docs/foreign/03-foreign_rvp_stamp/
meta:
  - name: keywords
    content: "NEWDB API, foreign_rvp_stamp, РВП, штамп, иностранные граждане"
  - property: og:title
    content: "Проверка РВП (штамп в паспорте) — метод foreign_rvp_stamp"
  - property: og:description
    content: "Описание запроса, схемы и ответа метода foreign_rvp_stamp для проверки РВП."
---

# foreign_rvp_stamp — РВП (штамп в паспорте)

POST `https://api.newdb.net/v2`

Метод выполняет проверку разрешения на временное проживание (штамп) иностранного гражданина по данным паспорта и дате выдачи.

**Раздел:** [Иностранные граждане](index.md)

## Связанные страницы

- [Обзор раздела иностранные граждане](index.md)
- [foreign_patent — Патент](02-foreign_patent.md)
- [foreign_rvp_blank — РВП (бланк)](04-foreign_rvp_blank.md)
- [foreign_vng — Вид на жительство (ВНЖ)](01-foreign_vng.md)

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
    "method": "foreign_rvp_stamp",
    "doctype": "rvp_stamp",
    "firstname": "string",
    "lastname": "string",
    "issue_date": "YYYY-MM-DD",
    "id_doc_seria": "string",
    "id_doc_number": "string",
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
    "method": "foreign_rvp_stamp",
    "doctype": "rvp_stamp",
    "firstname": "Хаджиакбар",
    "lastname": "Юлдошев",
    "issue_date": "2025-01-01",
    "id_doc_seria": "FA",
    "id_doc_number": "4678821",
    "country": "ru"
  },
  "requestId": "b4c61a6b-39cc-432e-bbeb-a6518014bca4"
}
```

## Пример ответа
```json
{
  "params": {
    "method": "foreign_rvp_stamp",
    "doctype": "rvp_stamp",
    "firstname": "Хаджиакбар",
    "lastname": "Юлдошев",
    "issue_date": "2025-01-01",
    "id_doc_seria": "FA",
    "id_doc_number": "4678821",
    "country": "ru",
    "newdb_qid": "EJUYIK3M3om9MygA"
  },
  "requestId": "b4c61a6b-39cc-432e-bbeb-a6518014bca4",
  "datecreated": "2026-01-18 16:07:22",
  "state": "complete",
  "balance": 9870,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "foreign_rvp_stamp": {
      "taskId": "250607d8-e2c0-4118-9954-568ae2d41353",
      "dateupdated": "2026-01-18 16:07:55",
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
  "method": "foreign_rvp_stamp",
  "intent": "Проверка РВП по штампу",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["method", "doctype", "firstname", "lastname", "issue_date", "id_doc_seria", "id_doc_number", "country", "requestId"],
  "returns": ["state", "results.foreign_rvp_stamp.result.status", "results.foreign_rvp_stamp.result.data"]
}
```

</details>

