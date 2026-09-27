---
title: "foreign_rnr — проверка разрешения на работу"
description: "Метод NEWDB foreign_rnr для проверки разрешения на работу (РНР) иностранного гражданина по данным документа."
canonical_url: https://newdb.net/docs/foreign/05-foreign_rnr/
meta:
  - name: keywords
    content: "NEWDB API, foreign_rnr, РНР, разрешение на работу, иностранные граждане"
  - property: og:title
    content: "Проверка разрешения на работу — метод foreign_rnr"
  - property: og:description
    content: "Описание запроса, схемы и ответа метода foreign_rnr для проверки разрешения на работу."
---

# foreign_rnr — Разрешение на работу (РНР)

POST `https://api.newdb.net/v2`

Метод выполняет проверку разрешения на работу иностранного гражданина по данным документа.

**Раздел:** [Иностранные граждане](index.md)

## Связанные страницы

- [Обзор раздела иностранные граждане](index.md)
- [foreign_rvp_blank — РВП (бланк)](04-foreign_rvp_blank.md)
- [rkl — Проверка по реестру контролируемых лиц](06-foreign_rkl.md)
- [foreign_rvp_stamp — РВП (штамп в паспорте)](03-foreign_rvp_stamp.md)

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
    "method": "foreign_rnr",
    "doctype": "rnr",
    "doc_seria": "string",
    "doc_number": "string",
    "id_doc_seria": "string",
    "id_doc_number": "string",
    "blank_seria": "string",
    "blank_number": "string",
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
    "method": "foreign_rnr",
    "doctype": "rnr",
    "doc_seria": "82",
    "doc_number": "2205693712",
    "id_doc_seria": "FA",
    "id_doc_number": "4678821",
    "blank_seria": "РР",
    "blank_number": "8118448",
    "country": "ru"
  },
  "requestId": "b4c61a6b-34cc-430e-bbeb-a6528014bca4"
}
```

## Пример ответа
```json
{
  "params": {
    "method": "foreign_rnr",
    "doctype": "rnr",
    "doc_seria": "82",
    "doc_number": "2205693712",
    "id_doc_seria": "FA",
    "id_doc_number": "4678821",
    "blank_seria": "РР",
    "blank_number": "8118448",
    "country": "ru",
    "newdb_qid": "EJoZIP3R7Yy9MygC"
  },
  "requestId": "b4c61a6b-34cc-430e-bbeb-a6528014bca4",
  "datecreated": "2026-01-18 17:56:20",
  "state": "complete",
  "balance": 9867,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "foreign_rnr": {
      "taskId": "26d6d020-1202-47b5-9bbf-36f8611c36c1",
      "dateupdated": "2026-01-18 17:56:51",
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
  "method": "foreign_rnr",
  "intent": "Проверка разрешения на работу иностранного гражданина",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["method", "doctype", "doc_seria", "doc_number", "id_doc_seria", "id_doc_number", "blank_seria", "blank_number", "country", "requestId"],
  "returns": ["state", "results.foreign_rnr.result.status", "results.foreign_rnr.result.data"]
}
```

</details>


