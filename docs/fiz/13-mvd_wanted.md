---
title: "mvd_wanted — проверка физлица в розыске МВД"
description: "Метод NEWDB mvd_wanted ищет физическое лицо в публичном сервисе МВД России «Внимание, розыск!» по ФИО и дате рождения."
canonical_url: https://newdb.net/docs/fiz/13-mvd_wanted/
meta:
  - name: keywords
    content: "NEWDB API, mvd_wanted, МВД, розыск, физлица, Внимание розыск"
  - property: og:title
    content: "Проверка физлица в розыске МВД — метод mvd_wanted"
  - property: og:description
    content: "Поиск физического лица в сервисе МВД России «Внимание, розыск!» по ФИО и дате рождения."
---

# mvd_wanted — Проверка физлица в розыске МВД

POST `https://api.newdb.net/v2`

Метод выполняет поиск физического лица в публичном сервисе МВД России «Внимание, розыск!» и возвращает сведения о найденных карточках розыска.

**Раздел:** [Физические лица](index.md)

## Связанные страницы

- [Обзор раздела физические лица](index.md)
- [passport_mvd — Проверка паспорта РФ на действительность](03-passport_mvd.md)
- [terrorist — Проверка по перечням терроризма, экстремизма и ОМУ](12-terrorist.md)
- [fssp_person — Исполнительные производства ФССП](01-fssp_person.md)

## Когда использовать

- Проверка анкеты физлица на наличие карточек в розыске МВД
- Комплаенс-проверка клиента, сотрудника или контрагента-физлица
- Обогащение внутренней карточки физлица сведениями из открытого источника МВД

## Заголовки

```text
Content-Type: application/json
X-API-KEY: <your_token>
```

## Входная схема

```json
{
  "params": {
    "method": "mvd_wanted",
    "lastname": "string",
    "firstname": "string",
    "secondname": "string, optional",
    "dob": "DD.MM.YYYY"
  },
  "webhook": "https://your.host/webhook",
  "requestId": "optional-string"
}
```

## Параметры

| Поле | Обязательное | Описание |
|------|--------------|----------|
| `method` | да | Значение `mvd_wanted` |
| `lastname` | да | Фамилия |
| `firstname` | да | Имя |
| `secondname` | нет | Отчество, если известно |
| `dob` | да | Дата рождения. Основной формат — `DD.MM.YYYY` |
| `email` | да | Email нужен источнику МВД для отправки формы. В ответе метода email не возвращается |

Можно также передать ФИО в совместимых алиасах, если они уже используются в интеграции: `full_name`, `fio_full`, `query`, `fio_person`.

## Пример запроса

```http
POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_TOKEN

{
  "params": {
    "method": "mvd_wanted",
    "lastname": "ИВАНОВ",
    "firstname": "ИВАН",
    "secondname": "ИВАНОВИЧ",
    "dob": "01.01.1990",
    "email": "client@example.com"
  },
  "requestId": "00000000-0000-4000-8000-000000000101"
}
```

## Пример ответа с найденной записью

```json
{
  "requestId": "00000000-0000-4000-8000-000000000101",
  "taskId": "00000000-0000-4000-8000-000000000102",
  "method": "mvd_wanted",
  "status": "success",
  "dateupdated": "2026-07-17 16:33:41",
  "results": {
    "mvd_wanted": {
      "taskId": "00000000-0000-4000-8000-000000000102",
      "dateupdated": "2026-07-17 16:34:15",
      "result": {
        "status": 200,
        "query": {
          "full_name": "ИВАНОВ ИВАН ИВАНОВИЧ",
          "birth_date": "01.01.1990"
        },
        "found": true,
        "registry_status": "found",
        "captcha_error": false,
        "message": "",
        "total_found": 1,
        "data": [
          {
            "full_name": "ИВАНОВ ИВАН ИВАНОВИЧ",
            "birth_date": "01.01.1990",
            "birth_date_match": true,
            "match": "exact",
            "wanted_region": "УМВД РОССИИ ПО ПРИМЕРНОМУ РЕГИОНУ",
            "wanted_reason": "разыскивается по статье УК",
            "details": "пол: МУЖ, национальность: РУССКИЙ, дата рождения: 01.01.1990, место рождения: РОССИЯ",
            "contacts": "000000",
            "image_url": "//static.mvd.ru/upload/example/person.jpg",
            "detail_images": [],
            "popup_id": "popup-00000",
            "source": "https://xn--b1aew.xn--p1ai/wanted",
            "raw_text": "Дата рождения 01.01.1990 Регион розыска УМВД РОССИИ ПО ПРИМЕРНОМУ РЕГИОНУ ..."
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
  "requestId": "00000000-0000-4000-8000-000000000103",
  "taskId": "00000000-0000-4000-8000-000000000104",
  "method": "mvd_wanted",
  "status": "success",
  "dateupdated": "2026-07-17 16:36:55",
  "results": {
    "mvd_wanted": {
      "taskId": "00000000-0000-4000-8000-000000000104",
      "dateupdated": "2026-07-17 16:37:47",
      "result": {
        "status": 200,
        "query": {
          "full_name": "ИВАНОВ ИВАН ИВАНОВИЧ",
          "birth_date": "02.01.1990"
        },
        "found": false,
        "registry_status": "not_found",
        "captcha_error": false,
        "message": "По вашему запросу нет информации. Вы можете подать обращение.",
        "total_found": 0,
        "data": []
      }
    }
  }
}
```

## Поля результата `results.mvd_wanted.result`

| Поле | Описание |
|------|----------|
| `status` | HTTP-подобный статус обработки метода |
| `query.full_name` | ФИО, использованное для поиска |
| `query.birth_date` | Дата рождения, использованная для поиска |
| `found` | `true`, если найдена хотя бы одна карточка |
| `registry_status` | `found`, `not_found`, `captcha_error` или `error` |
| `captcha_error` | Признак ошибки прохождения капчи источника |
| `message` | Текстовое сообщение источника, если оно было на странице |
| `total_found` | Количество найденных записей по данным страницы |
| `data` | Список карточек розыска |

## Поля `data[]`

| Поле | Описание |
|------|----------|
| `full_name` | ФИО из карточки МВД |
| `birth_date` | Дата рождения из карточки, если источник ее отдал |
| `birth_date_match` | Совпала ли дата рождения с запросом |
| `match` | Тип совпадения по ФИО: например, `exact` |
| `wanted_region` | Регион или подразделение розыска |
| `wanted_reason` | Основание для розыска |
| `details` | Установочные данные из карточки |
| `contacts` | Контактная информация из карточки |
| `image_url` | URL изображения карточки, если есть |
| `detail_images` | Дополнительные изображения из popup-карточки |
| `popup_id` | Идентификатор popup-карточки на странице источника |
| `source` | URL источника |
| `raw_text` | Нормализованный текст карточки для аудита парсинга |

## Особенности

- Email нужен только для отправки формы на стороне источника МВД и не возвращается в `result`.
- Если источник вернул страницу с ошибкой капчи и карточки не разобраны, `registry_status` будет `captcha_error`.
- Метод фильтрует найденные записи по дате рождения, если источник отдал дату рождения в карточке.

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "mvd_wanted",
  "intent": "Проверка физического лица в публичном розыске МВД",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["method", "lastname", "firstname", "dob", "email"],
  "returns": [
    "results.mvd_wanted.result.status",
    "results.mvd_wanted.result.found",
    "results.mvd_wanted.result.registry_status",
    "results.mvd_wanted.result.data"
  ]
}
```

</details>
