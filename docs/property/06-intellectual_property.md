---
title: "intellectual_property — комплексный поиск патентов и товарных знаков (Роспатент / ФИПС)"
description: "Метод NEWDB intellectual_property осуществляет комплексный одновременный поиск зарегистрированных патентов, полезных моделей, программ для ЭВМ, баз данных и товарных знаков в базах Роспатента (ФИПС) по ФИО, компании, бренду или номеру."
canonical_url: https://newdb.net/docs/property/06-intellectual_property/
meta:
  - name: keywords
    content: "NEWDB API, intellectual_property, Роспатент, ФИПС, товарные знаки, патенты, изобретения, программы эвм, базы данных, полезные модели, правообладатель, бренд, патентный поиск"
  - property: og:title
    content: "Комплексный поиск патентов и товарных знаков — метод intellectual_property"
  - property: og:description
    content: "Поиск зарегистрированных товарных знаков, патентов, программ ЭВМ и объектов интеллектуальной собственности по базам Роспатента (ФИПС) через API NEWDB."
---

# intellectual_property — Патенты, товарные знаки и интеллектуальная собственность (Роспатент / ФИПС)

POST `https://api.newdb.net/v2`

Метод **`intellectual_property`** выполняет оперативный поиск в официальных государственных реестрах Федеральной службы по интеллектуальной собственности (**Роспатент / ФИПС**).

По умолчанию метод производит **одновременный параллельный поиск сразу по всем категориям** (`search_type: "all"`):

1. **Патенты на изобретения, полезные модели и промышленные образцы** (`patents`): по ФИО автора, патентообладателя или организации.
2. **Программы для ЭВМ, базы данных и топологии интегральных микросхем** (`programs`): по авторам, правообладателям или ключевым словам.
3. **Товарные знаки, знаки обслуживания и заявки на регистрацию** (`trademarks`): по словесному обозначению (названию бренда), заявителю/правообладателю, номеру свидетельства или заявки.

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
- **Проверка контрагентов и партнеров:** подтверждение реального владения заявленными технологиями, изобретениями, программами ЭВМ и товарными знаками.
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
| `search_type` | `string` | Нет | `"all"` | Режим поиска: `"all"` (все категории), `"patents"` (патенты и образцы), `"trademarks"` (товарные знаки), `"programs"` (программы ЭВМ и БД). |
| `trademark_name` | `string` | Нет | — | Словесное обозначение товарного знака (бренд, название марки). |
| `applicant` | `string` | Нет | — | Наименование заявителя / правообладателя (юридическое лицо, ИП или физлицо). |
| `reg_num` | `string` | Нет | — | Номер государственной регистрации (свидетельства) товарного знака в РФ (например, `833077`). |
| `appl_num` | `string` | Нет | — | Входящий номер заявки на регистрацию в Роспатент (например, `2021720972`). |
| `limit` | `integer` | Нет | `10` | Количество возвращаемых результатов на категорию (от 1 до 100). |
| `offset` | `integer` | Нет | `0` | Смещение для пагинации (целое число >= 0). |

*\* В запросе должен быть передан параметр `query` либо хотя бы один из специализированных параметров товарного знака (`trademark_name`, `reg_num`, `appl_num`, `applicant`).*

---

## Примеры вызова

### 1. Комплексный поиск по всем категориям

```http
POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_API_TOKEN

{
  "params": {
    "method": "intellectual_property",
    "query": "Яндекс"
  },
  "requestId": "00000000-0000-4000-8000-000000000001"
}
```

**Пример ответа:**

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
        "data": {
          "summary": {
            "total": 30,
            "patents_count": 10,
            "programs_count": 10,
            "trademarks_count": 10
          },
          "patents": [
            {
              "id": "RU2853751C1_20251226",
              "category": "Изобретение",
              "type": "patent",
              "document_number": "2853751",
              "kind": "C1",
              "publication_date": "2025.12.26",
              "application_number": "2025106327",
              "filing_date": "2025.03.18",
              "title": "СПОСОБ И СИСТЕМА ДЛЯ ИНИЦИИРОВАНИЯ КОРРЕКТИРУЮЩЕГО ДЕЙСТВИЯ НА КЛИЕНТСКОМ УСТРОЙСТВЕ",
              "language": "ru",
              "inventors": ["Кальченко Виталий Викторович (RU)"],
              "patentees": ["ООО \"ЯНДЕКС\" (RU)"],
              "public_url": "http://www1.fips.ru/fips_servl/fips_servlet?DB=RUPAT&DocNumber=2853751"
            }
          ],
          "programs": [
            {
              "id": "RU2024612807ПрЭВМ_20240205",
              "category": "Программа для ЭВМ",
              "type": "integral",
              "document_number": "2024612807",
              "kind": "ПрЭВМ",
              "publication_date": "2024.02.05",
              "application_number": "2024611972",
              "title": "Программа для интеграции «Яндекс»",
              "patentees": ["ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ «ИСХОДНЫЙ КОД» (RU)"],
              "public_url": "http://www1.fips.ru/fips_servl/fips_servlet?DB=EVM&DocNumber=2024612807"
            }
          ],
          "trademarks": [
            {
              "id": "TM_1233122",
              "category": "Товарный знак",
              "type": "trademark",
              "regNum": "1233122",
              "regDate": "20260615",
              "ApplicNum": "2025807932",
              "ExpirDate": "20351002",
              "PublicUR": "http://www1.fips.ru/fips_servl/fips_servlet?DB=RUTM&DocNumber=1233122",
              "public_url": "http://www1.fips.ru/fips_servl/fips_servlet?DB=RUTM&DocNumber=1233122",
              "name": "ЯНДЕКС-01",
              "applicant": "Общество с ограниченной ответственностью ЯНДЕКС",
              "trademarkType": "Регистрация",
              "state": "Действует",
              "image": "https://searchplatform.rospatent.gov.ru/datamart/..."
            }
          ],
          "items": [
            /* Объединенный массив всех найденных объектов с полями category и type */
          ]
        },
        "meta": {
          "query": "Яндекс",
          "search_type": "all",
          "total": 30,
          "patents_total": 606,
          "programs_total": 289,
          "trademarks_total": 10,
          "count": 30,
          "offset": 0,
          "limit": 10,
          "transport": "http",
          "source_url": "https://searchplatform.rospatent.gov.ru"
        }
      }
    }
  }
}
```

---

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "intellectual_property",
  "intent": "Комплексный поиск зарегистрированных патентов, программ ЭВМ, баз данных и товарных знаков в Роспатенте (ФИПС)",
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
    "results.intellectual_property.result.data.summary",
    "results.intellectual_property.result.data.patents",
    "results.intellectual_property.result.data.programs",
    "results.intellectual_property.result.data.trademarks",
    "results.intellectual_property.result.data.items",
    "results.intellectual_property.result.meta"
  ]
}
```

</details>
