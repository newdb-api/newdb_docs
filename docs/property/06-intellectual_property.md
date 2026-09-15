---
title: "intellectual_property — поиск патентов и товарных знаков (Роспатент / ФИПС)"
description: "Метод NEWDB intellectual_property осуществляет поиск зарегистрированных патентов, изобретений, полезных моделей и товарных знаков в базах Роспатента (ФИПС) по ФИО, наименованию правообладателя, названию бренда или номеру свидетельства."
canonical_url: https://newdb.net/docs/property/06-intellectual_property/
meta:
  - name: keywords
    content: "NEWDB API, intellectual_property, Роспатент, ФИПС, товарные знаки, патенты, изобретения, полезные модели, правообладатель, бренд, патентный поиск"
  - property: og:title
    content: "Поиск патентов и товарных знаков — метод intellectual_property"
  - property: og:description
    content: "Поиск зарегистрированных товарных знаков, патентов и объектов интеллектуальной собственности по базам Роспатента (ФИПС) через API NEWDB."
---

# intellectual_property — Патенты и товарные знаки (Роспатент / ФИПС)

POST `https://api.newdb.net/v2`

Метод **`intellectual_property`** выполняет оперативный поиск в официальных государственных реестрах Федеральной службы по интеллектуальной собственности (**Роспатент / ФИПС**). Метод поддерживает два основных направления проверки:

1. **Патенты и полезные модели** (`search_type: "patents"`): поиск по ФИО автора или наименованию патентообладателя/организации.
2. **Товарные знаки и знаки обслуживания** (`search_type: "trademarks"`): поиск по словесному обозначению (названию бренда), заявителю/правообладателю, номеру свидетельства или номеру заявки.

**Раздел:** [Имущество](index.md)

## Связанные страницы

- [Обзор раздела имущество](index.md)
- [intellectual_property в разделе физических лиц](../fiz/18-intellectual_property.md)
- [rosreestr — Проверка объекта недвижимости](01-rosreestr.md)
- [pledge_property — Проверка залога и обременений по ID](02-pledge_property.md)
- [egrul — Сведения ЕГРЮЛ по организации](../legal/04-egrul.md)
- [egrul_ip — Сведения ЕГРИП по индивидуальному предпринимателю](../fiz/11-egrul_ip.md)

## Когда использовать

- **Проверка прав на бренды и товарные знаки:** проверка уникальности названия перед запуском бренда, регистрацией или заключением франчайзингового договора.
- **Оценка нематериальных активов (Due Diligence):** аудит портфеля брендов, товарных знаков и патентов компании перед инвестициями или сделками M&A.
- **Проверка контрагентов и партнеров:** подтверждение реального владения заявленными технологиями, изобретениями и товарными знаками.
- **Проверка квалификации специалистов:** поиск патентов и научных разработок по авторам и ключевым разработчикам.

## Заголовки

```http
Content-Type: application/json
X-API-KEY: <your_token>
```

---

## Параметры запроса

| Параметр | Тип | Обязательный | По умолчанию | Описание |
|---|---|---|---|---|
| `method` | `string` | **Да** | — | Имя метода, всегда `intellectual_property`. |
| `query` | `string` | Нет* | — | Поисковый запрос: ФИО автора/правообладателя, наименование компании или название бренда (от 1 до 1000 символов). |
| `search_type` | `string` | Нет | `"patents"` | Режим поиска: `"patents"` (патенты и полезные модели) или `"trademarks"` (товарные знаки). Автоматически переключается в `"trademarks"` при указании параметров товарного знака. |
| `trademark_name` | `string` | Нет | — | Словесное обозначение товарного знака (бренд, название марки). |
| `applicant` | `string` | Нет | — | Наименование заявителя / правообладателя (юридическое лицо, ИП или физлицо). |
| `reg_num` | `string` | Нет | — | Номер государственной регистрации (свидетельства) товарного знака в РФ (например, `833077`). |
| `appl_num` | `string` | Нет | — | Входящий номер заявки на регистрацию в Роспатент (например, `2021720972`). |
| `limit` | `integer` | Нет | `10` | Количество возвращаемых результатов на страницу (от 1 до 100). |
| `offset` | `integer` | Нет | `0` | Смещение для пагинации (целое число >= 0). |

*\* В запросе должен быть передан параметр `query` либо хотя бы один из специализированных параметров товарного знака (`trademark_name`, `reg_num`, `appl_num`, `applicant`).*

---

## Примеры вызова

### 1. Поиск товарных знаков по названию бренда

```http
POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_API_TOKEN

{
  "params": {
    "method": "intellectual_property",
    "search_type": "trademarks",
    "trademark_name": "ЯНДЕКС"
  },
  "requestId": "00000000-0000-4000-8000-000000000001"
}
```

**Пример ответа по товарным знакам:**

```json
{
  "requestId": "00000000-0000-4000-8000-000000000001",
  "state": "complete",
  "results": {
    "intellectual_property": {
      "taskId": "task-ip-001",
      "dateupdated": "2026-09-15 10:00:00",
      "result": {
        "status": 200,
        "found": true,
        "data": [
          {
            "regNum": "833077",
            "regDate": "20211019",
            "ApplicNum": "2021720972",
            "ExpirDate": "20310408",
            "PublicUR": "http://www1.fips.ru/fips_servl/fips_servlet?DB=RUTM&DocNumber=833077",
            "name": "ЯНДЕКС",
            "applicant": "Общество с ограниченной ответственностью \"ЯНДЕКС\", 119021, Москва, ул. Льва Толстого, 16 (RU)",
            "trademarkType": "Регистрация",
            "state": "Действует",
            "image": "https://searchplatform.rospatent.gov.ru/images/trademarks/833077.png"
          }
        ],
        "meta": {
          "search_type": "trademarks",
          "trademark_name": "ЯНДЕКС",
          "reg_num": "",
          "appl_num": "",
          "applicant": "",
          "count": 1,
          "source_url": "https://searchplatform.rospatent.gov.ru/trademarks"
        }
      }
    }
  }
}
```

---

### 2. Поиск товарного знака по номеру свидетельства

```http
POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_API_TOKEN

{
  "params": {
    "method": "intellectual_property",
    "reg_num": "833077"
  },
  "requestId": "00000000-0000-4000-8000-000000000002"
}
```

---

### 3. Поиск патентов и изобретений по ФИО автора или компании

```http
POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_API_TOKEN

{
  "params": {
    "method": "intellectual_property",
    "query": "Иванов Иван Иванович",
    "limit": 10,
    "offset": 0
  },
  "requestId": "00000000-0000-4000-8000-000000000003"
}
```

**Пример ответа по патентам:**

```json
{
  "requestId": "00000000-0000-4000-8000-000000000003",
  "state": "complete",
  "results": {
    "intellectual_property": {
      "taskId": "task-ip-002",
      "dateupdated": "2026-09-15 10:00:00",
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
          "source_url": "https://searchplatform.rospatent.gov.ru/patents_advanced"
        }
      }
    }
  }
}
```

---

## Интерпретация полей ответа

### Товарные знаки (`search_type: "trademarks"`):
* `regNum` (`string`): номер свидетельства государственной регистрации в РФ.
* `regDate` (`string`): дата государственной регистрации в формате `YYYYMMDD`.
* `ApplicNum` (`string`): входящий номер заявки в Роспатенте.
* `ExpirDate` (`string`): срок действия исключительного права (10 лет с даты подачи заявки с возможностью продления).
* `PublicUR` (`string`): прямая ссылка на официальную карточку товарного знака в открытом реестре ФИПС.
* `name` (`string`): словесное обозначение / наименование товарного знака.
* `applicant` (`string`): правообладатель и заявитель, включая адрес регистрации.
* `trademarkType` (`string`): тип записи (например, `Регистрация`).
* `state` (`string`): текущее правовое состояние (`Действует`, `Истек срок действия`, `Аннулирован`).
* `image` (`string`): ссылка на официальное графическое изображение товарного знака.

### Патенты (`search_type: "patents"`):
* `document_number` (`string`): номер патента на изобретение или свидетельства на полезную модель.
* `kind` (`string`): код вида патентного документа (`C1`, `C2` — изобретения; `U1` — полезные модели).
* `title` (`string`): официальное название изобретения или модели.
* `patentees` (`array of strings`): список патентообладателей (юридических или физических лиц).
* `inventors` (`array of strings`): список авторов разработки.
* `publication_date` (`string`): дата официальной публикации патента.
* `filing_date` (`string`): дата приоритета (подачи первоначальной заявки).
* `classification` (`object`): индексы Международной патентной классификации (МПК / IPC).
* `description_snippet` (`string`): фрагмент описания / реферата изобретения.
* `drawings` (`array`): ссылки на чертежи и схемы патента.

---

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "intellectual_property",
  "intent": "Поиск зарегистрированных патентов, изобретений и товарных знаков в Роспатенте (ФИПС)",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["method"],
  "optional_fields": [
    "query",
    "search_type",
    "trademark_name",
    "applicant",
    "reg_num",
    "appl_num",
    "limit",
    "offset"
  ],
  "returns": [
    "results.intellectual_property.result.status",
    "results.intellectual_property.result.found",
    "results.intellectual_property.result.data",
    "results.intellectual_property.result.meta"
  ]
}
```

</details>
