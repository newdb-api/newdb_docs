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

Используйте метод, когда нужно проверить статус документа или разрешительного основания иностранного гражданина.

## Типовые кейсы

- Проверка ВНЖ, патента, РВП или разрешения на работу перед оформлением
- Контроль миграционных документов в HR или compliance-процессе
- Подтверждение статуса документа по данным анкеты и реквизитам

## Заголовки

```http
Content-Type: application/json
X-API-KEY: <your_token>
```

## Пример параметров запроса (`params`)

Ниже пример в формате, который фактически передается в spider (`params_raw`):

```python
params_raw = json.dumps({
    "method": "rkl",
    "country": "ru",
    "lastname": "Иванов",
    "firstname": "Иван",
    "secondname": "Иванович",
    "dob_info": "01.2002",
    "issue_date": "31.01.2002",
    "id_doc_seria": "FA",
    "id_doc_number": "2001901",
    "newdb_qid": "EKYiIMO21ZnJMygA",
    "taskId": "test-rkl-003"
})
```

Для `dob_info = "01.2002"` spider выберет режим частичной даты рождения "Месяц и год" (`optional = "3"`), год `2002`, месяц `1` (в форме: `Янв 2002`).

## Пример API-запроса

```json
{
  "params": {
    "method": "rkl",
    "country": "ru",
    "lastname": "Иванов",
    "firstname": "Иван",
    "secondname": "Иванович",
    "dob_info": "01.2002",
    "issue_date": "31.01.2002",
    "id_doc_seria": "FA",
    "id_doc_number": "2001901",
    "newdb_qid": "EKYiIMO21ZnJMygA",
    "taskId": "test-rkl-003"
  },
  "requestId": "optional-string",
  "webhook": "https://your.host/webhook"
}
```

### Пример API-запроса (`dob_info` = только год)

Для `dob_info = "2002"` spider выберет режим "Только год" (`optional = "2"`), в форме будет выбран год `2002`.

```json
{
  "params": {
    "method": "rkl",
    "country": "ru",
    "lastname": "Иванов",
    "firstname": "Иван",
    "secondname": "Иванович",
    "dob_info": "2002",
    "issue_date": "31.01.2002",
    "id_doc_seria": "FA",
    "id_doc_number": "2001901",
    "newdb_qid": "EKYiIMO21ZnJMygA",
    "taskId": "test-rkl-003-year"
  },
  "requestId": "optional-string",
  "webhook": "https://your.host/webhook"
}
```

### Пример API-запроса (`dob_info` = полная дата)

Для `dob_info = "31.01.2002"` spider выберет режим "Полная дата" (`optional = "1"`), поле даты рождения будет заполнено значением `31012002`.

```json
{
  "params": {
    "method": "rkl",
    "country": "ru",
    "lastname": "Иванов",
    "firstname": "Иван",
    "secondname": "Иванович",
    "dob_info": "31.01.2002",
    "issue_date": "31.01.2002",
    "id_doc_seria": "FA",
    "id_doc_number": "2001901",
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
  "lastname": "string",
  "firstname": "string",
  "secondname": "string",
  "dob_info": "string",
  "issue_date": "string",
  "id_doc_seria": "string",
  "id_doc_number": "string",
  "taskId": "string"
}
```

Основные поля:

- `id_doc_seria` — серия документа.
- `id_doc_number` — номер документа (обязательное поле).
- `issue_date` — дата выдачи документа (обязательное поле, нормализуется в `DD.MM.YYYY`).
- `dob_info` — дата рождения в полном или частичном формате (подробно ниже).

## `dob_info`: как парсится

Поле `dob_info` поддерживает несколько форматов. По нему spider определяет, какой режим даты рождения выбрать в форме.

Поддерживаемые форматы:

- `DD.MM.YYYY` (также допускаются разделители `-`, `/`) -> полная дата рождения.
- `MM.YYYY` (также `MM-YYYY`, `MM/YYYY`) -> месяц и год рождения.
- `YYYY` -> только год рождения.
- `YYYY.MM` / `YYYY-MM` / `YYYY-MM-DD` /`YYYY/MM` -> также принимается для обратной совместимости и трактуется как год+месяц.

 
 

### Примеры

- `dob_info = "01.2002"` -> режим "Месяц и год", в форме: `Янв 2002`
- `dob_info = "2002"` -> режим "Только год", в форме: `2002`
- `dob_info = "31.01.2002"` -> режим "Полная дата", в форме поле даты: `31012002`

 

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
      "lastname": "Иванов",
      "firstname": "Иван",
      "secondname": "Иванович",
      "dob_info": "01.2002",
      "issue_date": "31.01.2002",
      "id_doc_seria": "FA",
      "id_doc_number": "2001901",
      "newdb_qid": "EKYiIMO21ZnJMygA",
      "taskId": "test-rkl-003"
    }
  },
  "requestId": "optional-string",
  "state": "complete",
  "results": {
    "rkl": {
      "taskId": "test-rkl-003",
      "dateupdated": "2026-02-25 12:00:00",
      "result": {
        "status": 200,
        "data": [
          {
            "title": "Сведения о проверяемом лице отсутствуют в реестре контролируемых лиц",
            "details": [
              "Проверка выполнена по данным документа и дате рождения."
            ],
            "raw": "Сведения о проверяемом лице отсутствуют в реестре контролируемых лиц Проверка выполнена по данным документа и дате рождения.",
            "registry_status": "not_found"
          }
        ]
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
  "required_fields": ["firstname", "lastname", "dob_info", "issue_date", "id_doc_seria", "id_doc_number", "method", "country"],
  "returns": ["state", "results.rkl.result.status", "results.rkl.result.data"]
}
```

</details>


