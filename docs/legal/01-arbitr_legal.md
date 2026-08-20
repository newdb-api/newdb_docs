---
title: "arbitr_legal — арбитражные дела юрлиц (КАД)"
description: "Метод arbitr_legal находит арбитражные дела по ИНН юридического лица в КАД и поддерживает постраничную выдачу через limit и offset."
canonical_url: https://newdb.net/docs/legal/01-arbitr_legal/
meta:
  - name: keywords
    content: "NEWDB API, arbitr_legal, арбитражные дела, КАД, арбитраж, юрлица, суд, пагинация"
  - property: og:title
    content: "Арбитражные дела юрлиц — method arbitr_legal"
  - property: og:description
    content: "Получите сведения об арбитражных делах юридического лица из КАД по ИНН через API NEWDB."
---

# arbitr_legal — Проверка арбитражных дел (юрлица, КАД)

POST `https://api.newdb.net/v2`

Метод ищет арбитражные дела юридического лица по ИНН в КАД (`kad.arbitr.ru`) и возвращает список найденных дел, карточки выбранных дел, участников, статусы, судебные акты, хронологию и результаты анализа PDF.

Метод поддерживает пагинацию. Если дел много, можно забирать их частями через `limit` и `offset`.

---

**Раздел:** [Юридические лица](index.md)

## Связанные страницы

- [Обзор раздела юридические лица](index.md)
- [fns_block — Проверка блокировок счетов юрлица (ФНС)](02-fns_block.md)
- [bankrot_legal — Проверка на банкротство юрлица (Федресурс)](03-bankrot_legal.md)
- [egrul — Сведения ЕГРЮЛ / Прозрачный бизнес](04-egrul.md)

## Когда использовать

- Проверка контрагента перед сделкой или оплатой
- Обогащение карточки компании судебными данными
- Анализ судебной активности и связанных рисков

## Заголовки

Content-Type: application/json  
X-API-KEY: `<your_token>`

---

## Входная схема

```json
{
  "params": {
    "inn": "string, ИНН юрлица",
    "country": "ru",
    "method": "arbitr_legal",
    "limit": "integer, optional, 1..10, default 10",
    "offset": "integer, optional, >= 0, default 0"
  },
  "webhook": "https://your.host/webhook",
  "requestId": "optional-string"
}
```

### Параметры пагинации

- `limit` — сколько дел подробно разобрать в текущем ответе. Максимум `10`.
- `offset` — смещение по общему списку найденных дел, начиная с `0`.

---

## Пример запроса

```json
POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_TOKEN

{
  "params": {
    "inn": "7707332613",
    "country": "ru",
    "method": "arbitr_legal",
    "limit": 10,
    "offset": 0
  },
  "requestId": "a5962f88-2916-5779-b59d-43c023faa913"
}
```

---

## Как использовать пагинацию

1. Сделайте первый запрос с `offset=0`.
2. Проверьте блок `pagination` в ответе.
3. Если `pagination.has_more = true`, возьмите `pagination.next_offset`.
4. Передайте этот `offset` в следующий запрос с тем же `limit`.
5. Повторяйте, пока `has_more` не станет `false`.

Пример последовательности:

- первый запрос: `limit=10`, `offset=0`
- второй запрос: `limit=10`, `offset=10`
- третий запрос: `limit=10`, `offset=20`

Если `total_count = 24`, то:

- первый ответ вернёт дела с индексами `0..9`
- второй ответ вернёт дела с индексами `10..19`
- третий ответ вернёт дела с индексами `20..23`

---

## Пример ответа

```json
{
  "params": {
    "inn": "7707332613",
    "country": "ru",
    "method": "arbitr_legal",
    "limit": 10,
    "offset": 0,
    "newdb_qid": "ELwLIIfhofu3MygC"
  },
  "requestId": "a5962f88-2916-5779-b59d-43c023faa913",
  "datecreated": "2026-01-02 18:51:49",
  "state": "complete",
  "balance": 9891,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "arbitr_legal": {
      "result": {
        "status": 200,
        "data": [
          {
            "query_inn": "7707332613",
            "page_url": "https://kad.arbitr.ru/",
            "found": true,
            "total_count": 24,
            "pagination": {
              "offset": 0,
              "limit": 10,
              "returned": 10,
              "has_more": true,
              "next_offset": 10,
              "previous_offset": null,
              "page_size": 25,
              "pages_count": 1
            },
            "message": "Найдено 24 дел. Подробно разобрано 10 из текущих 10. Для следующей пачки передайте offset=10 и limit=10.",
            "cases": [
              {
                "date": "06.12.2023",
                "case_number": "А40-283685/2023",
                "case_url": "https://kad.arbitr.ru/Card/e55e8888-fd43-486b-b9ee-50b64f3dddbd",
                "court": "АС города Москвы | Поздняков В. Д.",
                "plaintiff": "Филиал № 10 ОСФР по Москве и МО",
                "respondent": "ООО \"АПЕКС КОНСАЛТ\"",
                "index": 0,
                "has_details": true,
                "card": {
                  "case_number": "А40-283685/2023",
                  "status": "Рассмотрение дела завершено",
                  "participants": {
                    "plaintiffs": [],
                    "defendants": [],
                    "third_parties": [],
                    "others": []
                  },
                  "judges": [],
                  "acts": [],
                  "calendar_events": [],
                  "electronic_case_files": [],
                  "card_pdf_analysis": {
                    "pdf_link": "https://kad.arbitr.ru/Kad/PdfDocument/example.pdf"
                  },
                  "source_url": "https://kad.arbitr.ru/Card/e55e8888-fd43-486b-b9ee-50b64f3dddbd",
                  "index": 0
                }
              }
            ],
            "detailed_cases": [
              {
                "case_number": "А40-283685/2023",
                "status": "Рассмотрение дела завершено",
                "participants": {
                  "plaintiffs": [],
                  "defendants": [],
                  "third_parties": [],
                  "others": []
                },
                "judges": [],
                "acts": [],
                "calendar_events": [],
                "electronic_case_files": [],
                "card_pdf_analysis": {
                  "pdf_link": "https://kad.arbitr.ru/Kad/PdfDocument/example.pdf"
                },
                "source_url": "https://kad.arbitr.ru/Card/e55e8888-fd43-486b-b9ee-50b64f3dddbd",
                "index": 0
              }
            ]
          }
        ]
      },
      "taskId": "40e2b318-0375-4b4e-a0ab-7e4d3e9a238d",
      "dateupdated": "2026-01-02 18:52:30"
    }
  }
}
```

---

## Что означает блок pagination

- `offset` — смещение, которое вы передали в запросе
- `limit` — лимит, который вы передали в запросе
- `returned` — сколько дел реально вернулось в текущем ответе
- `has_more` — есть ли ещё дела после текущей пачки
- `next_offset` — смещение для следующего запроса
- `previous_offset` — смещение для предыдущей пачки
- `page_size` — размер страницы на стороне КАД
- `pages_count` — сколько страниц результатов у КАД

## Что находится в data

- `cases` — текущая порция дел по `offset`/`limit`
- `cases[].card` — подробная карточка конкретного дела, если она успешно разобрана
- `detailed_cases` — отдельный список только подробно разобранных карточек текущей выборки

Если `offset` больше или равен `total_count`, метод вернёт пустой список `cases`.

---

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "arbitr_legal",
  "intent": "Поиск арбитражных дел юридического лица",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["inn", "method", "country"],
  "optional_fields": ["limit", "offset"],
  "returns": ["state", "results.arbitr_legal.result.status", "results.arbitr_legal.result.data"]
}
```

</details>
