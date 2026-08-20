---
title: "arbitr_person — арбитражные дела физлиц (КАД)"
description: "Метод arbitr_person ищет арбитражные дела по ИНН физического лица в КАД и поддерживает постраничную выдачу через limit и offset."
canonical_url: https://newdb.net/docs/fiz/07-arbitr_person/
meta:
  - name: keywords
    content: "NEWDB API, arbitr_person, арбитражные дела, КАД, арбитраж, физлица, суд, пагинация"
  - property: og:title
    content: "Арбитражные дела физлиц — method arbitr_person"
  - property: og:description
    content: "Получите сведения об арбитражных делах физического лица из КАД по ИНН через API NEWDB."
---

# arbitr_person — Проверка арбитражных дел (физлица, КАД)

POST `https://api.newdb.net/v2`

Метод ищет арбитражные дела физического лица по ИНН в КАД (`kad.arbitr.ru`) и возвращает список найденных дел, карточки выбранных дел, участников, статусы, судебные акты, хронологию и результаты анализа PDF.

Метод поддерживает пагинацию. Если дел много, можно забирать их частями через `limit` и `offset`.

---

**Раздел:** [Физические лица](index.md)

## Связанные страницы

- [Обзор раздела физические лица](index.md)
- [pledge_person — Проверка залогов и обременений (ФНП + Федресурс)](06-pledge_person.md)
- [nalog_debt — Проверка налоговой задолженности по ИНН](08-nalog_debt.md)
- [bankrot_person — Проверка на банкротство физлица (Федресурс)](05-fedresurs_bankrot.md)

## Когда использовать

- Проверка судебной активности физлица
- Обогащение анкеты клиента или заёмщика
- Анализ рисков, связанных с банкротством и арбитражными спорами

## Заголовки

Content-Type: application/json  
X-API-KEY: `<your_token>`

---

## Входная схема

```json
{
  "params": {
    "innfiz": "string, ИНН физлица",
    "country": "ru",
    "method": "arbitr_person",
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
    "innfiz": "644605034188",
    "country": "ru",
    "method": "arbitr_person",
    "limit": 10,
    "offset": 0
  },
  "requestId": "a5962f88-2916-4179-b59d-43c123faa911"
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

Если `total_count = 17`, то:

- первый ответ вернёт дела с индексами `0..9`
- второй ответ вернёт дела с индексами `10..16`

---

## Пример ответа

```json
{
  "params": {
    "innfiz": "644605034188",
    "country": "ru",
    "method": "arbitr_person",
    "limit": 10,
    "offset": 0,
    "newdb_qid": "EL0LILzjmqi4MygC"
  },
  "requestId": "a5962f88-2916-4179-b59d-43c123faa911",
  "datecreated": "2026-01-03 21:02:46",
  "state": "complete",
  "balance": 9890,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "arbitr_person": {
      "result": {
        "status": 200,
        "data": [
          {
            "query_inn": "644605034188",
            "page_url": "https://kad.arbitr.ru/",
            "found": true,
            "total_count": 17,
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
            "message": "Найдено 17 дел. Подробно разобрано 10 из текущих 10. Для следующей пачки передайте offset=10 и limit=10.",
            "cases": [
              {
                "date": "26.06.2025",
                "case_number": "А57-10442/2025",
                "case_url": "https://kad.arbitr.ru/Card/b6ef77e0-9dd5-4398-aa84-a674790a9a76",
                "court": "АС Саратовской области | Огнищева Ю. П.",
                "plaintiff": "Леликов Андрей Викторович",
                "respondent": "Леликов Андрей Викторович",
                "index": 0,
                "has_details": true,
                "card": {
                  "case_number": "А57-10442/2025",
                  "status": "Рассматривается в первой инстанции",
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
                  "source_url": "https://kad.arbitr.ru/Card/b6ef77e0-9dd5-4398-aa84-a674790a9a76",
                  "index": 0
                }
              }
            ],
            "detailed_cases": [
              {
                "case_number": "А57-10442/2025",
                "status": "Рассматривается в первой инстанции",
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
                "source_url": "https://kad.arbitr.ru/Card/b6ef77e0-9dd5-4398-aa84-a674790a9a76",
                "index": 0
              }
            ]
          }
        ]
      },
      "taskId": "10949a69-a0c5-43f5-a8b9-145f34a97e69",
      "dateupdated": "2026-01-03 21:03:22"
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
  "method": "arbitr_person",
  "intent": "Поиск арбитражных дел физического лица",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["innfiz", "method", "country"],
  "optional_fields": ["limit", "offset"],
  "returns": ["state", "results.arbitr_person.result.status", "results.arbitr_person.result.data"]
}
```

</details>
