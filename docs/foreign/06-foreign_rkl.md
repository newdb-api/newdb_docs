---
title: "rkl — проверка по реестру контролируемых лиц"
description: "Метод NEWDB rkl выполняет проверку по реестру контролируемых лиц через форму Госуслуг."
canonical_url: https://newdb.net/docs/foreign/06-foreign_rkl/
meta:
  - name: keywords
    content: "NEWDB API, rkl, реестр контролируемых лиц, Госуслуги"
  - property: og:title
    content: "Проверка по реестру контролируемых лиц — метод rkl"
  - property: og:description
    content: "Параметры запроса rkl, форматы dob_info и логика заполнения формы."
---

# rkl — Проверка по реестру контролируемых лиц

POST `https://api.newdb.net/v2`

Метод выполняет проверку лица по форме сервиса Госуслуг "Реестр контролируемых лиц".

**Раздел:** [Иностранные граждане](index.md)

## Связанные страницы

- [Обзор раздела иностранные граждане](index.md)
- [foreign_rnr — Разрешение на работу (РНР)](05-foreign_rnr.md)
- [patent_msk — Патент (Москва)](07-foreign_patent_msk.md)
- [foreign_rvp_blank — РВП (бланк)](04-foreign_rvp_blank.md)

## Когда использовать

Используйте метод, когда нужно проверить присутствие иностранного гражданина в реестре контролируемых лиц МВД РФ по реквизитам документа и дате рождения.

## Типовые кейсы

- Проверка статуса иностранного гражданина перед трудоустройством
- Миграционный аудит в HR или compliance-процессе
- Автоматическая проверка мигрантов по реквизитам документа и дате рождения

## Заголовки

```http
Content-Type: application/json
X-API-KEY: <your_token>
```

## Пример параметров запроса (`params`)

Ниже пример в формате, который передается в сервис:

```python
params_raw = json.dumps({
    "method": "rkl",
    "country": "ru",
    "dob_info": "19.10.1995",
    "issue_date": "08.06.2023",
    "id_doc_number": "7887320",
    "id_doc_seria": "FA",
    "newdb_qid": "EKYiIMO21ZnJMygA",
    "taskId": "test-rkl-003"
})
```

Для `dob_info = "19.10.1995"` spider выберет режим полной даты рождения (`optional = "1"`), поле заполнится значением `19.10.1995`.

## Пример API-запроса (без серии документа)

Поле `id_doc_seria` является необязательным. Пример запроса только с номером документа, датой выдачи и датой рождения:

```json
{
  "params": {
    "method": "rkl",
    "country": "ru",
    "dob_info": "19.10.1995",
    "issue_date": "08.06.2023",
    "id_doc_number": "7887320",
    "newdb_qid": "EKYiIMO21ZnJMygA",
    "taskId": "test-rkl-003"
  },
  "requestId": "optional-string",
  "webhook": "https://your.host/webhook"
}
```

### Пример API-запроса (`dob_info` = только год)

Для `dob_info = "1995"` spider выберет режим "Только год" (`optional = "2"`), в форме будет выбран год `1995`.

```json
{
  "params": {
    "method": "rkl",
    "country": "ru",
    "dob_info": "1995",
    "issue_date": "08.06.2023",
    "id_doc_seria": "FA",
    "id_doc_number": "7887320",
    "newdb_qid": "EKYiIMO21ZnJMygA",
    "taskId": "test-rkl-003-year"
  },
  "requestId": "optional-string",
  "webhook": "https://your.host/webhook"
}
```

### Пример API-запроса (`dob_info` = полная дата)

Для `dob_info = "19.10.1995"` spider выберет режим "Полная дата" (`optional = "1"`).

```json
{
  "params": {
    "method": "rkl",
    "country": "ru",
    "dob_info": "19.10.1995",
    "issue_date": "08.06.2023",
    "id_doc_seria": "FA",
    "id_doc_number": "7887320",
    "newdb_qid": "EKYiIMO21ZnJMygA",
    "taskId": "test-rkl-003-full-date"
  },
  "requestId": "optional-string",
  "webhook": "https://your.host/webhook"
}
```

## Входные параметры (`params`)

```json
{
  "method": "rkl",
  "country": "ru",
  "dob_info": "string",
  "issue_date": "string",
  "id_doc_number": "string",
  "id_doc_seria": "string",
  "taskId": "string"
}
```

Основные поля:

- `id_doc_number` — номер документа (**обязательное поле**).
- `issue_date` — дата выдачи документа (**обязательное поле**, формат `DD.MM.YYYY` или `YYYY-MM-DD`).
- `dob_info` — дата рождения в полном или частичном формате (**обязательное поле**).
- `id_doc_seria` — серия документа (необязательное поле).

## `dob_info`: как парсится

Поле `dob_info` поддерживает несколько форматов. По нему spider определяет, какой режим даты рождения выбрать в форме.

Поддерживаемые форматы:

- `DD.MM.YYYY` (также допускаются разделители `-`, `/`) -> полная дата рождения.
- `MM.YYYY` (также `MM-YYYY`, `MM/YYYY`) -> месяц и год рождения.
- `YYYY` -> только год рождения.
- `YYYY.MM` / `YYYY-MM` / `YYYY-MM-DD` /`YYYY/MM` -> также принимается для обратной совместимости и трактуется как год+месяц.

### Примеры

- `dob_info = "10.1995"` -> режим "Месяц и год", в форме: `Окт 1995`
- `dob_info = "1995"` -> режим "Только год", в форме: `1995`
- `dob_info = "19.10.1995"` -> режим "Полная дата", в форме поле даты: `19.10.1995`

## Пример ответа

Ниже пример структуры ответа NEWDB для метода `rkl`. Значение `registry_status` определяется из текста результата на экране Госуслуг:

- `not_found` — если в заголовке найдено "отсутствует в реестре контролируемых лиц"
- `found` — если в заголовке найдено "в реестре контролируемых лиц"
- `unknown` — если статус не удалось определить по заголовку

```json
{
  "params": {
    "params": {
      "method": "rkl",
      "country": "ru",
      "dob_info": "19.10.1995",
      "issue_date": "08.06.2023",
      "id_doc_number": "7887320",
      "newdb_qid": "EKYiIMO21ZnJMygA",
      "taskId": "test-rkl-003"
    }
  },
  "requestId": "optional-string",
  "state": "complete",
  "results": {
    "rkl": {
      "taskId": "test-rkl-003",
      "dateupdated": "2026-08-31 16:47:00",
      "result": {
        "status": 200,
        "data": [
          {
            "title": "Отсутствует в реестре контролируемых лиц",
            "details": [
              "Документ: 7887320, выдан 08.06.2023",
              "Дата рождения: 19.10.1995",
              "Данные получены из системы МВД России",
              "31.08.2026 16:47 МСК"
            ],
            "raw": "Отсутствует в реестре контролируемых лиц Документ: 7887320, выдан 08.06.2023 Дата рождения: 19.10.1995 Данные получены из системы МВД России 31.08.2026 16:47 МСК",
            "registry_status": "not_found"
          }
        ],
        "screen_url": "https://storage.yandexcloud.net/newdb-items/spider_screenshots/rkl/2026/08/31/d61bea9e_b114bbb2.png"
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
  "method": "rkl",
  "intent": "Проверка наличия в реестре контролируемых лиц",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["dob_info", "issue_date", "id_doc_number", "method", "country"],
  "optional_fields": ["id_doc_seria"],
  "returns": ["state", "results.rkl.result.status", "results.rkl.result.data", "results.rkl.result.screen_url"]
}
```

</details>
