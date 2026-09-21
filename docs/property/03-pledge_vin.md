---
title: "pledge_vin — проверка залога по VIN"
description: "Метод NEWDB pledge_vin ищет сведения о залогах и иных обременениях по VIN в реестре ФНП и Федресурсе."
canonical_url: https://newdb.net/docs/property/03-pledge_vin/
meta:
  - name: keywords
    content: "NEWDB API, pledge_vin, залог, VIN, ФНП, Федресурс"
  - property: og:title
    content: "Проверка залога по VIN — метод pledge_vin"
  - property: og:description
    content: "Получите данные ФНП и Федресурса о залоге, лизинге и обременениях транспортного средства по VIN через API NEWDB."
---

# pledge_vin — Проверка залога и обременений по VIN (ФНП + Федресурс)

POST `https://api.newdb.net/v2`

Метод выполняет поиск сведений о залоге, лизинге и других обременениях конкретного транспортного средства по его VIN.  
Используются данные:

- **ФНП** — Реестр уведомлений о залоге движимого имущества;
- **Федресурс** — сообщения о праве залога, договорах лизинга и изменениях.

Поиск осуществляется по параметру `vin`.

---

**Раздел:** [Имущество](index.md)

## Связанные страницы

- [Обзор раздела имущество](index.md)
- [pledge_property — Проверка залога и обременений по ID (ФНП + Федресурс)](02-pledge_property.md)
- [nspd_cadastr — Получение геоданных по кадастровому номеру](04-nspd_cadastr.md)
- [rosreestr — Проверка объекта недвижимости (Росреестр)](01-rosreestr.md)

## Когда использовать

Используйте метод, когда нужно проверить объект недвижимости, транспорт или сведения о залоге и обременениях.

## Типовые кейсы

- Проверка объекта перед сделкой или выдачей займа
- Получение сведений о залоге, кадастровых данных или геометрии объекта
- Обогащение карточки имущества структурированными данными из внешнего реестра

## Заголовки

```text
Content-Type: application/json
X-API-KEY: <your_token>
```

## Пример запроса

POST /v2 HTTP/1.1  
Host: api.newdb.net  
Content-Type: application/json  
X-API-KEY: YOUR_TOKEN

```json
{
  "params": {
    "method": "pledge_vin",
    "country": "ru",
    "vin": "JTEHD21A850036287"
  },
  "requestId": "a5962f88-2926-4279-b59d-43c023faa195"
}
```

## Пример ответа

```json
{
  "params": {
    "method": "pledge_vin",
    "country": "ru",
    "vin": "JTEHD21A850036287",
    "newdb_qid": "EK0LIPKclrO0MygC"
  },
  "requestId": "a5962f88-2926-4279-b59d-43c023faa195",
  "datecreated": "2025-12-22 17:10:18",
  "state": "complete",
  "balance": 7977,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "pledge_vin": {
      "result": {
        "status": 200,
        "data": [
          {
            "fnp": [
              {
                "source": "ФНП",
                "registry": "Реестр уведомлений о залоге движимого имущества",
                "message_number_and_date": "2015-000-291842-833 от 29.01.2015",
                "reference_number": "2015-000-291842-833",
                "message_type": "Возникновение залога",
                "pledge_subject_ids_raw": "JTEHD21A850036287",
                "pledgor": "Игорь Юрьевич Семенов",
                "pledgee": "АКЦИОНЕРНЫЙ БАНК \"ИНТЕРПРОГРЕССБАНК\" (ЗАКРЫТОЕ АКЦИОНЕРНОЕ ОБЩЕСТВО)",
                "guid": "e612c5ce-2e10-3d20-9112-cf520df444ac",
                "fnp_url": "https://www.reestr-zalogov.ru/search/notification/e612c5ce-2e10-3d20-9112-cf520df444ac",
                "json_extra": {
                  "registrationTime": "2015-01-29T16:40:08",
                  "referenceNumber": "2015-000-291842-833",
                  "guid": "e612c5ce-2e10-3d20-9112-cf520df444ac",
                  "pledgors": [
                    "Игорь Юрьевич Семенов"
                  ],
                  "pledgees": [
                    "АКЦИОНЕРНЫЙ БАНК \"ИНТЕРПРОГРЕССБАНК\" (ЗАКРЫТОЕ АКЦИОНЕРНОЕ ОБЩЕСТВО)"
                  ],
                  "subjects": [
                    "JTEHD21A850036287"
                  ],
                  "fnpUrl": "https://www.reestr-zalogov.ru/search/notification/e612c5ce-2e10-3d20-9112-cf520df444ac"
                }
              }
            ],
            "fedresurs": [],
            "fnp_urls": [
              "https://www.reestr-zalogov.ru/search/notification/e612c5ce-2e10-3d20-9112-cf520df444ac"
            ]
          }
        ]
      },
      "dateupdated": "2025-12-22 17:10:33"
    }
  }
}
```

## Пример ответа (данные не найдены)

```json
{
  "state": "complete",
  "results": {
    "pledge_vin": {
      "result": {
        "status": 200,
        "data": []
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
  "method": "pledge_vin",
  "intent": "Проверка залога и обременений по VIN транспортного средства",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["vin", "method", "country"],
  "returns": ["state", "results.pledge_vin.result.status", "results.pledge_vin.result.data"]
}
```

</details>


