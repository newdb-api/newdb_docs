---
title: "court_arbitration — арбитраж по компаниям физлица"
description: "Метод court_arbitration находит компании, где физлицо является руководителем или учредителем, и агрегирует их арбитражные дела из КАД с суммами требований и скорингом субсидиарного риска."
canonical_url: https://newdb.net/docs/fiz/21-court_arbitration/
meta:
  - name: keywords
    content: "NEWDB API, court_arbitration, арбитраж, КАД, субсидиарная ответственность, ЕГРЮЛ, аффилированность, физлица"
  - property: og:title
    content: "Арбитраж по компаниям физлица — method court_arbitration"
  - property: og:description
    content: "Комплексная проверка: ЕГРЮЛ-связи физлица и арбитражные дела его компаний в КАД через API NEWDB."
---

# court_arbitration — Арбитраж по компаниям физлица (ЕГРЮЛ + КАД)

POST `https://api.newdb.net/v2`

Составной метод. По ИНН физлица определяет компании, где лицо является руководителем или учредителем (по ЕГРЮЛ-связям), затем для каждой компании ищет арбитражные дела в КАД (`kad.arbitr.ru`), агрегирует суммы требований из AI-разбора PDF судебных актов и рассчитывает прозрачный скоринг субсидиарного риска.

---

**Раздел:** [Физические лица](index.md)

## Связанные страницы

- [Обзор раздела физические лица](index.md)
- [arbitr_person — Арбитражные дела физлица в КАД](07-arbitr_person.md)
- [arbitr_debt_sum — Сумма задолженностей физлица по арбитражным делам](22-arbitr_debt_sum.md)
- [egrul_ip — Сведения ЕГРИП и статус ИП](11-egrul_ip.md)

## Когда использовать

- Оценка рисков субсидиарной ответственности бенефициара или руководителя
- Проверка деловой репутации физлица через судебную активность его компаний
- Комплаенс и KYC при кредитовании и сделках

## Стоимость

Динамическая: `1` единица за поиск связей + `1` единица за каждую найденную компанию, по которой ставится проверка КАД. Итог отражается в блоке `pricing` ответа.

## Заголовки

Content-Type: application/json  
X-API-KEY: `<your_token>`

---

## Входная схема

```json
{
  "params": {
    "innfiz": "string, ИНН физлица (12 цифр), обязательный",
    "country": "ru",
    "method": "court_arbitration",
    "company_limit": "integer, optional, 1..100 — максимум компаний для проверки"
  },
  "webhook": "https://your.host/webhook",
  "requestId": "optional-string"
}
```

Метод принимает только `innfiz`. Передача `inn` или `innyur` вернёт ошибку валидации.

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
    "method": "court_arbitration",
    "company_limit": 10
  },
  "requestId": "00000000-0000-4000-8000-000000000101"
}
```

---

## Пример ответа

```json
{
  "params": {
    "innfiz": "500100732259",
    "country": "ru",
    "method": "court_arbitration",
    "newdb_qid": "EL0LILzjmqi4MygC"
  },
  "requestId": "00000000-0000-4000-8000-000000000101",
  "datecreated": "2026-09-15 12:00:00",
  "state": "complete",
  "balance": 9890,
  "tasks": 3,
  "is_repeat": false,
  "results": {
    "court_arbitration": {
      "result": {
        "status": 200,
        "found": true,
        "data": [
          {
            "person_inn": "500100732259",
            "companies_found": 2,
            "companies_scheduled": 2,
            "companies_checked": 2,
            "companies_failed": 0,
            "total_cases": 5,
            "total_claims_amount": 1250000.5,
            "known_amount_cases": 4,
            "amount_status": "partial",
            "currency": "RUB",
            "company_arbitrations": [
              {
                "inn": "7712345678",
                "name": "ООО \"ПРИМЕР\"",
                "roles": ["director"],
                "status": "complete",
                "result_status": 200,
                "cases_count": 3,
                "returned_cases_count": 3,
                "known_claims_amount": 1000000.5,
                "known_amount_cases": 3,
                "amount_status": "complete",
                "cases": [
                  {
                    "case_number": "А40-12345/2026",
                    "case_url": "https://kad.arbitr.ru/Card/00000000-0000-4000-8000-000000000001",
                    "date": "01.02.2026",
                    "court": "АС города Москвы",
                    "plaintiff": "ООО \"КРЕДИТОР\"",
                    "respondent": "ООО \"ПРИМЕР\"",
                    "claim_amount": 500000.0,
                    "currency": "RUB",
                    "company_case_role": "defendant",
                    "case_type": "CONTRACT_DISPUTE",
                    "classification_confidence": 0.9,
                    "personal_asset_risk": "medium",
                    "enforcement_signal": false,
                    "risk_factors": []
                  }
                ]
              }
            ],
            "subsidiary_liability_score": {
              "version": "court_arbitration_v1",
              "score": 35,
              "risk_level": "medium",
              "confidence": 0.8,
              "confidence_level": "high",
              "defendant_cases": 3,
              "claimant_cases": 1,
              "bankruptcy_cases": 0,
              "enforcement_cases": 0,
              "known_defendant_claims_amount": 1000000.5,
              "currency": "RUB",
              "factors": [
                {"code": "defendant_cases", "value": 3, "points": 15},
                {"code": "known_defendant_claims_amount", "value": 1000000.5, "points": 10}
              ],
              "limitations": [
                "Скоринг отражает сигналы из доступных карточек и AI-разбора судебных PDF, но не устанавливает субсидиарную ответственность.",
                "Неполный разбор карточек или отсутствие суммы снижает confidence и не трактуется как нулевой риск."
              ]
            },
            "pricing": {
              "model": "complex_dynamic_by_company_count",
              "discovery_units": 1,
              "company_units": 2,
              "calculated_units": 3,
              "charged_units": 3,
              "balance": 9890
            }
          }
        ]
      },
      "taskId": "00000000-0000-4000-8000-000000000102",
      "dateupdated": "2026-09-15 12:04:10"
    }
  }
}
```

---

## Ключевые поля ответа

- `companies_found` / `companies_scheduled` / `companies_checked` / `companies_failed` — воронка проверки компаний.
- `total_claims_amount` — сумма известных требований по всем делам компаний. `null`, если ни одной суммы извлечь не удалось.
- `amount_status` — полнота сумм: `complete` (суммы по всем делам), `partial` (часть), `unavailable` (суммы недоступны в источнике). **`unavailable` не означает нулевую задолженность.**
- `company_case_role` — роль компании в деле: `defendant`, `claimant`, `unknown`.
- `subsidiary_liability_score` — прозрачный скоринг риска (0–100) с факторами (`factors`), уровнем (`risk_level`), достоверностью (`confidence`) и явными ограничениями (`limitations`). Это оценка сигналов, а не юридический вывод.
- `pricing` — фактическое списание по динамической модели.

## Статусы

- `200` — проверка завершена (в том числе если дел или компаний не найдено — тогда `found: false`).
- `402` — недостаточно средств для динамической тарификации по числу компаний.
- `400` — ошибки валидации (`innfiz` не 12 цифр, передан `inn`/`innyur`, некорректный `company_limit`).
