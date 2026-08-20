---
title: "complex_by_inn — комплексная проверка компании по ИНН"
description: "Метод NEWDB complex_by_inn объединяет проверки юрлица, судебные поиски и проверки руководителей/учредителей в одном запросе."
canonical_url: https://newdb.net/docs/legal/06-complex_by_inn/
meta:
  - name: keywords
    content: "NEWDB API, complex_by_inn, комплексная проверка компании, ИНН, ЕГРЮЛ, ФССП, ФНС, арбитраж, руководители"
  - property: og:title
    content: "Комплексная проверка компании по ИНН — method complex_by_inn"
  - property: og:description
    content: "Единый API-запрос NEWDB для проверки юридического лица и связанных физических лиц."
---

# complex_by_inn — Комплексная проверка компании по ИНН

POST `https://api.newdb.net/v2`

Метод выполняет комплексную проверку юридического лица по `inn` и собирает результаты нескольких источников в одном ответе. Проверки компании возвращаются в `steps` и `results` верхнего уровня. Проверки руководителей и учредителей группируются в `results.management` по ИНН физического лица.

**Раздел:** [Юридические лица](index.md)

## Что проверяется

Для компании запускаются проверки:

- сведения ЕГРЮЛ и состав руководителей/учредителей (`egrul`),
- банкротство юридического лица (`bankrot_legal`),
- исполнительные производства ФССП (`fssp_legal`),
- блокировки счетов ФНС (`fns_block`),
- залоги юридического лица (`pledge_legal`),
- арбитражные дела (`arbitr_legal`),
- поиск судебных дел по ИНН (`pravo_search_inn`),
- поиск судебных дел по названию компании (`pravo_search_company_name`).

Для каждого найденного руководителя или учредителя могут запускаться проверки:

- сведения ЕГРИП / статус ИП (`egrul_ip`),
- банкротство физлица (`bankrot_person`),
- арбитражные дела физлица (`arbitr_person`),
- налоговая задолженность (`nalog_debt`),
- блокировки счетов физлица (`fns_block_person`),
- залоги физлица (`pledge_person`),
- поиск судебных дел по ФИО (`pravo_search`).

## Когда использовать

Используйте метод, когда нужно получить единую карточку проверки контрагента: состояние компании, судебные и исполнительные риски, а также проверки связанных руководителей и учредителей.

## Заголовки

```text
Content-Type: application/json
X-API-KEY: <your_token>
```

## Входная схема (request)

```json
{
  "params": {
    "inn": "string (ИНН юрлица)",
    "country": "ru",
    "method": "complex_by_inn"
  },
  "webhook": "https://your.host/webhook",
  "requestId": "optional-string"
}
```

`webhook` необязателен. Если параметр передан, NEWDB отправит результат на указанный HTTPS URL после изменения состояния запроса. Получать результат также можно polling-запросом по `requestId`.

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
    "method": "complex_by_inn"
  },
  "webhook": "https://example.net/newdb-webhook",
  "requestId": "00000000-0000-4000-8000-000000000010"
}
```

## Lifecycle ответа

- `state: queued` — запрос поставлен в очередь.
- `state: in_progress` — проверки выполняются.
- `state: restart` — идет повторная попытка после неудачного шага.
- `state: complete` — запрос завершен, итоговые данные доступны в `results`.
- `state: failed` — запрос некорректен, недоступен к выполнению или недостаточно средств.

Статус конкретной проверки находится в `results.<method>.result.status`:

- `200` — проверка выполнена успешно.
- `500` — ошибка источника или системная ошибка; для асинхронного сценария можно продолжать ожидать финальный результат.

## Структура ответа

```text
params                         исходные параметры запроса
requestId                      идентификатор комплексного запроса
state                          состояние комплексного запроса
steps.<method>                 состояние проверки компании
results.<method>.result        результат проверки компании
results.management.<innfiz>    связанное физическое лицо
results.management.<innfiz>.roles
                               роли физлица в компании
results.management.<innfiz>.steps.<method>
                               состояние проверки физлица
results.management.<innfiz>.results.<method>.result
                               результат проверки физлица
```

Результаты проверок находятся в `results`, а промежуточные состояния — в `steps`.

## Пример ответа

```json
{
  "params": {
    "inn": "7712345678",
    "method": "complex_by_inn",
    "country": "ru"
  },
  "requestId": "00000000-0000-4000-8000-000000000010",
  "datecreated": "2026-07-11 21:53:24",
  "state": "complete",
  "balance": 90000,
  "steps": {
    "egrul": {
      "status": "complete",
      "requestId": "00000000-0000-4000-8000-000000000011"
    },
    "bankrot_legal": {
      "status": "complete",
      "requestId": "00000000-0000-4000-8000-000000000012"
    },
    "pravo_search_inn": {
      "status": "complete",
      "requestId": "00000000-0000-4000-8000-000000000013"
    },
    "pravo_search_company_name": {
      "status": "complete",
      "requestId": "00000000-0000-4000-8000-000000000014"
    }
  },
  "results": {
    "egrul": {
      "taskId": "00000000-0000-4000-8000-000000000021",
      "dateupdated": "2026-07-11 21:54:20",
      "result": {
        "status": 200,
        "data": [
          {
            "total_items": 1,
            "matches": [
              {
                "section": "ul",
                "inn": "7712345678",
                "ogrn": "1157746000000",
                "name_short": "ООО "ПРИМЕР"",
                "name_full": "ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ПРИМЕР"",
                "status": "Действующая организация",
                "region": "Г.МОСКВА"
              }
            ]
          }
        ]
      }
    },
    "bankrot_legal": {
      "taskId": "00000000-0000-4000-8000-000000000022",
      "dateupdated": "2026-07-11 21:54:30",
      "result": {
        "status": 200,
        "data": []
      }
    },
    "pravo_search_inn": {
      "taskId": "00000000-0000-4000-8000-000000000023",
      "dateupdated": "2026-07-11 21:54:35",
      "result": {
        "status": 200,
        "data": [],
        "meta": {
          "query": "7712345678",
          "count": 0
        }
      }
    },
    "pravo_search_company_name": {
      "taskId": "00000000-0000-4000-8000-000000000024",
      "dateupdated": "2026-07-11 21:54:40",
      "result": {
        "status": 200,
        "data": [],
        "meta": {
          "query": "ООО "ПРИМЕР"",
          "count": 0
        }
      }
    },
    "management": {
      "500100732259": {
        "innfiz": "500100732259",
        "name": "ИВАНОВ ИВАН ИВАНОВИЧ",
        "roles": [
          {
            "role": "director",
            "index": 1,
            "position": "ГЕНЕРАЛЬНЫЙ ДИРЕКТОР"
          }
        ],
        "steps": {
          "egrul_ip": {
            "status": "complete",
            "requestId": "00000000-0000-4000-8000-000000000031"
          },
          "bankrot_person": {
            "status": "complete",
            "requestId": "00000000-0000-4000-8000-000000000032"
          },
          "arbitr_person": {
            "status": "complete",
            "requestId": "00000000-0000-4000-8000-000000000033"
          },
          "pravo_search": {
            "status": "complete",
            "requestId": "00000000-0000-4000-8000-000000000034"
          }
        },
        "results": {
          "egrul_ip": {
            "taskId": "00000000-0000-4000-8000-000000000041",
            "result": {
              "status": 200,
              "data": []
            }
          },
          "bankrot_person": {
            "taskId": "00000000-0000-4000-8000-000000000042",
            "result": {
              "status": 200,
              "data": []
            }
          },
          "arbitr_person": {
            "taskId": "00000000-0000-4000-8000-000000000043",
            "result": {
              "status": 200,
              "data": []
            }
          },
          "pravo_search": {
            "taskId": "00000000-0000-4000-8000-000000000044",
            "result": {
              "status": 200,
              "data": [],
              "meta": {
                "query": "ИВАНОВ ИВАН ИВАНОВИЧ",
                "count": 0
              }
            }
          }
        }
      }
    }
  },
  "finished_at": "2026-07-11 21:55:10"
}
```

## Ошибки валидации

Если запрос некорректен, API возвращает `errors_info`:

```json
{
  "params": {
    "method": "complex_by_inn",
    "country": "ru"
  },
  "requestId": "00000000-0000-4000-8000-000000000099",
  "errors_info": [
    {
      "error": "Отсутствует обязательный параметр: inn",
      "error_code": 400,
      "docs_url": "https://newdb.net/docs/legal/06-complex_by_inn/"
    }
  ]
}
```

`400` означает ошибку параметров запроса. `500` означает системную ошибку сервиса или ошибку источника данных.

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "complex_by_inn",
  "intent": "Комплексная проверка юридического лица по ИНН с проверками компании, руководителей и учредителей",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["inn", "method", "country"],
  "optional_fields": ["webhook", "requestId"],
  "returns": [
    "state",
    "steps.<method>",
    "results.<method>.result.status",
    "results.<method>.result.data",
    "results.management.<innfiz>.steps.<method>",
    "results.management.<innfiz>.results.<method>.result"
  ]
}
```

</details>
