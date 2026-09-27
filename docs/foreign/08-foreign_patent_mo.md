---
title: "patent_mo — проверка патента (Московская область)"
description: "Метод NEWDB patent_mo для проверки патента иностранного гражданина в Московской области по ИНН и дате рождения."
canonical_url: https://newdb.net/docs/foreign/08-foreign_patent_mo/
meta:
  - name: keywords
    content: "NEWDB API, patent_mo, патент Московская область, иностранные граждане, проверка патента"
  - property: og:title
    content: "Проверка патента в Московской области — метод patent_mo"
  - property: og:description
    content: "Описание запроса, схемы и ответа метода patent_mo для проверки патента в Московской области."
---

# patent_mo — Патент (Московская область)

POST `https://api.newdb.net/v2`

Метод выполняет проверку патента для Московской области по ИНН физического лица и дате рождения.

**Раздел:** [Иностранные граждане](index.md)

## Связанные страницы

- [Обзор раздела иностранные граждане](index.md)
- [patent_msk — Патент (Москва)](07-foreign_patent_msk.md)
- [rkl — Проверка по реестру контролируемых лиц](06-foreign_rkl.md)
- [foreign_rnr — Разрешение на работу (РНР)](05-foreign_rnr.md)

## Когда использовать

Используйте метод, когда нужно проверить статус документа или разрешительного основания иностранного гражданина.

## Типовые кейсы

- Проверка ВНЖ, патента, РВП или разрешения на работу перед оформлением
- Контроль миграционных документов в HR или compliance-процессе
- Подтверждение статуса документа по данным анкеты и реквизитам

## Заголовки
```http
Content-Type: application/json
X-API-KEY: <your_token>
```

## Входная схема (request)
```json
{
  "params": {
    "method": "patent_mo",
    "innfiz": "string",
    "dob": "YYYY-MM-DD",
    "country": "ru"
  },
  "requestId": "optional-string"
}
```

## Пояснения к полям
- `innfiz` — ИНН физического лица.
- `dob` — дата рождения в формате `YYYY-MM-DD`.
- `country` — страна запроса (`ru`).

## Пример запроса
```json
{
  "params": {
    "method": "patent_mo",
    "innfiz": "272116001938",
    "dob": "1987-01-08",
    "country": "ru"
  },
  "requestId": "b4c69a6b-45cc-440e-bbeb-a6528014bca4"
}
```

## Пример ответа
```json
{
  "params": {
    "method": "patent_mo",
    "innfiz": "272116001938",
    "dob": "1987-01-08",
    "country": "ru",
    "newdb_qid": "EP0iIP63yfbLMygA"
  },
  "requestId": "b4c69a6b-45cc-440e-bbeb-a6528014bca4",
  "datecreated": "2026-03-05 19:26:22",
  "state": "complete",
  "balance": 9809,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "patent_mo": {
      "taskId": "83845f02-3e3f-4bff-a541-f9eab2f88581",
      "dateupdated": "2026-03-05 19:26:31",
      "result": {
        "status": 200,
        "data": [
          {
            "message": "информация по патенту для текущего лица не найдена",
            "details": "проверьте правильность ИНН и ДАТЫ РОЖДЕНИЯ",
            "status": "not_found"
          }
        ]
      }
    }
  }
}
```

## Статус в ответе
- `status: "not_found"` — данные по патенту не найдены.

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "patent_mo",
  "intent": "Проверка патента иностранного гражданина по Московской области",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["method", "innfiz", "dob", "country", "requestId"],
  "returns": ["state", "results.patent_mo.result.status", "results.patent_mo.result.data"]
}
```

</details>


