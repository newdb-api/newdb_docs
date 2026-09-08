---
title: "intellectual_property — поиск патентов и интеллектуальной собственности (Роспатент)"
description: "Метод NEWDB intellectual_property осуществляет поиск зарегистрированных патентов, полезных моделей и изобретений в базе Роспатента по ФИО автора, патентообладателя или наименованию организации."
canonical_url: https://newdb.net/docs/property/06-intellectual_property/
meta:
  - name: keywords
    content: "NEWDB API, intellectual_property, Роспатент, патенты, изобретения, полезные модели, интеллектуальная собственность, патентный поиск"
  - property: og:title
    content: "Поиск патентов и интеллектуальной собственности — метод intellectual_property"
  - property: og:description
    content: "Поиск по реестрам Роспатента по физическим и юридическим лицам через API NEWDB."
---

# intellectual_property — Поиск патентов и интеллектуальной собственности

POST `https://api.newdb.net/v2`

Метод выполняет поиск объектов патентных прав и интеллектуальной собственности в официальной поисковой платформе Роспатента (Федеральная служба по интеллектуальной собственности). Поиск осуществляется по ФИО физического лица (автора или патентообладателя) либо по наименованию юридического лица.

**Раздел:** [Имущество](index.md)

## Связанные страницы

- [Обзор раздела имущество](index.md)
- [rosreestr — Проверка объекта недвижимости](01-rosreestr.md)
- [pledge_property — Проверка залога и обременений по ID](02-pledge_property.md)
- [pledge_vin — Проверка залога и обременений по VIN](03-pledge_vin.md)
- [nspd_cadastr — Геоданные по кадастровому номеру](04-nspd_cadastr.md)

## Когда использовать

- Комплексная проверка активов (Due Diligence) физических лиц, основателей бизнеса, ученых и ключевых сотрудников
- Анализ нематериальных активов юридического лица перед сделкой M&A или инвестициями
- Проверка наличия патентов, полезных моделей и промышленных образцов у подрядчиков или конкурентов
- Выявление инновационного потенциала и научно-технических разработок компании

## Заголовки

```http
Content-Type: application/json
X-API-KEY: <your_token>
```

## Входная схема (request)

```json
{
  "params": {
    "method": "intellectual_property",
    "query": "Иванов Иван Иванович",
    "limit": 10,
    "offset": 0,
    "transport": "auto"
  },
  "requestId": "00000000-0000-4000-8000-000000000001",
  "webhook": "https://your.host/webhook"
}
```

## Параметры запроса

| Параметр | Тип | Обязательный | По умолчанию | Описание |
|---|---|---|---|---|
| `method` | `string` | **Да** | — | Имя метода, всегда `intellectual_property`. |
| `query` | `string` | **Да** | — | ФИО физического лица или наименование организации (от 1 до 1000 символов). Ищется по полю патентообладателей и авторов (`PE`). |
| `limit` | `integer` | Нет | `10` | Количество возвращаемых результатов на страницу (от 1 до 100). |
| `offset` | `integer` | Нет | `0` | Смещение для пагинации (целое число >= 0). |
| `transport` | `string` | Нет | `"auto"` | Режим сетевого взаимодействия: `"auto"` (быстрый HTTP с fallback на CDP), `"http"` (только прямой API-запрос), `"cdp"` (запрос через браузер Playwright). |
| `datasets` | `array` | Нет | — | Список идентификаторов баз данных/датасетов Роспатента для выборки. |
| `include_raw` | `boolean` | Нет | `false` | Если `true`, в ответе возвращается исходный сырой JSON от Роспатента в поле `raw_response`. |

## Примеры запросов

### Поиск патентов по ФИО физического лица

```http
POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_API_TOKEN

{
  "params": {
    "method": "intellectual_property",
    "query": "Иванов Иван Иванович"
  },
  "requestId": "00000000-0000-4000-8000-000000000001"
}
```

### Поиск с пагинацией и указанием лимита

```http
POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_API_TOKEN

{
  "params": {
    "method": "intellectual_property",
    "query": "ООО ПРИМЕР",
    "limit": 25,
    "offset": 0
  },
  "requestId": "00000000-0000-4000-8000-000000000002"
}
```

## Пример ответа

```json
{
  "params": {
    "method": "intellectual_property",
    "query": "Иванов Иван Иванович",
    "taskId": "task-ip-001"
  },
  "requestId": "00000000-0000-4000-8000-000000000001",
  "state": "complete",
  "status": "success",
  "results": {
    "intellectual_property": {
      "taskId": "task-ip-001",
      "dateupdated": "2026-09-08 14:42:00",
      "result": {
        "status": 200,
        "found": true,
        "data": [
          {
            "id": "RUPAT_24987_20230510",
            "dataset": "ru_patents",
            "publishing_office": "RU",
            "document_number": "24987",
            "kind": "U1",
            "publication_date": "2023-05-10",
            "application_number": "2022134567",
            "filing_date": "2022-12-15",
            "title": "УСТРОЙСТВО ДЛЯ МОНИТОРИНГА И ДИАГНОСТИКИ СИСТЕМ",
            "language": "ru",
            "inventors": ["Иванов И.И.", "Петров П.П."],
            "patentees": ["Иванов Иван Иванович", "ООО ИННОВАЦИИ"],
            "applicants": ["ООО ИННОВАЦИИ"],
            "classification": {
              "ipc": ["G01R 31/00", "G06F 17/00"]
            },
            "description_snippet": "Изобретение относится к области измерительной техники и автоматизированного контроля...",
            "drawings": [
              {
                "url": "https://searchplatform.rospatent.gov.ru/drawings/24987/fig1.png"
              }
            ]
          }
        ],
        "meta": {
          "query": "Иванов Иван Иванович",
          "total": 7,
          "available": 7,
          "count": 1,
          "offset": 0,
          "limit": 10,
          "has_more": false,
          "next_offset": null,
          "transport": "http",
          "source_url": "https://searchplatform.rospatent.gov.ru/patents_advanced"
        }
      }
    }
  }
}
```

## Интерпретация полей ответа

- `status` (`integer`): `200` при успешном поиске, `400` при недопустимом запросе.
- `found` (`boolean`): `true`, если найден хотя бы один патент.
- `data` (`array`): список найденных патентов и свидетельств:
  - `document_number` (`string`): регистрационный номер патента / свидетельства;
  - `kind` (`string`): код вида документа (например, `A`, `C1`, `C2` — изобретения; `U1` — полезные модели);
  - `publication_date` (`string`): дата официальной публикации патента;
  - `application_number` (`string`): номер заявки на патент;
  - `filing_date` (`string`): дата подачи заявки (приоритет);
  - `title` (`string`): название изобретения или полезной модели;
  - `patentees` (`array of strings`): список патентообладателей (правообладателей);
  - `inventors` (`array of strings`): список авторов разработки;
  - `classification` (`object`): индексы Международной патентной классификации (МПК / IPC);
  - `description_snippet` (`string`): фрагмент реферата или описания;
  - `drawings` (`array`): ссылки на графические чертежи и схемы патента.
- `meta` (`object`): метаданные выдачи (`total` — всего найдено в реестре, `has_more` — есть ли следующие страницы, `transport` — использованный транспорт).

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "intellectual_property",
  "intent": "Поиск патентов и объектов интеллектуальной собственности в Роспатенте",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["method", "query"],
  "optional_fields": ["limit", "offset", "transport", "datasets", "include_raw"],
  "returns": [
    "results.intellectual_property.result.status",
    "results.intellectual_property.result.found",
    "results.intellectual_property.result.data",
    "results.intellectual_property.result.meta"
  ]
}
```

</details>
