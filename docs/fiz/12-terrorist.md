---
title: "terrorist — проверка на причастность к терроризму и распространению ОМУ"
description: "Метод NEWDB terrorist проверяет совпадения по перечням причастных к экстремистской деятельности, терроризму и распространению оружия массового уничтожения."
canonical_url: https://newdb.net/docs/fiz/12-terrorist/
meta:
  - name: keywords
    content: "NEWDB API, terrorist, терроризм, ОМУ, экстремизм, проверка физлица"
  - property: og:title
    content: "Проверка на причастность к терроризму и ОМУ — метод terrorist"
  - property: og:description
    content: "Проверка физического лица по ФИО и дате рождения на совпадения с перечнями терроризма, экстремизма и распространения ОМУ."
---

# terrorist — Проверка на причастность к терроризму и распространению ОМУ

POST `https://api.newdb.net/v2`

Метод выполняет поиск совпадений по ФИО и дате рождения в перечнях лиц, причастных к экстремистской деятельности, терроризму и распространению оружия массового уничтожения.

**Раздел:** [Физические лица](index.md)

## Связанные страницы

- [Обзор раздела физические лица](index.md)
- [egrul_ip — Проверка статуса ИП / сведений ЕГРИП](11-egrul_ip.md)
- [fns_block_person — Проверка блокировок счетов физлица (ФНС)](10-fns_block_person.md)
- [elmk_registry — Проверка статуса электронной медицинской книжки](09-elmk_registry.md)

## Когда использовать

Используйте метод, когда нужно проверить физлицо, документ или связанный с ним государственный реестр по структурированным данным.

## Типовые кейсы

- Проверка анкеты клиента перед onboarding или выдачей услуги
- Автоматическая верификация паспорта, ИНН, задолженностей или ограничений
- Обогащение внутренней карточки физлица данными из внешнего источника

## Заголовки

```text
Content-Type: application/json
X-API-KEY: <your_token>
```

## Входная схема (request)

```json
{
  "params": {
    "lastname": "string",
    "firstname": "string",
    "secondname": "string",
    "dob": "YYYY-MM-DD",
    "country": "string (ru)",
    "method": "terrorist"
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
    "method": "terrorist",
    "lastname": "АЛИМОВ",
    "firstname": "РЕФАТ",
    "secondname": "МАМЕТОВИЧ",
    "dob": "1991-10-28",
    "country": "ru"
  },
  "requestId": "b4c68a6b-44cc-430e-bbeb-a5518014bca4"
}
```

## Пример ответа

```json
{
  "params": {
    "method": "terrorist",
    "lastname": "АЛИМОВ",
    "firstname": "РЕФАТ",
    "secondname": "МАМЕТОВИЧ",
    "dob": "1991-10-28",
    "country": "ru"
  },
  "requestId": "b4c68a6b-44cc-430e-bbeb-a5518014bca4",
  "datecreated": "2026-03-20 09:00:00",
  "state": "complete",
  "balance": 9696,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "terrorist": {
      "taskId": "0a95a93c-57f0-45f3-90ca-548729e08c68",
      "dateupdated": "2026-03-20 09:00:04",
      "result": {
        "status": 200,
        "data": [
          {
            "query": "АЛИМОВ РЕФАТ МАМЕТОВИЧ 28.10.1991 г.р.",
            "suggestions": [
              "1269. АЛИМОВ РЕФАТ МАМЕТОВИЧ*, 28.10.1991 г.р. , Г. ДУШАНБЕ ТАДЖИКСКОЙ ССР;"
            ]
          }
        ]
      }
    }
  }
}
```

## Поля результата `results.terrorist.result.data[]`

| Поле | Описание |
|------|----------|
| `query` | Поисковая строка, сформированная из ФИО и даты рождения |
| `suggestions` | Список найденных совпадений или похожих записей в перечне |

## Пример ответа без совпадений

```json
{
  "state": "complete",
  "results": {
    "terrorist": {
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
  "method": "terrorist",
  "intent": "Проверка физического лица по перечням терроризма и ОМУ",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["firstname", "lastname", "secondname", "dob", "method", "country"],
  "returns": ["state", "results.terrorist.result.status", "results.terrorist.result.data"]
}
```

</details>


