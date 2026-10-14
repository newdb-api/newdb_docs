---
title: "pledge_legal — проверка залогов и обременений юрлица"
description: "Метод NEWDB pledge_legal ищет сведения о залогах, лизинге и иных обременениях юридического лица по ИНН в ФНП и Федресурсе."
canonical_url: https://newdb.net/docs/legal/07-pledge_legal/
meta:
  - name: keywords
    content: "NEWDB API, pledge_legal, залоги юрлица, лизинг, ФНП, Федресурс, ИНН"
  - property: og:title
    content: "Проверка залогов и обременений юрлица — метод pledge_legal"
  - property: og:description
    content: "Получите сведения ФНП и Федресурса о залогах, лизинге и обременениях юридического лица по ИНН через API NEWDB."
---

# pledge_legal — Проверка залогов и обременений юрлица

POST `https://api.newdb.net/v2`

Метод выполняет поиск сведений о залогах, договорах лизинга и других обременениях юридического лица по `inn`.

Используются источники:

- **ФНП** — реестр уведомлений о залоге движимого имущества;
- **Федресурс** — сообщения о договорах финансовой аренды, правах залога и изменениях обременений.

**Раздел:** [Юридические лица](index.md)

## Связанные страницы

- [Обзор раздела юридические лица](index.md)
- [egrul — Сведения ЕГРЮЛ / Прозрачный бизнес](04-egrul.md)
- [fssp_legal — Исполнительные производства ФССП по ИНН юрлица](05-fssp_legal.md)
- [complex_by_inn — Комплексная проверка компании по ИНН](06-complex_by_inn.md)

## Когда использовать

Используйте метод, когда нужно проверить наличие залогов, лизинга или иных обременений у компании перед сделкой, финансированием, закупкой или мониторингом контрагента.

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
    "method": "pledge_legal"
  },
  "webhook": "https://your.host/webhook",
  "requestId": "optional-string"
}
```

## Пример запроса

```json
{
  "params": {
    "inn": "7712345678",
    "country": "ru",
    "method": "pledge_legal"
  },
  "requestId": "00000000-0000-4000-8000-000000000081"
}
```

## Пример ответа

```json
{
  "params": {
    "inn": "7712345678",
    "country": "ru",
    "method": "pledge_legal",
    "newdb_qid": "EXAMPLE_QID"
  },
  "requestId": "00000000-0000-4000-8000-000000000081",
  "datecreated": "2026-07-12 15:04:09",
  "state": "complete",
  "balance": 90000,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "pledge_legal": {
      "taskId": "00000000-0000-4000-8000-000000000082",
      "dateupdated": "2026-07-12 15:04:30",
      "result": {
        "status": 200,
        "data": [
          {
            "fnp": [],
            "fedresurs": [
              {
                "source": "Федресурс",
                "message_number_and_date": "00000001 от 12.07.2026",
                "message_number": "00000001",
                "message_url": "https://fedresurs.ru/sfactmessages/00000000-0000-4000-8000-000000000083",
                "message_type": "Изменение договора финансовой аренды (лизинга)",
                "lessee": "ООО \"ПРИМЕР\"",
                "lessor": "Сведения скрыты",
                "found_in_message": "... Лизингополучатель: ООО \"ПРИМЕР\", ОГРН: 1157746000000, ИНН: 7712345678 Договор: 000/26 от 30.06.2026 ...",
                "links": [
                  {
                    "text": "00000001 от 12.07.2026",
                    "url": "https://fedresurs.ru/sfactmessages/00000000-0000-4000-8000-000000000083"
                  }
                ],
                "encumbrance_guid": "00000000-0000-4000-8000-000000000083",
                "encumbrance_publish_date": "2026-07-12T12:15:37.142276",
                "encumbrance_type": "ChangeFinancialLeaseContract2",
                "encumbrance_highlights_raw": [
                  "Номер сообщения: 00000001\nЛизингополучатель: ООО \"ПРИМЕР\", ОГРН: 1157746000000, ИНН: <res>7712345678</res>\nДоговор: 000/26 от 30.06.2026"
                ],
                "encumbrance_highlights_text": "Номер сообщения: 00000001\nЛизингополучатель: ООО \"ПРИМЕР\", ОГРН: 1157746000000, ИНН: <res>7712345678</res>\nДоговор: 000/26 от 30.06.2026",
                "encumbrance_message_url": "https://fedresurs.ru/message/00000000-0000-4000-8000-000000000083",
                "json_extra": {
                  "number": "00000001",
                  "guid": "00000000-0000-4000-8000-000000000083",
                  "publishDate": "2026-07-12T12:15:37.142276",
                  "type": "ChangeFinancialLeaseContract2",
                  "lessee": {
                    "guid": "00000000-0000-4000-8000-000000000084",
                    "type": "Company",
                    "role": "Lessee",
                    "isHidden": false,
                    "name": "ООО \"ПРИМЕР\"",
                    "inn": "7712345678",
                    "ogrn": "1157746000000"
                  },
                  "lessor": {
                    "guid": "00000000-0000-0000-0000-000000000000",
                    "type": "Company",
                    "role": "Lessor",
                    "isHidden": true,
                    "name": "",
                    "inn": "",
                    "ogrn": "",
                    "ogrnip": "",
                    "regNum": ""
                  },
                  "message_url": "https://fedresurs.ru/message/00000000-0000-4000-8000-000000000083"
                }
              }
            ],
            "fnp_urls": []
          }
        ]
      }
    }
  },
  "finished": 1
}
```

## Поля результата `results.pledge_legal.result.data[]`

| Поле | Описание |
|------|----------|
| `fnp` | Найденные уведомления ФНП о залоге движимого имущества. Может быть пустым массивом. |
| `fedresurs` | Найденные сообщения Федресурса о залоге, лизинге и иных обременениях. |
| `fnp_urls` | Ссылки на найденные записи ФНП, если источник вернул отдельные URL. |

## Поля `fedresurs[]`

| Поле | Описание |
|------|----------|
| `source` | Источник записи, обычно `Федресурс`. |
| `message_number_and_date` | Номер и дата сообщения. |
| `message_url` | Ссылка на сообщение в источнике. |
| `message_type` | Тип сообщения: заключение договора лизинга, изменение договора, возникновение права залога и т.д. |
| `lessee` | Лизингополучатель или слабая сторона сделки. |
| `lessor` | Лизингодатель или сильная сторона сделки, если не скрыта источником. |
| `found_in_message` | Фрагмент сообщения, где найден проверяемый ИНН. |
| `json_extra` | Расширенные структурированные данные источника. |

## Ошибки валидации

Если отсутствует обязательный параметр, API возвращает `errors_info`:

```json
{
  "params": {
    "country": "ru",
    "method": "pledge_legal"
  },
  "requestId": "00000000-0000-4000-8000-000000000099",
  "errors_info": [
    {
      "error": "Отсутствует обязательный параметр: inn",
      "error_code": 400,
      "docs_url": "https://newdb.net/docs/legal/07-pledge_legal/"
    }
  ]
}
```

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "pledge_legal",
  "intent": "Проверка залогов, лизинга и обременений юридического лица по ИНН",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["inn", "country", "method"],
  "optional_fields": ["webhook", "requestId"],
  "returns": ["state", "results.pledge_legal.result.status", "results.pledge_legal.result.data"]
}
```

</details>
