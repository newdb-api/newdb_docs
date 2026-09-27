---
title: "passport_mvd — проверка паспорта РФ на действительность"
description: "Метод NEWDB passport_mvd подтверждает действительность паспорта РФ по серии, номеру и ФИО через базы МВД."
canonical_url: https://newdb.net/docs/fiz/03-passport_mvd/
meta:
  - name: keywords
    content: "NEWDB API, passport_mvd, проверка паспорта, МВД, верификация личности"
  - property: og:title
    content: "Проверка паспорта РФ — метод passport_mvd"
  - property: og:description
    content: "Спецификация запроса, заголовков и ответов метода passport_mvd для подтверждения действительности паспорта."
---

# passport_mvd — Проверка паспорта РФ на действительность

POST `https://api.newdb.net/v2`

Проверяет паспорт РФ по серии/номеру и фамилии, имени.

**Рекомендуем также:** комплексная проверка по паспорту — [complex_by_passport](04-complex_by_passport.md).

**Раздел:** [Физические лица](index.md)

## Связанные страницы

- [Обзор раздела физические лица](index.md)
- [passport_fns — Проверка  паспорта/ИНН через ФНС](02-passport_fns.md)
- [complex_by_passport — Комплексная проверка по данным паспорта](04-complex_by_passport.md)
- [fssp_person — Проверка ФЛ по базе ФССП](01-fssp_person.md)

## Когда использовать

Используйте метод, когда нужно проверить физлицо, документ или связанный с ним государственный реестр по структурированным данным.

## Типовые кейсы

- Проверка анкеты клиента перед onboarding или выдачей услуги
- Автоматическая верификация паспорта, ИНН, задолженностей или ограничений
- Обогащение внутренней карточки физлица данными из внешнего источника

## Заголовки
```
Content-Type: application/json
X-API-KEY: <your_token>
```

## Входная схема (request)
```json
{
  "params": {
    "seria": "string",
    "number": "string",
    "firstname": "string",
    "lastname": "string",
    "secondname": "string",
    "dob": "YYYY-MM-DD",
    "method": "passport_mvd",
    "country": "ru"
  },
  "webhook": "https://your.host/whook",
  "requestId": "optional-string"
}
}
```

## Пример запроса

POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_TOKEN
```
{
  "params": {
    "seria": "0802",
    "number": "649286",
    "firstname": "Петр",
    "lastname": "Семенов",
    "secondname": "Николаевич",
    "dob": "1937-01-03",
    "country": "ru",
    "method": "passport_mvd"
  },
  "webhook": "https://webhook_url/",
  "requestId": "19342f89-2916-4779-b59d-43c012f1a781"
}
```

## Пример ответа
```json
{
    "params": {
        "seria": "0802",
        "number": "649116",
        "method": "passport_mvd",
        "firstname": "Петр",
        "lastname": "Иванов",
    },
    "requestId": "32ec1efd-3f6a-76a2-9c4b-68cbf4b52089",
    "token": "6fa1aa70-ecfe-41f5-b56e-d9da2b79fc90",
    "tasks": 203,
    "is_repeat": false,
    "results": {
        "passport_mvd": {
            "taskId": "a8e29673-2978-4e28-95a1-a42d0ad4328e",
            "dateupdated": "2025-11-05 08:49:13",
            "result": {
                "status": 200,
                "data": [
                    {
                        "status": "Действительный"
                    }
                ]
            }
        }
    },
    "finished": 1,
    "state": "complete",
    "datecreated": "2025-11-02 22:48:00"
}
```




## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "passport_mvd",
  "intent": "Проверка действительности паспорта РФ по базе МВД",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["seria", "number", "firstname", "lastname", "secondname", "dob", "method", "country", "webhook", "requestId"],
  "returns": ["state", "results.passport_mvd.result.status", "results.passport_mvd.result.data"]
}
```

</details>


