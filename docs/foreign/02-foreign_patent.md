---
title: "foreign_patent — проверка патента"
description: "Метод NEWDB foreign_patent для проверки патента иностранного гражданина по данным документа."
canonical_url: https://newdb.net/docs/foreign/02-foreign_patent/
meta:
  - name: keywords
    content: "NEWDB API, foreign_patent, патент, иностранные граждане"
  - property: og:title
    content: "Проверка патента — метод foreign_patent"
  - property: og:description
    content: "Описание запроса, схемы и ответа метода foreign_patent."
---

# foreign_patent — Патент

POST `https://api.newdb.net/v2`

Метод выполняет проверку патента иностранного гражданина по данным документа.

**Раздел:** [Иностранные граждане](index.md)

## Связанные страницы

- [Обзор раздела иностранные граждане](index.md)
- [foreign_vng — Вид на жительство (ВНЖ)](01-foreign_vng.md)
- [foreign_rvp_stamp — РВП (штамп в паспорте)](03-foreign_rvp_stamp.md)
- [foreign_rvp_blank — РВП (бланк)](04-foreign_rvp_blank.md)
- [patent_msk — Патент (Москва)](07-foreign_patent_msk.md)
- [patent_mo — Патент (Московская область)](08-foreign_patent_mo.md)

## Когда использовать

Используйте метод, когда нужно проверить патент иностранного гражданина по персональным данным и реквизитам документов.

## Типовые кейсы

- Проверка патента перед трудоустройством
- Контроль миграционных документов в HR или compliance-процессах
- Подтверждение сведений по данным удостоверяющего документа и бланка

## Заголовки
```http
Content-Type: application/json
X-API-KEY: <your_token>
```

## Входная схема (request)
```json
{
  "params": {
    "method": "foreign_patent",
    "doctype": "patent",
    "firstname": "string",
    "lastname": "string",
    "secondname": "string",
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

- `method` — значение `foreign_patent`.
- `doctype` — тип документа, значение `patent`.
- `firstname`, `lastname`, `secondname` — ФИО заявителя.
- `doc_seria`, `doc_number` — серия и номер документа патента.
- `id_doc_seria`, `id_doc_number` — серия и номер документа, удостоверяющего личность.
- `blank_seria`, `blank_number` — серия и номер бланка.
- `dob` — дата рождения в формате `YYYY-MM-DD`.
- `country` — страна запроса (`ru`).

## Пример запроса
```json
{
  "params": {
    "method": "foreign_patent",
    "doctype": "patent",
    "firstname": "Хаджиакбар",
    "lastname": "Юлдошев",
    "secondname": "Джумабой Угли",
    "doc_seria": "",
    "doc_number": "",
    "id_doc_seria": "FA",
    "id_doc_number": "4678821",
    "blank_seria": "РР",
    "blank_number": "8118448",
    "dob": "1985-12-01",
    "country": "ru"
  },
  "requestId": "e0047674-80ea-433d-8f68-1e6a0c2a908d"
}
```

## Пример ответа
```json
{
  "params": {
    "method": "foreign_patent",
    "doctype": "patent",
    "firstname": "Хаджиакбар",
    "lastname": "Юлдошев",
    "secondname": "Джумабой Угли",
    "doc_seria": "82",
    "doc_number": "2205693712",
    "id_doc_seria": "FA",
    "id_doc_number": "4678821",
    "blank_seria": "РР",
    "blank_number": "8118448",
    "dob": "1985-12-01",
    "country": "ru",
    "newdb_qid": "EJcZIIORoom9MygC"
  },
  "requestId": "b4c61a6b-34cc-440e-bbeb-a6528024bca4",
  "datecreated": "2026-01-18 15:50:50",
  "state": "complete",
  "balance": 9874,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "foreign_patent": {
      "taskId": "59fa0c7d-ed1a-40c9-b43d-6e7144ff8956",
      "dateupdated": "2026-01-18 15:51:20",
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

## Статус в ответе

- `result.status` — HTTP-статус результата проверки.
- `result.data[].doc_status` — итог проверки документа.

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "foreign_patent",
  "intent": "Проверка патента иностранного гражданина",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["method", "doctype", "firstname", "lastname", "secondname", "id_doc_seria", "id_doc_number", "blank_seria", "blank_number", "dob", "country", "requestId"],
  "returns": ["state", "results.foreign_patent.result.status", "results.foreign_patent.result.data"]
}
```

</details>
