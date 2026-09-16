---
title: "arbitr_debt_sum — сумма арбитражных задолженностей физлица"
description: "Метод arbitr_debt_sum по ИНН физлица агрегирует сумму задолженностей по арбитражным делам из КАД: роли в делах, суммы требований из AI-разбора судебных актов и честный amount_status без ложных нулей."
canonical_url: https://newdb.net/docs/fiz/22-arbitr_debt_sum/
meta:
  - name: keywords
    content: "NEWDB API, arbitr_debt_sum, арбитражная задолженность, КАД, сумма исков, суд, физлица"
  - property: og:title
    content: "Сумма арбитражных задолженностей физлица — method arbitr_debt_sum"
  - property: og:description
    content: "Агрегированная сумма задолженностей физлица по арбитражным делам КАД через API NEWDB."
---

# arbitr_debt_sum — Сумма задолженностей по арбитражным делам (физлица, КАД)

POST `https://api.newdb.net/v2`

Метод ищет арбитражные дела физлица по ИНН в КАД (`kad.arbitr.ru`), извлекает суммы требований из AI-разбора PDF судебных актов, определяет роль лица в каждом деле (должник / взыскатель) и возвращает агрегированную сумму задолженности с честным статусом полноты (`amount_status`).

В отличие от [arbitr_person](07-arbitr_person.md), который возвращает подробные карточки дел с пагинацией, `arbitr_debt_sum` даёт компактный агрегат: одну сводку по задолженности плюс краткие строки дел.

---

**Раздел:** [Физические лица](index.md)

## Связанные страницы

- [Обзор раздела физические лица](index.md)
- [arbitr_person — Арбитражные дела физлица в КАД](07-arbitr_person.md)
- [court_arbitration — Арбитраж по компаниям физлица](21-court_arbitration.md)
- [nalog_debt — Налоговая задолженность по ИНН](08-nalog_debt.md)

## Когда использовать

- Быстрая оценка суммы арбитражных требований к физлицу
- Скоринг заёмщика или контрагента без разбора всех карточек вручную
- Мониторинг долговой нагрузки по судебным спорам

## Заголовки

Content-Type: application/json  
X-API-KEY: `<your_token>`

---

## Входная схема

```json
{
  "params": {
    "innfiz": "string, ИНН физлица, обязательный",
    "country": "ru",
    "method": "arbitr_debt_sum",
    "max_cases": "integer, optional, 1..50, default 20 — сколько дел детально разобрать"
  },
  "webhook": "https://your.host/webhook",
  "requestId": "optional-string"
}
```

Каждое детально разобранное дело — это скачивание PDF судебного акта и AI-разбор, поэтому число дел ограничено `max_cases` (максимум 50). Если найдено больше дел, чем разобрано, сводка получит `amount_status: "partial"`.

---

## Пример запроса

```json
POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_TOKEN

{
  "params": {
    "innfiz": "500100732259",
    "country": "ru",
    "method": "arbitr_debt_sum",
    "max_cases": 20
  },
  "requestId": "00000000-0000-4000-8000-000000000201"
}
```

---

## Пример ответа

```json
{
  "params": {
    "innfiz": "500100732259",
    "country": "ru",
    "method": "arbitr_debt_sum",
    "max_cases": 20,
    "newdb_qid": "EL0LILzjmqi4MygC"
  },
  "requestId": "00000000-0000-4000-8000-000000000201",
  "datecreated": "2026-09-15 12:00:00",
  "state": "complete",
  "balance": 9890,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "arbitr_debt_sum": {
      "result": {
        "status": 200,
        "data": [
          {
            "query_innfiz": "500100732259",
            "search_mode": "inn",
            "page_url": "https://kad.arbitr.ru/",
            "found": true,
            "total_count": 3,
            "debt_summary": {
              "currency": "RUB",
              "total_debt_amount": 750000.0,
              "as_debtor_amount": 500000.0,
              "as_claimant_amount": 120000.0,
              "unknown_role_amount": 250000.0,
              "cases_total": 3,
              "cases_analyzed": 3,
              "cases_with_amount": 3,
              "cases_without_amount": 0,
              "amount_status": "complete",
              "note": "Суммы извлекаются AI-разбором доступных PDF судебных актов; amount_status=partial/unavailable означает, что часть сумм в источнике недоступна, а не нулевую задолженность."
            },
            "cases": [
              {
                "case_number": "А40-12345/2026",
                "date": "01.02.2026",
                "court": "АС города Москвы",
                "plaintiff": "ООО \"КРЕДИТОР\"",
                "respondent": "ИВАНОВ ИВАН ИВАНОВИЧ",
                "case_url": "https://kad.arbitr.ru/Card/00000000-0000-4000-8000-000000000001",
                "role": "debtor",
                "amount": 500000.0,
                "currency": "RUB",
                "amount_status": "extracted",
                "amount_source": "financials.total_amount",
                "pdf_link": "https://kad.arbitr.ru/Kad/PdfDocument/example.pdf"
              }
            ],
            "message": "Найдено 3 дел, проанализировано 3 (лимит max_cases=20). Сумм извлечено: 3, статус: complete."
          }
        ]
      },
      "taskId": "00000000-0000-4000-8000-000000000202",
      "dateupdated": "2026-09-15 12:03:20"
    }
  }
}
```

---

## Как читать debt_summary

- `total_debt_amount` — задолженность проверяемого лица: сумма по делам, где лицо — должник (`as_debtor_amount`), плюс дела с неопределённой ролью (`unknown_role_amount`). `null` — суммы недоступны в источнике; `0` возвращается только когда дел действительно нет (`amount_status: "no_cases"`).
- `as_claimant_amount` — суммы дел, где лицо является взыскателем; в задолженность не включаются.
- `amount_status`:
  - `complete` — суммы извлечены по всем найденным делам;
  - `partial` — часть дел без сумм или разобраны не все дела (увеличьте `max_cases`);
  - `unavailable` — дела есть, но ни одной суммы извлечь не удалось (**не ноль!**);
  - `no_cases` — дел не найдено, задолженность отсутствует.
- `role` по каждому делу: `debtor` / `claimant` / `unknown`. Определяется по ИНН сторон из AI-разбора PDF, с fallback на позицию ИНН в колонках истец/ответчик КАД.
- `amount_source` — из какого поля AI-разбора взята сумма (`financials.total_amount`, `financials.main_debt+state_fee`, `risk.total_claims_amount`).

## Статусы

- `200` — проверка завершена (включая `no_cases`).
- `400` — не передан `innfiz`.
- `500` — источник недоступен (429/5xx КАД, сбой браузера) — запрос будет повторён.
