---
title: "opensanctions — поиск санкций, PEP и связанных рисков"
description: "Метод NEWDB ищет физлиц и организации на сайте OpenSanctions и возвращает только карточки, точно совпавшие по указанным ИНН и дате рождения."
canonical_url: https://newdb.net/docs/fiz/27-opensanctions/
meta:
  - name: keywords
    content: "NEWDB API, OpenSanctions, санкции, PEP, комплаенс, санкционный скрининг, ИНН"
---

# opensanctions — поиск санкций, PEP и связанных рисков

POST `https://api.newdb.net/v2`

Метод выполняет поиск по публичному сайту OpenSanctions через браузерный CDP-сеанс, открывает найденные карточки и возвращает только объекты, прошедшие все заданные уточняющие фильтры. OpenSanctions API при этом не используется.

Метод подходит для проверки физического лица по ФИО, организации по названию, а также для уточнения совпадения по ИНН и дате рождения.

**Раздел:** [Физические лица](index.md)

## Когда использовать

- санкционный и PEP-скрининг физического лица;
- проверка организации по названию и ИНН;
- уточнение однофамильцев по дате рождения;
- получение структурированной карточки OpenSanctions для дальнейшего комплаенс-анализа.

## Заголовки

```text
Content-Type: application/json
X-API-KEY: <your_token>
```

## Параметры запроса

| Поле | Тип | Обязательное | Описание |
| --- | --- | --- | --- |
| `params.method` | `string` | Да | Идентификатор метода: `opensanctions`. |
| `params.query` | `string` | Да* | ФИО или название организации, до 500 символов. |
| `params.fio` | `string` | Да* | Алиас `query` для ФИО. |
| `params.name` | `string` | Да* | Алиас `query` для имени или названия. |
| `params.company_name` | `string` | Да* | Алиас `query` для названия организации. |
| `params.inn` | `string` | Нет | ИНН из 10 или 12 цифр. Карточка проходит только при точном совпадении с полем `INN` или `Tax Number`. |
| `params.birth_date` | `string` | Нет | Дата рождения в формате `YYYY-MM-DD` или `DD.MM.YYYY`. Поддерживаются алиасы `birthdate`, `date_of_birth`, `birthday`. |
| `params.max_results` | `integer` | Нет | Максимальное число карточек для открытия и проверки: от 1 до 100, по умолчанию 25. |
| `params.country` | `string` | Нет | Для общего контракта NEWDB обычно передается `ru`; на поиск OpenSanctions не влияет. |

\* Необходимо передать одно из полей `query`, `fio`, `name` или `company_name`.

Если одновременно переданы `inn` и `birth_date`, карточка включается в `data` только при совпадении **обоих** значений. Отсутствие запрошенного поля в карточке считается несовпадением.

## Пример запроса физического лица

```json
{
  "requestId": "00000000-0000-4000-8000-000000000001",
  "params": {
    "method": "opensanctions",
    "query": "ИВАНОВ ИВАН ИВАНОВИЧ",
    "inn": "500100732259",
    "birth_date": "1980-01-01",
    "max_results": 25,
    "country": "ru"
  }
}
```

## Пример запроса организации

```json
{
  "requestId": "00000000-0000-4000-8000-000000000002",
  "params": {
    "method": "opensanctions",
    "company_name": "ООО ПРИМЕР",
    "inn": "7712345678",
    "country": "ru"
  }
}
```

## Пример успешного ответа

```json
{
  "requestId": "00000000-0000-4000-8000-000000000001",
  "state": "complete",
  "results": {
    "opensanctions": {
      "taskId": "00000000-0000-4000-8000-000000000101",
      "dateupdated": "2026-09-18 12:00:00",
      "result": {
        "status": 200,
        "found": true,
        "registry_status": "found",
        "data": [
          {
            "id": "example-entity-id",
            "name": "IVAN IVANOV",
            "url": "https://www.opensanctions.org/entities/example-entity-id/",
            "search_details": "Person · Sanctioned",
            "fields": {
              "Topics": ["Sanctioned", "1 source"],
              "Name": ["IVAN IVANOV", "1 source"],
              "Birth date": ["1980-01-01", "1 source"],
              "INN": ["500100732259", "1 source"]
            }
          }
        ],
        "meta": {
          "query": "ИВАНОВ ИВАН ИВАНОВИЧ",
          "filters": {"inn": "500100732259", "birth_date": "1980-01-01"},
          "matching": "all_provided_filters_exact",
          "search_result_count": 1,
          "cards_scanned": 1,
          "matched_count": 1
        }
      }
    }
  }
}
```

## Ответ без точных совпадений

Завершенный поиск без карточек, прошедших фильтры, не является системной ошибкой:

```json
{
  "status": 200,
  "found": false,
  "registry_status": "not_found",
  "data": []
}
```

## Поля объекта `data[]`

| Поле | Тип | Описание |
| --- | --- | --- |
| `id` | `string` | Идентификатор сущности OpenSanctions. |
| `name` | `string` | Основное имя физлица или организации. |
| `url` | `string` | Публичная ссылка на карточку. |
| `search_details` | `string` | Краткие признаки из поисковой выдачи. |
| `fields` | `object` | Поля карточки. Ключи соответствуют подписям OpenSanctions, значения представлены массивами строк. |

Обычно в `fields` могут присутствовать `Topics`, `Name`, `Alias`, `Birth date`, `Country`, `INN`, `Tax Number`, `Address`, `Position`, `Description`, `Source link` и другие доступные поля карточки.

## Статусы и CAPTCHA

- `result.status: 200` — поиск завершен; `data` содержит только точные совпадения.
- `result.status: 400` — некорректные параметры запроса.
- `result.status: 500`, верхнеуровневый `status: "error"` — источник или CDP недоступен, либо обнаружена Cloudflare/reCAPTCHA/hCaptcha-проверка; запрос допускает повторный запуск.

Защитная страница не трактуется как отсутствие совпадений и не приводит к ложному `data: []` со статусом успешного поиска.

## Ограничения

- Результат зависит от текущего содержимого публичного сайта OpenSanctions.
- Метод открывает каждую найденную карточку, поэтому увеличение `max_results` повышает время выполнения.
- Использование данных должно соответствовать условиям и лицензии OpenSanctions.

## Связанные методы

- [terrorist — перечень Росфинмониторинга](12-terrorist.md)
- [mvd_wanted — розыск МВД](13-mvd_wanted.md)
- [disqualified_person — дисквалифицированные лица ФНС](19-disqual.md)
- [fsin_wanted — розыск ФСИН](26-fsin.md)
