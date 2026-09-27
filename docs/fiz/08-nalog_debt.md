---
title: "nalog_debt — проверка налоговой задолженности физлица по ИНН"
description: "Метод NEWDB nalog_debt проверяет задолженность физического лица по налогам и сборам по ИНН."
canonical_url: https://newdb.net/docs/fiz/08-nalog_debt/
meta:
  - name: keywords
    content: "NEWDB API, nalog_debt, налоговая задолженность, долги, ИНН, физлицо"
  - property: og:title
    content: "Налоговая задолженность физлица по ИНН — метод nalog_debt"
  - property: og:description
    content: "Проверка налоговых долгов физического лица по ИНН через API NEWDB."
---

# nalog_debt — Проверка налоговой задолженности по ИНН

POST `https://api.newdb.net/v2`

Метод выполняет проверку налоговой задолженности физического лица по ИНН. В ответе возвращаются сведения по найденной задолженности, а также технические данные выполнения запроса.

**Рекомендуем также:** проверка исполнительных производств — [fssp_person](01-fssp_person.md), проверка банкротства — [fedresurs_bankrot](05-fedresurs_bankrot.md).

**Раздел:** [Физические лица](index.md)

## Связанные страницы

- [Обзор раздела физические лица](index.md)
- [arbitr_person — Проверка арбитражных дел (физлица, КАД)](07-arbitr_person.md)
- [elmk_registry — Проверка статуса электронной медицинской книжки](09-elmk_registry.md)
- [pledge_person — Проверка залогов и обременений (ФНП + Федресурс)](06-pledge_person.md)

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
    "inn": "string (ИНН физического лица)",
    "country": "ru",
    "method": "nalog_debt"
  },
  "webhook": "https://your.host/whook",
  "requestId": "optional-string"
}
```

## Параметры

- `inn` — ИНН физического лица.
- `country` — код страны. Для РФ используйте `ru`.
- `method` — имя метода, всегда `nalog_debt`.

## Пример запроса
```http
POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_TOKEN

{
  "params": {
    "inn": "270392288605",
    "country": "ru",
    "method": "nalog_debt"
  },
  "requestId": "a5962f88-2916-4779-b59d-43c023faa899"
}
```

## Пример ответа
```json
{
  "params": {
    "inn": "270392288605",
    "country": "ru",
    "method": "nalog_debt"
  },
  "requestId": "a5962f88-2916-4779-b59d-43c023faa899",
  "datecreated": "2026-03-15 23:15:44",
  "state": "complete",
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "nalog_debt": {
      "taskId": "nalog-debt-local-task",
      "dateupdated": "2026-03-15 23:15:59",
      "result": {
        "status": 200,
        "data": [
          {
            "debt": {
              "total": "0.00",
              "items": []
            },
            "form": {
              "inn": "270392288605",
            },
            "http": {
              "status": 200
            },
            "network": {
              "final_url": "https://avtonalogi.ru/"
            },
            "page": {
              "title": "Проверка задолженности"
            },
            "request": {
              "method": "nalog_debt"
            }
          }
        ]
      }
    }
  },
  "finished": 1
}
```

## Что возвращает метод

- `results.nalog_debt.result.status` — HTTP-статус выполнения проверки.
- `results.nalog_debt.result.data[].debt` — сведения о найденной задолженности.
- `results.nalog_debt.result.data[].form` — данные, переданные в форму проверки.
- `results.nalog_debt.result.data[].http` — технические сведения HTTP-запроса.
- `results.nalog_debt.result.data[].network` — сетевые метаданные выполнения.
- `results.nalog_debt.result.data[].page` — сведения о странице/источнике.
- `results.nalog_debt.result.data[].request` — параметры исполненного запроса.

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "nalog_debt",
  "intent": "Проверка налоговой задолженности физического лица по ИНН",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["inn", "country", "method", "webhook", "requestId"],
  "returns": ["state", "results.nalog_debt.result.status", "results.nalog_debt.result.data"]
}
```

</details>


