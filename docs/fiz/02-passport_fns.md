---
title: "passport_fns — проверка паспорта и ИНН через ФНС"
description: "Метод NEWDB passport_fns для проверки паспорта РФ и поиска ИНН физлица через сервисы Федеральной налоговой службы."
canonical_url: https://newdb.net/docs/fiz/02-passport_fns/
meta:
  - name: keywords
    content: "NEWDB API, passport_fns, ФНС, проверка паспорта, ИНН"
  - property: og:title
    content: "Проверка паспорта и ИНН через ФНС — метод passport_fns"
  - property: og:description
    content: "JSON-схема запроса и ответы метода passport_fns для получения ИНН по паспортным данным."
---

# passport_fns — Проверка  паспорта/ИНН через ФНС

POST `https://api.newdb.net/v2`

Проверка паспорта и ИНН через сервисы ФНС.

**Рекомендуем также:** комплексная проверка по паспорту — [complex_by_passport](04-complex_by_passport.md).

**Раздел:** [Физические лица](index.md)

## Связанные страницы

- [Обзор раздела физические лица](index.md)
- [fssp_person — Проверка ФЛ по базе ФССП](01-fssp_person.md)
- [passport_mvd — Проверка паспорта РФ на действительность](03-passport_mvd.md)
- [complex_by_passport — Комплексная проверка по данным паспорта](04-complex_by_passport.md)

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
    "dob": "string" //yyyy-mm-dd,
    "country": "ru",
    "method": "passport_fns"
  },
  "webhook": "https://webhook_url/",
  "requestId": "19342f89-2916-4779-b59d-43c012f1a781"
}
```

## Пример запроса
```http
POST /v2  HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_TOKEN

{
"params":{
"seria":"4015",
"number":"350278",
"firstname": "Александр", 
"secondname": "Сергеевич",
"lastname": "Малина", 

"dob": "1990-12-17",
"country": "ru",
"method":"passport_fns"
},
"webhook":"https://webhook_url/",
"requestId":"19342f89-2916-4779-b59d-43c012f1a781"
}
```

## Пример ответа (ИНН найден)
```json
{
  "state": "complete",
  "results": {
    "company": {
      "result": {
        "status": 200,
        "data": [
          { "innfiz": "7703245603"  }
        ]
      }
    }
  }
}
```


## Пример ответа (ИНН не найден)
```json
{
  "state": "complete",
  "results": {
    "company": {
      "result": {
        "status": 200,
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
  "method": "passport_fns",
  "intent": "Проверка соответствия паспорта и ИНН физического лица через ФНС",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["seria", "number", "firstname", "lastname", "secondname", "dob", "country", "method", "webhook", "requestId"],
  "returns": ["state", "results.passport_fns.result.status", "results.passport_fns.result.data"]
}
```

</details>


