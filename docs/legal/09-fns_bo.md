---
title: "fns_bo — бухгалтерская (финансовая) отчетность (ГИР БО / ФНС)"
description: "Метод NEWDB fns_bo возвращает бухгалтерскую (финансовую) отчетность организации из ГИР БО и реестра доходов/расходов ФНС по ИНН."
canonical_url: https://newdb.net/docs/legal/09-fns_bo/
meta:
  - name: keywords
    content: "NEWDB API, fns_bo, ГИР БО, бухгалтерская отчетность, финансовая отчетность, доходы и расходы, баланс, ФНС, выручка, прибыль"
  - property: og:title
    content: "Бухгалтерская отчетность организации — метод fns_bo"
  - property: og:description
    content: "Получение бухгалтерской (финансовой) отчетности организаций из ГИР БО и доходов/расходов ФНС по ИНН юридического лица через API NEWDB."
---

# fns_bo — Бухгалтерская (финансовая) отчетность организации (ГИР БО / ФНС)

POST `https://api.newdb.net/v2`

Метод возвращает официальную бухгалтерскую (финансовую) отчетность юридического лица из Государственного информационного ресурса бухгалтерской отчетности (ГИР БО ФНС России) и государственного реестра доходов и расходов организаций по ИНН.

**Раздел:** [Юридические лица](index.md)

## Связанные страницы

- [Обзор раздела юридические лица](index.md)
- [egrul — Сведения ЕГРЮЛ / Прозрачный бизнес](04-egrul.md)
- [fns_block — Проверка блокировок счетов юрлица (ФНС)](02-fns_block.md)
- [arbitr_legal — Проверка арбитражных дел (юрлица, КАД)](01-arbitr_legal.md)
- [bankrot_legal — Проверка на банкротство юрлица (Федресурс)](03-bankrot_legal.md)
- [complex_by_inn — Комплексная проверка компании по ИНН](06-complex_by_inn.md)

## Когда использовать

- Финансовый анализ надежности и платежеспособности контрагента перед заключением сделок и выдачей кредитных лимитов
- Анализ динамики выручки, себестоимости, чистой прибыли, активов и обязательств компании по годам
- Проверка наличия обязательного аудита и аудиторских заключений
- Проверка реальной деловой активности юрлица по сданной налоговой отчетности доходов и расходов

## Заголовки

```text
Content-Type: application/json
X-API-KEY: <your_token>
```

## Параметры запроса (Request)

| Параметр  | Тип    | Обязательный | Описание |
|-----------|--------|--------------|----------|
| `inn`     | string | Да           | ИНН юридического лица (строго 10 цифр) |
| `country` | string | Нет          | Код страны (по умолчанию `ru`) |
| `method`  | string | Да           | Значение `"fns_bo"` |
| `get_screen` | boolean | Нет       | Получение скриншота карточки отчета (по умолчанию `false`) |

## Входная схема (JSON)

```json
{
  "params": {
    "inn": "7712345678",
    "country": "ru",
    "method": "fns_bo"
  },
  "webhook": "https://your.host/whook",
  "requestId": "optional-string"
}
```

## Пример запроса

```http
POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_TOKEN

{
  "params": {
    "inn": "7712345678",
    "country": "ru",
    "method": "fns_bo"
  },
  "requestId": "00000000-0000-4000-8000-000000000001"
}
```

## Пример успешного ответа

```json
{
  "taskId": "7a080c71-ac6e-4805-9dae-c05109089daf",
  "requestId": "00000000-0000-4000-8000-000000000001",
  "method": "fns_bo",
  "status": "success",
  "dateupdated": "2026-09-11 13:42:15",
  "results": {
    "fns_bo": {
      "taskId": "7a080c71-ac6e-4805-9dae-c05109089daf",
      "dateupdated": "2026-09-11 13:42:15",
      "result": {
        "status": 200,
        "found": true,
        "inn": "7712345678",
        "organization": {
          "inn": "7712345678",
          "ogrn": "1157746102535",
          "kpp": "770701001",
          "short_name": "ООО \"КОМПАНИЯ\"",
          "full_name": "ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ \"КОМПАНИЯ\"",
          "address": "127473, Г. МОСКВА, УЛ. ПРИМЕРНАЯ, Д. 1",
          "okved": {
            "id": "62.01",
            "name": "Разработка компьютерного программного обеспечения"
          },
          "okopf": {
            "id": 12300,
            "name": "Общества с ограниченной ответственностью"
          },
          "authorized_capital": 20000.0,
          "status": "ACTIVE",
          "status_date": "2015-02-13",
          "registration_date": "2015-02-13"
        },
        "financial_summary": [
          {
            "inn": "7712345678",
            "org_name": "ООО \"КОМПАНИЯ\"",
            "year": 2024,
            "period": "2024",
            "revenue": 150000.0,
            "cost_of_sales": 95000.0,
            "gross_profit": 55000.0,
            "other_expenses": 5000.0,
            "net_profit": 42000.0,
            "assets": 180000.0,
            "capital": 120000.0,
            "short_term_debt": 40000.0,
            "long_term_debt": 20000.0,
            "has_audit": false,
            "has_explanations": false,
            "opendata_income": 150000.0,
            "opendata_expense": 108000.0,
            "source": "merged"
          }
        ],
        "data": [
          {
            "inn": "7712345678",
            "org_name": "ООО \"КОМПАНИЯ\"",
            "year": 2024,
            "period": "2024",
            "revenue": 150000.0,
            "cost_of_sales": 95000.0,
            "gross_profit": 55000.0,
            "other_expenses": 5000.0,
            "net_profit": 42000.0,
            "assets": 180000.0,
            "capital": 120000.0,
            "short_term_debt": 40000.0,
            "long_term_debt": 20000.0,
            "has_audit": false,
            "has_explanations": false,
            "opendata_income": 150000.0,
            "opendata_expense": 108000.0,
            "source": "merged"
          }
        ]
      }
    }
  }
}
```

## Описание полей массива `results.fns_bo.result.data[]`

| Поле | Тип | Описание |
|------|-----|----------|
| `inn` | string | ИНН организации |
| `org_name` | string | Наименование организации |
| `year` | integer | Отчетный год (число) |
| `period` | string | Отчетный период (год, строка) |
| `revenue` | float | Выручка (строка 2110 / `gainSum` / `income`, тыс. руб.) |
| `cost_of_sales` | float | Себестоимость продаж (строка 2120, тыс. руб.) |
| `gross_profit` | float | Валовая прибыль (`revenue - cost_of_sales`, тыс. руб.) |
| `other_expenses` | float | Прочие расходы (строка 2350 / `expense`, тыс. руб.) |
| `net_profit` | float | Чистая прибыль / убыток (строка 2400, тыс. руб.) |
| `assets` | float | Валюта баланса / Активы (строка 1600 / `actives`, тыс. руб.) |
| `capital` | float | Капитал и резервы (строка 1300, тыс. руб.) |
| `short_term_debt` | float | Краткосрочные обязательства (строка 1500, тыс. руб.) |
| `long_term_debt` | float | Долгосрочные обязательства (строка 1400, тыс. руб.) |
| `has_audit` | boolean | Признак наличия аудиторского заключения |
| `has_explanations` | boolean | Признак наличия пояснительной записки |
| `opendata_income` | float | Сумма доходов из реестра открытых данных ФНС |
| `opendata_expense` | float | Сумма расходов из реестра открытых данных ФНС |
| `source` | string | Источник данных (`"merged"` — сопоставлено, `"bo_nalog"` — ГИР БО, `"fns_opendata"` — реестр ФНС) |

## Пример ответа (организация не найдена)

```json
{
  "state": "complete",
  "results": {
    "fns_bo": {
      "result": {
        "status": 200,
        "found": false,
        "registry_status": "not_found",
        "data": []
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
  "method": "fns_bo",
  "intent": "Бухгалтерская (финансовая) отчетность юридического лица (ГИР БО / ФНС)",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["inn", "method"],
  "returns": [
    "state",
    "results.fns_bo.result.status",
    "results.fns_bo.result.found",
    "results.fns_bo.result.organization",
    "results.fns_bo.result.financial_summary",
    "results.fns_bo.result.data"
  ]
}
```

</details>
