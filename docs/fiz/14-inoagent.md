---
title: "inoagent — проверка физлица в реестре иностранных агентов"
description: "Метод NEWDB inoagent ищет физическое лицо в реестре иностранных агентов Минюста России по ФИО."
canonical_url: https://newdb.net/docs/fiz/14-inoagent/
meta:
  - name: keywords
    content: "NEWDB API, inoagent, Минюст, иностранные агенты, физлица, реестр иностранных агентов"
  - property: og:title
    content: "Проверка физлица в реестре иностранных агентов — метод inoagent"
  - property: og:description
    content: "Поиск физического лица в реестре иностранных агентов Минюста России по фамилии с фильтрацией результата по фамилии и имени."
---

# inoagent — Проверка физлица в реестре иностранных агентов

POST `https://api.newdb.net/v2`

Метод выполняет поиск физического лица в публичном реестре иностранных агентов Минюста России и возвращает найденные записи по ФИО.

**Раздел:** [Физические лица](index.md)

## Связанные страницы

- [Обзор раздела физические лица](index.md)
- [terrorist — Проверка по перечням терроризма, экстремизма и ОМУ](12-terrorist.md)
- [mvd_wanted — Проверка физлица в розыске МВД](13-mvd_wanted.md)
- [fssp_person — Исполнительные производства ФССП](01-fssp_person.md)

## Когда использовать

- Проверка физлица по реестру иностранных агентов
- Комплаенс-проверка клиента, сотрудника или контрагента-физлица
- Обогащение внутренней карточки физлица сведениями из открытого источника Минюста

## Заголовки

```text
Content-Type: application/json
X-API-KEY: <your_token>
```

## Входная схема

```json
{
  "params": {
    "method": "inoagent",
    "lastname": "string",
    "firstname": "string",
    "secondname": "string, optional"
  },
  "webhook": "https://your.host/webhook",
  "requestId": "optional-string"
}
```

## Параметры

| Поле | Обязательное | Описание |
|------|--------------|----------|
| `method` | да | Значение `inoagent` |
| `lastname` | да | Фамилия. Именно фамилия вводится в поисковую строку источника |
| `firstname` | да | Имя. Используется для фильтрации найденных строк |
| `secondname` | нет | Отчество, если известно. Возвращается в `query`, но совпадение сейчас проверяется по фамилии и имени |
| `fio` | нет | Альтернативный способ передать ФИО одной строкой: `Фамилия Имя Отчество` |
| `query` | нет | Алиас для ФИО одной строкой |
| `full_name` | нет | Алиас для ФИО одной строкой |

Минимально нужно передать либо `lastname` + `firstname`, либо строку `fio`/`query`/`full_name`, из которой можно выделить фамилию и имя.

## Логика поиска и совпадения

Spider открывает страницу реестра Минюста, вводит в поле поиска только фамилию, симулирует `Enter`, затем парсит строки выдачи. В результат попадают только строки, где в колонке `Полное наименование ... / ФИО ...` найдены оба токена: фамилия и имя из запроса.

## Пример запроса

```http
POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_TOKEN

{
  "params": {
    "method": "inoagent",
    "lastname": "Иванов",
    "firstname": "Иван",
    "secondname": "Иванович"
  },
  "requestId": "00000000-0000-4000-8000-000000000201"
}
```

## Пример ответа с найденной записью

```json
{
  "requestId": "00000000-0000-4000-8000-000000000201",
  "taskId": "00000000-0000-4000-8000-000000000202",
  "method": "inoagent",
  "status": "success",
  "dateupdated": "2026-07-17 17:45:00",
  "results": {
    "inoagent": {
      "taskId": "00000000-0000-4000-8000-000000000202",
      "dateupdated": "2026-07-17 17:45:10",
      "result": {
        "status": 200,
        "query": "Иванов Иван Иванович",
        "found": true,
        "registry_status": "found",
        "registry_updated_at": "Реестр обновлен 01.07.2026",
        "total_rows_parsed": 1,
        "data": [
          {
            "registry_number": "000",
            "full_name": "Иванов Иван Иванович",
            "inclusion_basis": "Распоряжение Минюста России",
            "included_at": "01.01.2024",
            "excluded_at": "",
            "active": true,
            "match": "lastname_firstname",
            "source": "https://minjust.gov.ru/ru/pages/reestr-inostryannykh-agentov/",
            "registry_updated_at": "Реестр обновлен 01.07.2026",
            "row_id": "row-000",
            "idx": "0"
          }
        ]
      }
    }
  }
}
```

## Пример ответа без совпадений

```json
{
  "requestId": "00000000-0000-4000-8000-000000000203",
  "taskId": "00000000-0000-4000-8000-000000000204",
  "method": "inoagent",
  "status": "success",
  "dateupdated": "2026-07-17 17:46:00",
  "results": {
    "inoagent": {
      "taskId": "00000000-0000-4000-8000-000000000204",
      "dateupdated": "2026-07-17 17:46:08",
      "result": {
        "status": 200,
        "query": "Иванов Иван Иванович",
        "found": false,
        "registry_status": "not_found",
        "registry_updated_at": "Реестр обновлен 01.07.2026",
        "total_rows_parsed": 0,
        "data": []
      }
    }
  }
}
```

## Поля результата `results.inoagent.result`

| Поле | Описание |
|------|----------|
| `status` | HTTP-подобный статус обработки метода |
| `query` | ФИО, использованное для проверки |
| `found` | `true`, если найдена хотя бы одна строка с совпадением фамилии и имени |
| `registry_status` | `found`, `not_found` или `error` |
| `registry_updated_at` | Текст даты обновления реестра, если он был на странице источника |
| `total_rows_parsed` | Количество строк, разобранных после поиска по фамилии |
| `data` | Список найденных записей |

## Поля `data[]`

| Поле | Описание |
|------|----------|
| `registry_number` | Номер записи в реестре |
| `full_name` | ФИО или наименование из колонки реестра Минюста |
| `inclusion_basis` | Основание включения в реестр |
| `included_at` | Дата включения |
| `excluded_at` | Дата исключения, если заполнена |
| `active` | `true`, если дата исключения не заполнена |
| `match` | Тип совпадения. Для API-поиска по ФИО используется `lastname_firstname` |
| `source` | URL источника |
| `registry_updated_at` | Дата обновления реестра из источника |
| `row_id` | HTML id строки, если есть |
| `idx` | Индекс строки на странице, если есть |

## Особенности

- В поисковую строку источника отправляется только фамилия.
- После получения выдачи метод дополнительно проверяет совпадение фамилии и имени в колонке ФИО.
- Отчество сохраняется в `query`, но не является обязательным условием совпадения.
- Если источник или CDP недоступны, метод возвращает top-level `status: "error"` и `results.inoagent.result.status: 500`.

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "inoagent",
  "intent": "Проверка физического лица в реестре иностранных агентов Минюста России",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["method", "lastname", "firstname"],
  "returns": [
    "results.inoagent.result.status",
    "results.inoagent.result.found",
    "results.inoagent.result.registry_status",
    "results.inoagent.result.data"
  ]
}
```

</details>
