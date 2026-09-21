---
title: "driver_license — проверка водительского удостоверения (Госуслуги / ГИБДД)"
description: "Метод NEWDB driver_license проверяет действительность водительского удостоверения, категории ТС, срок действия и сведения о лишении прав через Госуслуги и ГИБДД."
canonical_url: https://newdb.net/docs/fiz/25-driver_license/
meta:
  - name: keywords
    content: "NEWDB API, driver_license, проверка водительских прав, ГИБДД, Госуслуги, проверка ВУ, категории прав, лишение прав"
  - property: og:title
    content: "Проверка водительского удостоверения — метод driver_license"
  - property: og:description
    content: "Спецификация запроса, заголовков и ответов метода driver_license для проверки водительских прав через базы ГИБДД."
---

# driver_license — Проверка водительского удостоверения

POST `https://api.newdb.net/v2`

Проверяет водительское удостоверение (ВУ) РФ по номеру, серии, ФИО и дате рождения через официальный сервис Госуслуг и базу данных ГИБДД МВД РФ.

**Раздел:** [Физические лица](index.md)

## Связанные страницы

- [Обзор раздела физические лица](index.md)
- [passport_mvd — Проверка паспорта РФ на действительность](03-passport_mvd.md)
- [vin_check — Проверка автомобиля по VIN (Госуслуги)](../property/07-vin_check.md)
- [complex_by_passport — Комплексная проверка по данным паспорта](04-complex_by_passport.md)

## Когда использовать

- Проверка подлинности и действительности водительского удостоверения соискателя при найме водителей, курьеров, экспедиторов.
- Скоринг и комплаенс-проверка клиентов в сервисах каршеринга, автопроката и таксопарках.
- Проверка наличия судебных решений о лишении права управления транспортными средствами.
- Определение категорий транспортных средств (`B`, `C`, `D`, `CE` и др.) и водительского стажа.

## Заголовки
```
Content-Type: application/json
X-API-KEY: <your_token>
```

## Параметры запроса

| Параметр | Тип | Обязательный | Описание |
| :--- | :--- | :--- | :--- |
| `num` | string | **Да** | Серия и номер водительского удостоверения (10 символов, например `9901123456` или `99 01 123456`). Поддерживается также алиас `driver_license`. |
| `lastname` | string | **Да** | Фамилия владельца ВУ (на русском языке, например `Иванов`). |
| `firstname` | string | **Да** | Имя владельца ВУ (на русском языке, например `Иван`). |
| `birthdate` | string | **Да** | Дата рождения водителя в формате `YYYY-MM-DD` (`1990-01-01`) или `DD.MM.YYYY` (`01.01.1990`). Поддерживается также алиас `dob`. |
| `secondname` | string | Нет | Отчество владельца ВУ (при наличии). Опционально. |
| `method` | string | **Да** | Значение `driver_license`. |
| `country` | string | Нет | Код страны, по умолчанию `ru`. |
| `get_screen` | integer | Нет | `1` — сохранить скриншот страницы с результатом проверки, `0` — без скриншота (по умолчанию). |

## Входная схема (request)

```json
{
  "params": {
    "num": "99 01 123456",
    "lastname": "Иванов",
    "firstname": "Иван",
    "secondname": "Иванович",
    "birthdate": "1990-01-01",
    "method": "driver_license",
    "country": "ru"
  },
  "webhook": "https://your.host/whook",
  "requestId": "00000000-0000-4000-8000-000000000001"
}
```

## Пример запроса

```http
POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_TOKEN

{
  "params": {
    "num": "99 01 123456",
    "lastname": "Иванов",
    "firstname": "Иван",
    "secondname": "Иванович",
    "birthdate": "01.01.1990",
    "method": "driver_license",
    "country": "ru",
    "get_screen": 0
  },
  "webhook": "https://your.host/whook",
  "requestId": "00000000-0000-4000-8000-000000000001"
}
```

## Пример ответа (удостоверение найдено)

```json
{
  "params": {
    "num": "99 01 123456",
    "lastname": "Иванов",
    "firstname": "Иван",
    "secondname": "Иванович",
    "birthdate": "1990-01-01",
    "method": "driver_license"
  },
  "requestId": "00000000-0000-4000-8000-000000000001",
  "state": "complete",
  "status": "success",
  "results": {
    "driver_license": {
      "taskId": "00000000-0000-4000-8000-000000000002",
      "dateupdated": "2026-09-17 12:00:00",
      "result": {
        "status": 200,
        "found": true,
        "data": [
          {
            "num": "99 01 123456",
            "status": "Действует",
            "is_valid": true,
            "is_deprived": false,
            "issue_date": "15.05.2020",
            "expire_date": "15.05.2030",
            "categories": [
              "B",
              "B1",
              "M"
            ],
            "experience_from": "2008",
            "birth_place": "Г. МОСКВА",
            "deprivation": null,
            "special_notes": null,
            "applicant": {
              "lastname": "Иванов",
              "firstname": "Иван",
              "secondname": "Иванович",
              "birthdate": "01.01.1990"
            }
          }
        ],
        "message": "Сведения о водительском удостоверении успешно получены"
      }
    }
  }
}
```

## Пример ответа (удостоверение не найдено)

Если в базе данных ГИБДД отсутствуют записи с переданными параметрами, возвращается HTTP 200 со статусом `found: false` и пустым массивом `data`:

```json
{
  "state": "complete",
  "status": "success",
  "results": {
    "driver_license": {
      "result": {
        "status": 200,
        "found": false,
        "data": [],
        "message": "Водительское удостоверение с указанными входными параметрами не найдено"
      }
    }
  }
}
```

## Поля объекта записи в `data`

| Поле | Тип | Описание |
| :--- | :--- | :--- |
| `num` | string | Серия и номер удостоверения в читаемом формате (`99 01 123456`). |
| `status` | string | Текущий статус документа («Действует», «Лишен права управления», «Недействительно»). |
| `is_valid` | boolean | Флаг действительности удостоверения (`true` — действительно и нет лишения). |
| `is_deprived` | boolean | Флаг лишения права управления (`true` — водитель лишен прав). |
| `issue_date` | string | Дата выдачи удостоверения. |
| `expire_date` | string | Дата окончания срока действия документа. |
| `categories` | array | Список открытых категорий транспортных средств (`["B", "B1", "M"]`). |
| `experience_from` | string | Год начала водительского стажа (например `"2008"`). |
| `birth_place` | string | Место рождения водителя по данным ГИБДД. |
| `deprivation` | object \| null | Детали судебного постановления о лишении прав (дата, срок, состояние исполнения) при наличии. |
| `special_notes` | string \| null | Особые отметки водителя (ограничения по зрению, автоматическая трансмиссия `AT` и др.). |

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "driver_license",
  "intent": "Проверка водительского удостоверения РФ через сервис Госуслуг и ГИБДД",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["num", "lastname", "firstname", "birthdate", "method"],
  "aliases": {
    "num": ["driver_license", "vu_number", "number"],
    "birthdate": ["dob"]
  },
  "returns": ["results.driver_license.result.status", "results.driver_license.result.found", "results.driver_license.result.data"]
}
```

</details>
