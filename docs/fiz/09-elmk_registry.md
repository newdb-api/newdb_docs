---
title: "elmk_registry — проверка статуса электронной медицинской книжки"
description: "Метод NEWDB elmk_registry проверяет статус электронной личной медицинской книжки по данным Единого реестра выданных ЭЛМК Роспотребнадзора."
canonical_url: https://newdb.net/docs/fiz/09-elmk_registry/
meta:
  - name: keywords
    content: "NEWDB API, elmk_registry, ЭЛМК, электронная медицинская книжка, Роспотребнадзор, реестр ЭЛМК"
  - property: og:title
    content: "Проверка статуса ЭЛМК — метод elmk_registry"
  - property: og:description
    content: "Проверка статуса электронной медицинской книжки по данным реестра Роспотребнадзора через API NEWDB."
---

# elmk_registry — Проверка статуса электронной медицинской книжки

POST `https://api.newdb.net/v2`

Метод проверяет статус электронной личной медицинской книжки по данным Роспотребнадзора в Едином реестре выданных ЭЛМК.

**Рекомендуем также:** проверка физлица по базе ФССП — [fssp_person](01-fssp_person.md), налоговая задолженность по ИНН — [nalog_debt](08-nalog_debt.md).

**Раздел:** [Физические лица](index.md)

## Связанные страницы

- [Обзор раздела физические лица](index.md)
- [nalog_debt — Проверка налоговой задолженности по ИНН](08-nalog_debt.md)
- [fns_block_person — Проверка блокировок счетов физлица (ФНС)](10-fns_block_person.md)
- [arbitr_person — Проверка арбитражных дел (физлица, КАД)](07-arbitr_person.md)

## Когда использовать

Используйте метод, когда нужно проверить физлицо, документ или связанный с ним государственный реестр по структурированным данным.

## Типовые кейсы

- Проверка анкеты клиента перед onboarding или выдачей услуги
- Автоматическая верификация паспорта, ИНН, задолженностей или ограничений
- Обогащение внутренней карточки физлица данными из внешнего источника

## Заголовки
```http
Content-Type: application/json
X-API-KEY: <your_token>
```

## Входная схема (request)
```json
{
  "params": {
    "elmk_number": "string (номер ЭЛМК)",
    "snils": "string (СНИЛС)",
    "country": "ru",
    "method": "elmk_registry"
  },
  "webhook": "https://your.host/webhook",
  "requestId": "optional-string"
}
```

## Параметры

- `elmk_number` — номер электронной личной медицинской книжки.
- `snils` — СНИЛС владельца ЭЛМК.
- `country` — код страны. Для РФ используйте `ru`.
- `method` — имя метода, всегда `elmk_registry`.

## Пример запроса
```http
POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_TOKEN

{
  "params": {
    "elmk_number": "00-00-000000-00",
    "snils": "000-000-000 00",
    "country": "ru",
    "method": "elmk_registry"
  },
  "webhook": "https://newdb.net/for_example_webhook",
  "requestId": "11111111-2222-3333-4444-555555555555"
}
```

## Пример ответа
```json
{
  "params": {
    "elmk_number": "00-00-000000-00",
    "snils": "000-000-000 00",
    "country": "ru",
    "method": "elmk_registry"
  },
  "webhook": "https://newdb.net/for_example_webhook",
  "requestId": "11111111-2222-3333-4444-555555555555",
  "datecreated": "2026-03-17 22:39:50",
  "state": "complete",
  "balance": 9710,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "elmk_registry": {
      "taskId": "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
      "dateupdated": "2026-03-17 22:39:59",
      "result": {
        "status": 200,
        "data": [
          {
            "elmk_status_name": "Не действует",
            "elmk_number": "00-00-000000-00",
            "first_name": "Мария",
            "last_name": "И***",
            "middle_name": "Ивановна",
            "snils": "000***00",
            "work_type": [
              "Работы, при выполнении которых осуществляется контакт с пищевыми продуктами в процессе их производства, хранения, транспортировки и реализации"
            ],
            "decision_dt": "2025-03-20T03:29:49Z",
            "med_opinions_dt": "2026-02-22",
            "certification_dt": "2025-03-18",
            "recertification_dt": "2026-03-18",
            "fbuz_short_name": "ФБУЗ \"Центр гигиены и эпидемиологии\"",
            "created_fullname": "ЕПГУ"
          }
        ]
      }
    }
  }
}
```

## Что возвращает метод

- `results.elmk_registry.result.status` — HTTP-статус выполнения проверки.
- `results.elmk_registry.result.data[].elmk_status_name` — текущий статус ЭЛМК.
- `results.elmk_registry.result.data[].elmk_number` — номер ЭЛМК.
- `results.elmk_registry.result.data[].first_name` — имя владельца ЭЛМК.
- `results.elmk_registry.result.data[].last_name` — фамилия владельца ЭЛМК, может быть частично маскирована.
- `results.elmk_registry.result.data[].middle_name` — отчество владельца ЭЛМК.
- `results.elmk_registry.result.data[].snils` — СНИЛС в маскированном виде.
- `results.elmk_registry.result.data[].work_type` — перечень видов работ, для которых оформлена книжка.
- `results.elmk_registry.result.data[].decision_dt` — дата и время принятия решения по ЭЛМК.
- `results.elmk_registry.result.data[].med_opinions_dt` — дата медицинского заключения.
- `results.elmk_registry.result.data[].certification_dt` — дата прохождения аттестации.
- `results.elmk_registry.result.data[].recertification_dt` — дата очередной переаттестации.
- `results.elmk_registry.result.data[].fbuz_short_name` — краткое наименование учреждения.
- `results.elmk_registry.result.data[].created_fullname` — источник создания записи.

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "elmk_registry",
  "intent": "Проверка статуса электронной медицинской книжки",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["elmk_number", "snils", "country", "method", "webhook", "requestId"],
  "returns": ["state", "results.elmk_registry.result.status", "results.elmk_registry.result.data"]
}
```

</details>


