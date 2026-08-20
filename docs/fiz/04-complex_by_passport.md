---
title: "complex_by_passport — комплексная проверка по паспорту"
description: "Метод NEWDB complex_by_passport объединяет проверки МВД, ФНС и ФССП для полного анализа физлица по данным паспорта."
canonical_url: https://newdb.net/docs/fiz/04-complex_by_passport/
meta:
  - name: keywords
    content: "NEWDB API, complex_by_passport, композитная проверка, ФНС, МВД, ФССП"
  - property: og:title
    content: "Комплексная проверка по паспорту — метод complex_by_passport"
  - property: og:description
    content: "Единый API запрос, объединяющий проверки паспорта, ИНН и исполнительных производств."
---

# complex_by_passport — Комплексная проверка по данным паспорта

POST `https://api.newdb.net/v2`

Метод выполняет комплексную проверку физического лица по серии и номеру паспорта РФ.
В рамках одного запроса могут выполняться следующие проверки:

- проверка паспорта на действительность по линии МВД (`passport_mvd`),
- проверка паспорта и получение ИНН по линии ФНС России (`passport_fns`),
- поиск исполнительных производств в ФССП (`fssp_person`),
- поиск сведений о залогах и обременениях по физлицу (`pledge_person`),
- проверка статуса ИП / сведений ЕГРИП ([`egrul_ip`](11-egrul_ip.md)).

Состав шагов в `steps` и `results` зависит от доступных идентификаторов и внутренних переходов между источниками. Например, после получения ИНН могут запускаться дополнительные проверки по найденным данным.

---

## Заголовки

 

Content-Type: application/json
X-API-KEY: <your_token>

 

## Входная схема (request)

```json
{
  "params": {
    "seria": "string (серия паспорта)",
    "number": "string (номер паспорта)",
    "firstname": "string",
    "lastname": "string",
    "secondname": "string",
    "dob": "YYYY-MM-DD",
    "country": "ru",
    "regioncode": "number (код региона ФССП или 100 для всех регионов)",
    "method": "complex_by_passport"
  },
  "webhook": "https://your.host/whook",
  "requestId": "optional-string"
}
```

`regioncode` используется для проверки ФССП внутри комплексной проверки. Передайте `regioncode: 100`, если нужно искать исполнительные производства по всем регионам ФССП.

---

## Пример запроса

```json
POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_TOKEN

{
  "params": {
    "seria": "0000",
    "number": "000000",
    "method": "complex_by_passport",
    "firstname": "Иван",
    "secondname": "Иванович",
    "lastname": "Иванов",
    "dob": "1990-01-01",
    "country": "ru",
    "regioncode": 77
  },
  "requestId": "11111111-2222-3333-4444-555555555555"
}
```

---

## Пример ответа

```json
{
  "params": {
    "seria": "0000",
    "number": "000000",
    "method": "complex_by_passport",
    "firstname": "Иван",
    "secondname": "Иванович",
    "lastname": "Иванов",
    "dob": "1990-01-01",
    "country": "ru",
    "regioncode": 77
  },
  "requestId": "11111111-2222-3333-4444-555555555555",
  "datecreated": "2026-03-17 12:00:00",
  "state": "complete",
  "balance": 9999,
  "steps": {
    "fssp_person": {
      "status": "complete",
      "error": null,
      "requestId": "aaaaaaaa-1111-2222-3333-bbbbbbbbbbbb"
    },
    "passport_mvd": {
      "status": "complete",
      "error": null,
      "requestId": "cccccccc-1111-2222-3333-dddddddddddd"
    },
    "passport_fns": {
      "status": "complete",
      "error": "passport_fns request failed with status 405",
      "requestId": "eeeeeeee-1111-2222-3333-ffffffffffff"
    },
    "pledge_person": {
      "status": "complete",
      "error": null,
      "requestId": "12121212-3434-5656-7878-909090909090"
    },
    "egrul_ip": {
      "status": "complete",
      "error": null,
      "requestId": "abababab-cdcd-efef-0101-232323232323"
    }
  },
  "results": {
    "passport_fns": {
      "taskId": "99999999-8888-7777-6666-555555555555",
      "result": {
        "status": 405,
        "data": []
      },
      "dateupdated": "2026-03-17 12:00:10"
    },
    "passport_mvd": {
      "taskId": "44444444-5555-6666-7777-888888888888",
      "dateupdated": "2026-03-17 12:00:12",
      "result": {
        "status": 200,
        "data": [
          {
            "doc_status": "Действительный"
          }
        ]
      }
    },
    "fssp_person": {
      "taskId": "10101010-2020-3030-4040-505050505050",
      "dateupdated": "2026-03-17 12:00:15",
      "result": {
        "status": 200,
        "data": []
      }
    },
    "pledge_person": {
      "taskId": "61616161-7272-8383-9494-050505050505",
      "dateupdated": "2026-03-17 12:00:18",
      "result": {
        "status": 200,
        "data": []
      }
    },
    "egrul_ip": {
      "taskId": "abab1111-cdcd-2222-efef-333344445555",
      "dateupdated": "2026-03-17 12:00:20",
      "result": {
        "status": 200,
        "data": []
      }
    }
  },
  "finished_at": "2026-03-17 12:00:21"
}
```

---

## x-ai (метаданные для AI)

```json
{
  "tools": [
    {
      "name": "complex_by_passport",
      "description": "Комплексная проверка человека по серии и номеру паспорта РФ. Может включать проверки МВД (действительность паспорта), ФНС (ИНН), ФССП (исполнительные производства), залоги и обременения физлица, а также сведения ЕГРИП.",
      "input_schema": {
        "seria": "string — серия паспорта",
        "number": "string — номер паспорта",
        "firstname": "string",
        "lastname": "string",
        "secondname": "string",
        "dob": "string (YYYY-MM-DD)",
        "country": "string (ru)",
        "regioncode": "number (код региона ФССП или 100 для всех регионов)",
        "method": "string (complex_by_passport)",
        "webhook": "string (URL)",
        "requestId": "string (optional)"
      },
      "output_schema": {
        "requestId": "string",
        "datecreated": "string (YYYY-MM-DD HH:MM:SS)",
        "state": "string (complete|processing|error)",
        "results": {
          "passport_mvd": {
            "taskId": "string",
            "dateupdated": "string",
            "result": {
              "status": "number",
              "data": [
                { "doc_status": "string — статус паспорта" }
              ]
            }
          },
          "passport_fns": {
            "taskId": "string",
            "dateupdated": "string",
            "result": {
              "status": "number",
              "data": [
                { "innfiz": "string — ИНН физического лица" }
              ]
            }
          },
          "fssp_person": {
            "taskId": "string",
            "dateupdated": "string",
            "result": {
              "status": "number",
              "data": "array — данные по исполнительным производствам"
            }
          },
          "pledge_person": {
            "taskId": "string",
            "dateupdated": "string",
            "result": {
              "status": "number",
              "data": "array — данные по залогам и обременениям"
            }
          },
          "egrul_ip": {
            "taskId": "string",
            "dateupdated": "string",
            "result": {
              "status": "number",
              "data": "array — сведения по ИП / ЕГРИП"
            }
          }
        }
      },
      "example": {
        "request": {
          "params": {
            "seria": "1234",
            "number": "123456",
            "firstname": "Петр",
            "secondname": "Петрович",
            "lastname": "Иванов",
            "dob": "1987-01-08",
            "country": "ru",
            "regioncode": 77,
            "method": "complex_by_passport"
          }
        }
      },
      "headers_required": ["X-API-KEY"]
    }
  ],
  "policy": "Если пользователь предоставляет серию, номер паспорта, ФИО, регион проживания и дату рождения — вызывай метод complex_by_passport. В ответе могут возвращаться проверки по МВД, ФНС, ФССП, залогам и сведениям по ИП."
}
```

---

 
