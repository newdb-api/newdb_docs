---
title: "Режим совместимости с форматом Контур.Покус (Pokus / Focus)"
description: "Получение данных проверок NewDB в структуре и контрактах Контур.Покус (Focus API v3) через параметр format=kontur или format=pokus."
canonical_url: https://newdb.net/docs/compatibility-kontur/
---

# Режим совместимости с форматом «Контур.Покус» (Pokus / Focus)

Для клиентов, чьи учетные системы (1С:Предприятие, SAP, корпоративные CRM, модули скоринга контрагентов) или собственные микросервисы интегрированы со схемой API **«Контур.Покус»** (`https://focus-api.kontur.ru/api3/`), NewDB предоставляет встроенный шлюз конвертации данных на лету.

Вы можете переключить источник данных на NewDB без необходимости переписывать парсеры ответов в ваших внутренних системах.

---

## Как включить формат «Контур.Покус»

Вы можете включить формат ответа «Контур.Покус» любым удобным способом:

1. **Параметр в строке запроса (Query parameter):**
   * `format=kontur` (также поддерживаются алиасы: `format=pokus`, `format=focus`, `format=kf`, `format=kp`, `format=покус`, `format=контур.покус`, `_format=kontur`)
2. **Поле в JSON-теле запроса (POST):**
   * `"format": "kontur"` (или `"format": "pokus"`)
3. **HTTP-заголовок запроса:**
   * `X-Response-Format: kontur` (или `X-Response-Format: pokus`)

---

## Особенности структуры ответов

В соответствии с контрактом Контур.Покус API v3:
* Ответы на методы поиска организаций и реестров возвращаются в виде **массива объектов** (например, `[ { "inn": "...", "ogrn": "...", "UL": { ... } } ]`).
* Поля именуются в нотации `camelCase` / `PascalCase` (`legalName`, `legalAddress`, `heads`, `officialNum` и т.д.).
* В ответе возвращаются ссылки на карточки контрагента (`focusHref`).

---

## Поддерживаемые методы и соответствие контрактам

| Метод NewDB | Эквивалентный метод Контур.Покус | Возвращаемая структура | Описание |
| :--- | :--- | :--- | :--- |
| `egrul` | `/api3/req` (ЮЛ) | `[ { "inn": "...", "ogrn": "...", "UL": { "legalName": {...}, "legalAddress": {...}, "heads": [...], "status": {...} } } ]` | Выписка и карточка юридического лица по ЕГРЮЛ |
| `egrul_ip` | `/api3/req` (ИП) | `[ { "inn": "...", "ogrnip": "...", "IP": { "fio": "...", "status": {...} } } ]` | Выписка и карточка индивидуального предпринимателя по ЕГРИП |
| `self_employed` | `/api3/smzGetStatus` | `{ "taskStatus": "Ready", "smzStatusResult": [ { "inn": "...", "status": true, "registrationDate": "..." } ] }` | Проверка статуса плательщика налога на профессиональный доход (самозанятого) |
| `fssp_legal` / `fssp_person` | `/api3/fssp` | `[ { "inn": "...", "fssp": [ { "officialNum": "...", "sum": 15400.5, "debtorName": "...", "bailiffDepartment": "..." } ] } ]` | Исполнительные производства ФССП (по организации или физлицу) |
| `fns_block` / `fns_block_person` | `/api3/fnsBlockedBankAccounts` | `[ { "inn": "...", "blockedAccountsInfo": [ { "totalCount": 1, "suspensions": [...] } ] } ]` | Решения ФНС о приостановлении операций по счетам налогоплательщика |
| `bankrot_legal` / `bankrot_person` | `/api3/companyBankruptcy` | `[ { "inn": "...", "stage": "Конкурсное производство", "caseNumber": "...", "messages": [...] } ]` | Сведения о стадиях банкротства из реестра Федресурс (ЕФРСБ) |
| `intellectual_property` | `/api3/trademarks` | `[ { "inn": "...", "trademarks": [ { "docNumber": "...", "dateEnd": "...", "trademarkType": {...} } ] } ]` | Товарные знаки и объекты интеллектуальной собственности Роспатента |
| `pravo_search` / `arbitr_legal` / `arbitr_case` | `/api3/generalCourtCases` | `[ { "cases": [ { "caseNumber": "...", "courtName": "...", "participants": [...] } ] } ]` | Арбитражные судебные дела и дела общей юрисдикции |
| `complex_by_passport` / `passport_mvd` / `passport_fns` | `/api3/checkPassport` | `[ { "number": "4510 123456", "isInvalid": false, "invalidSince": null } ]` | Проверка действительности паспорта гражданина РФ по базам МВД |
| `complex_by_inn` | `/api3/req` (комплексный отчет) | `[ { "inn": "...", "ogrn": "...", "UL": {...}, "fssp": [...], "blockedAccountsInfo": [...] } ]` | Единая обогащенная карточка организации со всеми проверками (ФССП, блокировки, арбитраж) |

---

## Примеры вызовов по каждому методу

Все примеры протестированы и доступны как на боевом контуре (`https://api.newdb.net/v2/run?...&token=YOUR_API_TOKEN&format=kontur`), так и в тестовом контуре Sandbox (`https://api.newdb.net/test/v2/run?...&format=kontur` без списания баланса).

### 1. ЕГРЮЛ — Карточка юридического лица (`/api3/req`)

**Запрос:**
```bash
curl -X GET "https://api.newdb.net/v2/run?method=egrul&inn=7707083893&token=YOUR_API_TOKEN&format=kontur"
```

**Ответ:**
```json
[
  {
    "inn": "7707083893",
    "ogrn": "1027700132195",
    "focusHref": "https://focus.kontur.ru/entity?query=7707083893",
    "UL": {
      "kpp": "773601001",
      "legalName": {
        "full": "ПУБЛИЧНОЕ АКЦИОНЕРНОЕ ОБЩЕСТВО \"СБЕРБАНК РОССИИ\"",
        "short": "ПАО \"СБЕРБАНК\"",
        "date": "1991-06-20"
      },
      "legalAddress": {
        "parsedAddressRF": {
          "rawAddress": "117312, Г.МОСКВА, УЛ. ВАВИЛОВА, Д.19"
        }
      },
      "status": {
        "statusString": "Действующее",
        "date": "1991-06-20"
      },
      "heads": [
        {
          "fio": "ГРЕФ ГЕРМАН ОСКАРОВИЧ",
          "position": "Президент, Председатель Правления",
          "innfl": "770400000000"
        }
      ],
      "managementCompanies": [],
      "registrationDate": "1991-06-20",
      "statedCapital": {
        "sum": 67760844000.0
      }
    }
  }
]
```

---

### 2. ЕГРИП — Карточка индивидуального предпринимателя (`/api3/req`)

**Запрос:**
```bash
curl -X GET "https://api.newdb.net/v2/run?method=egrul_ip&inn=771234567890&token=YOUR_API_TOKEN&format=kontur"
```

**Ответ:**
```json
[
  {
    "inn": "771234567890",
    "ogrnip": "320774600123456",
    "focusHref": "https://focus.kontur.ru/entity?query=771234567890",
    "IP": {
      "fio": "ИВАНОВ ИВАН ИВАНОВИЧ",
      "status": {
        "statusString": "Действующее",
        "date": "2020-05-15"
      },
      "registrationDate": "2020-05-15"
    }
  }
]
```

---

### 3. Самозанятые — Проверка плательщика НПД (`/api3/smzGetStatus`)

**Запрос:**
```bash
curl -X GET "https://api.newdb.net/v2/run?method=self_employed&inn=771234567890&token=YOUR_API_TOKEN&format=kontur"
```

**Ответ:**
```json
{
  "taskStatus": "Ready",
  "smzStatusResult": [
    {
      "inn": "771234567890",
      "status": true,
      "registrationDate": "2021-02-01",
      "message": "Физическое лицо является плательщиком налога на профессиональный доход"
    }
  ]
}
```

---

### 4. Исполнительные производства ФССП (`/api3/fssp`)

**Запрос:**
```bash
curl -X GET "https://api.newdb.net/v2/run?method=fssp_legal&inn=7707083893&token=YOUR_API_TOKEN&format=kontur"
```

**Ответ:**
```json
[
  {
    "inn": "7707083893",
    "ogrn": "1027700132195",
    "focusHref": "https://focus.kontur.ru/fssp?query=7707083893",
    "fssp": [
      {
        "officialNum": "12345/21/77001-ИП",
        "startDate": "2021-05-12",
        "sum": 15400.5,
        "topic": "Взыскание налогов и сборов",
        "debtorName": "ПУБЛИЧНОЕ АКЦИОНЕРНОЕ ОБЩЕСТВО \"СБЕРБАНК РОССИИ\"",
        "debtorAddress": "117312, Г.МОСКВА, УЛ. ВАВИЛОВА, Д.19",
        "bailiffDepartment": "ОСП по ЦАО №1",
        "bailiffDepartmentAddress": "",
        "returnedToClaimer": false,
        "cancelledBecauseOfBancruptcy": false,
        "cancelledBecauseOfDissolvement": false
      }
    ]
  }
]
```

---

### 5. Блокировки счетов налоговой ФНС (`/api3/fnsBlockedBankAccounts`)

**Запрос:**
```bash
curl -X GET "https://api.newdb.net/v2/run?method=fns_block&inn=7707083893&token=YOUR_API_TOKEN&format=kontur"
```

**Ответ:**
```json
[
  {
    "inn": "7707083893",
    "ogrn": "1027700132195",
    "focusHref": "https://focus.kontur.ru/fnsBlockedBankAccounts?query=7707083893",
    "blockedAccountsInfo": [
      {
        "updateDate": "2026-09-01",
        "totalCount": 0,
        "suspensions": []
      }
    ]
  }
]
```

---

### 6. Банкротство Федресурс ЕФРСБ (`/api3/companyBankruptcy`)

**Запрос:**
```bash
curl -X GET "https://api.newdb.net/v2/run?method=bankrot_legal&inn=7707083893&token=YOUR_API_TOKEN&format=kontur"
```

**Ответ:**
```json
[
  {
    "inn": "7707083893",
    "ogrn": "1027700132195",
    "focusHref": "https://focus.kontur.ru/bankruptcy?query=7707083893",
    "stage": "NO_BANKRUPTCY",
    "caseNumber": "",
    "acceptanceDate": null,
    "stageDate": null,
    "messages": []
  }
]
```

---

### 7. Товарные знаки и интеллектуальная собственность (`/api3/trademarks`)

**Запрос:**
```bash
curl -X GET "https://api.newdb.net/v2/run?method=intellectual_property&inn=7707083893&token=YOUR_API_TOKEN&format=kontur"
```

**Ответ:**
```json
[
  {
    "inn": "7707083893",
    "ogrn": null,
    "focusHref": "https://focus.kontur.ru/trademarks?query=7707083893",
    "trademarks": [
      {
        "docNumber": "890123",
        "dateEnd": "2034-05-15",
        "trademarkType": {
          "code": "RUTM",
          "name": "Товарный знак"
        },
        "image": null
      }
    ]
  }
]
```

---

### 8. Судебные дела и арбитраж (`/api3/generalCourtCases`)

**Запрос:**
```bash
curl -X GET "https://api.newdb.net/v2/run?method=pravo_search&inn=7707083893&token=YOUR_API_TOKEN&format=kontur"
```

**Ответ:**
```json
[
  {
    "inn": "7707083893",
    "cases": [
      {
        "caseNumber": "02-1234/2026",
        "caseDate": "2026-08-15",
        "courtName": "Басманный районный суд г. Москвы",
        "judge": "Петров П.П.",
        "participants": []
      }
    ]
  }
]
```

---

### 9. Проверка паспорта РФ (`/api3/checkPassport`)

**Запрос:**
```bash
curl -X GET "https://api.newdb.net/v2/run?method=complex_by_passport&series=4510&number=123456&token=YOUR_API_TOKEN&format=kontur"
```

**Ответ:**
```json
[
  {
    "number": "123456",
    "isInvalid": false,
    "invalidSince": null
  }
]
```

---

### 10. Комплексная проверка организации (`/api3/req` с обогащением)

**Запрос:**
```bash
curl -X GET "https://api.newdb.net/v2/run?method=complex_by_inn&inn=7707083893&token=YOUR_API_TOKEN&format=kontur"
```

**Ответ:**
```json
[
  {
    "inn": "7707083893",
    "ogrn": "1027700132195",
    "focusHref": "https://focus.kontur.ru/entity?query=7707083893",
    "UL": {
      "kpp": "773601001",
      "legalName": {
        "full": "ПУБЛИЧНОЕ АКЦИОНЕРНОЕ ОБЩЕСТВО \"СБЕРБАНК РОССИИ\"",
        "short": "ПАО \"СБЕРБАНК\"",
        "date": "1991-06-20"
      },
      "legalAddress": {
        "parsedAddressRF": {
          "rawAddress": "117312, Г.МОСКВА, УЛ. ВАВИЛОВА, Д.19"
        }
      },
      "status": {
        "statusString": "Действующее",
        "date": "1991-06-20"
      },
      "heads": [
        {
          "fio": "ГРЕФ ГЕРМАН ОСКАРОВИЧ",
          "position": "Президент, Председатель Правления"
        }
      ]
    },
    "fssp": [],
    "blockedAccountsInfo": [
      {
        "totalCount": 0,
        "suspensions": []
      }
    ]
  }
]
```

---

## Тестовый контур Sandbox (бесплатное тестирование)

Для отладки интеграции с форматом «Контур.Покус» без расхода тарифного баланса используйте эндпоинты Sandbox:
* `GET https://api.newdb.net/test/v2/run?method={method}&inn={inn}&format=kontur`
* `POST https://api.newdb.net/test/v2` с телом `{"method": "...", "params": {...}, "format": "kontur"}`

Пример вызова в песочнице:
```bash
curl -X GET "https://api.newdb.net/test/v2/run?method=egrul&inn=7707083893&format=kontur"
```

В официальной [Postman-коллекции NewDB](https://github.com/newdb-api/newdb_postman) добавлена специальная папка **`07. Формат КОНТУР.ПОКУС (Pokus)`** со всеми готовыми примерами запросов.
