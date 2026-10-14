---
title: "egrul — сведения ЕГРЮЛ / Прозрачный бизнес"
description: "Метод NEWDB egrul получает сведения о юридическом лице из сервиса Прозрачный бизнес по ИНН."
canonical_url: https://newdb.net/docs/legal/04-egrul/
meta:
  - name: keywords
    content: "NEWDB API, egrul, ЕГРЮЛ, Прозрачный бизнес, юрлица"
  - property: og:title
    content: "ЕГРЮЛ / Прозрачный бизнес — метод egrul"
  - property: og:description
    content: "Проверка сведений о юридическом лице по ИНН через API NEWDB."
---

# egrul — Сведения ЕГРЮЛ / Прозрачный бизнес

POST `https://api.newdb.net/v2`

Метод выполняет поиск карточки юридического лица по `inn` через сервис ФНС "Прозрачный бизнес". Возвращаются данные поиска, карточка компании, признаки риска и ссылки на выписку.

**Раздел:** [Юридические лица](index.md)

## Связанные страницы

- [Обзор раздела юридические лица](index.md)
- [bankrot_legal — Проверка на банкротство юрлица (Федресурс)](03-bankrot_legal.md)
- [fssp_legal — Исполнительные производства ФССП по ИНН юрлица](05-fssp_legal.md)
- [fns_block — Проверка блокировок счетов юрлица (ФНС)](02-fns_block.md)

## Когда использовать

Используйте метод, когда нужно получить сведения о юридическом лице, его рисках, долгах, блокировках или судебной активности.

## Типовые кейсы

- Проверка контрагента перед сделкой или оплатой
- Автоматическое обогащение карточки компании по ИНН
- Выявление признаков банкротства, блокировок, исполнительных производств или арбитража

## Заголовки

```text
Content-Type: application/json
X-API-KEY: <your_token>
```

## Входная схема (request)

```json
{
  "params": {
    "inn": "string (ИНН юрлица)",
    "country": "string (ru)",
    "method": "egrul"
  },
  "webhook": "https://your.host/whook",
  "requestId": "optional-string"
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
    "inn": "1326200720",
    "country": "ru",
    "method": "egrul"
  },
  "webhook": "https://newer.net/whook",
  "requestId": "81863f88-3316-5779-b69d-45c011faa898"
}
```

## Пример ответа

```json
{
  "params": {
    "inn": "1326200720",
    "country": "ru",
    "method": "egrul"
  },
  "webhook": "https://newer.net/whook",
  "requestId": "81863f88-3316-5779-b69d-45c011faa898",
  "datecreated": "2026-03-14 23:04:55",
  "state": "complete",
  "balance": 9792,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "egrul": {
      "taskId": "4474b111-00cb-416a-98e6-3c7008eed9e5",
      "dateupdated": "2026-03-14 23:05:09",
      "result": {
        "status": 200,
        "data": [
          {
            "request": {
              "url": "https://pb.nalog.ru/",
              "query": "1326200720",
              "title": "Прозрачный бизнес"
            },
            "http": {
              "page_status": 200,
              "search_status": 200,
              "company_details_status": 200
            },
            "search": {
              "sections": {
                "upr": {
                  "hasMore": false,
                  "pageSize": 10,
                  "rowCount": 0,
                  "page": 1,
                  "itemsCount": 0
                },
                "ip": {
                  "hasMore": false,
                  "pageSize": 10,
                  "rowCount": 0,
                  "page": 1,
                  "itemsCount": 0
                },
                "ul": {
                  "hasMore": false,
                  "pageSize": 10,
                  "rowCount": 1,
                  "page": 1,
                  "itemsCount": 1
                },
                "docip": {
                  "hasMore": false,
                  "pageSize": 10,
                  "rowCount": 0,
                  "page": 1,
                  "itemsCount": 0
                },
                "docul": {
                  "hasMore": false,
                  "pageSize": 10,
                  "rowCount": 0,
                  "page": 1,
                  "itemsCount": 0
                },
                "rdl": {
                  "hasMore": false,
                  "pageSize": 10,
                  "rowCount": 0,
                  "page": 1,
                  "itemsCount": 0
                },
                "addr": {
                  "hasMore": false,
                  "pageSize": 10,
                  "rowCount": 0,
                  "page": 1,
                  "itemsCount": 0
                },
                "ogrfl": {
                  "hasMore": false,
                  "pageSize": 10,
                  "rowCount": 0,
                  "page": 1,
                  "itemsCount": 0
                },
                "ogrul": {
                  "hasMore": false,
                  "pageSize": 10,
                  "rowCount": 0,
                  "page": 1,
                  "itemsCount": 0
                },
                "uchr": {
                  "hasMore": false,
                  "pageSize": 10,
                  "rowCount": 0,
                  "page": 1,
                  "itemsCount": 0
                }
              },
              "total_items": 1,
              "matches": [
                {
                  "section": "ul",
                  "inn": "1326200720",
                  "ogrn": "1071326002076",
                  "name_short": "ООО \"ЧОО \"ДЕЛЬТА\"",
                  "name_full": "ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ \"ЧАСТНАЯ ОХРАННАЯ ОРГАНИЗАЦИЯ \"ДЕЛЬТА\"",
                  "status": "Процесс банкротства",
                  "address": null,
                  "region": "РЕСПУБЛИКА МОРДОВИЯ",
                  "registration_date": "27.03.2007",
                  "ogrn_date": "27.03.2007",
                  "okved_code": "80.10",
                  "okved_name": "Деятельность охранных служб, в том числе частных",
                  "bankruptcy_flag": false,
                  "liquidation_flag": false,
                  "invalid_flag": false,
                  "links": {
                    "business_card": "https://bo.nalog.gov.ru/organizations-card/4042649",
                    "founding_docs": "https://service.nalog.ru/puchdoc/?o=974D1289DE69B8DD67495099C48A1AF524B76C75CE9867E8AB04D8B5E1A631F381128499F23834F57B1A849EADA5F467",
                    "gosreg": "https://service.nalog.ru/gosreg/index.html#ul",
                    "egrul": "token=1A3B241C6C01671040636B7E220FD9D5E0C66A4FFAA5C03BDF8E140B04998DBE57863BF1AAC1C9F4FDA99B0D0A7128C8D175C67766DD4ABD1FECB1B4527CC777&inn=1326200720&pdf=vyp"
                  }
                }
              ]
            },
            "company": {
              "details_url": "https://pb.nalog.ru/company-proc.json",
              "profile": {
                "token": "0128CB3F34947D65B49C17347D48192AF1A3058B77FBF7B554074386C18877DCD5A76362EE117E92314A29FF4883DB9BD6EA257F49A97E1F106EEF5DE65D2071",
                "type": 1,
                "company": {
                  "inn": "1326200720",
                  "ogrn": "1071326002076",
                  "name_short": "ООО \"ЧОО \"ДЕЛЬТА\"",
                  "name_full": "ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ \"ЧАСТНАЯ ОХРАННАЯ ОРГАНИЗАЦИЯ \"ДЕЛЬТА\"",
                  "status": "Процесс банкротства",
                  "address": "430005, РЕСПУБЛИКА МОРДОВИЯ, Г САРАНСК, УЛ А.НЕВСКОГО, Д. 67",
                  "region": "РЕСПУБЛИКА МОРДОВИЯ",
                  "okved_code": "80.10",
                  "okved_name": "Деятельность охранных служб, в том числе частных"
                },
                "flags": {
                  "liquidated": false,
                  "is_p": true,
                  "is_p_taxmode": true,
                  "is_p_taxpay": true,
                  "is_p_arrear": true,
                  "is_p_form1": true,
                  "is_p_uchr": true,
                  "is_p_ruk": true
                },
                "totals": {
                  "total_arrear_sum": 6941253,
                  "taxpay_sum": 29531,
                  "revenue": 0,
                  "expense": 0
                },
                "dates": {
                  "ogrn_date": "2007-03-27",
                  "reg_date": "2022-04-25",
                  "extract_date": "2025-02-07"
                },
                "management": {
                  "directors": [
                    {
                      "name": "ОВЧИННИКОВ ЮРИЙ АЛЕКСАНДРОВИЧ",
                      "inn": "132400664876",
                      "position": "КОНКУРСНЫЙ УПРАВЛЯЮЩИЙ"
                    }
                  ],
                  "founders": [
                    {
                      "name": "БОРИСКИН АЛЕКСАНДР ВИКТОРОВИЧ",
                      "inn": "132802212020"
                    }
                  ]
                },
                "risk": {
                  "active_appeals_count": 0,
                  "offense_years": [2024, 2023, 2022],
                  "arrear_periods": [
                    {
                      "year": 2025,
                      "period": 11,
                      "total": 1283616.57,
                      "empty": false
                    }
                  ]
                },
                "reporting": {
                  "taxmode_latest": {
                    "year": 2026,
                    "period": 2,
                    "usn": 1,
                    "ausn": 0,
                    "envd": 0,
                    "eshn": 0,
                    "spr": 0
                  },
                  "form1_last3y": [
                    {
                      "year": 2024,
                      "revenue": 0,
                      "expense": 0
                    }
                  ]
                }
              }
            }
          }
        ]
      }
    }
  }
}
```

## Основные блоки ответа

| Поле | Описание |
|------|----------|
| `request` | Параметры обращения к источнику |
| `http` | Статусы HTTP-шагов при сборе данных |
| `search` | Результаты поиска по источнику |
| `company` | Детальная карточка компании |

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "egrul",
  "intent": "Получение сведений ЕГРЮЛ и данных Прозрачного бизнеса",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["inn", "method", "country"],
  "returns": ["state", "results.egrul.result.status", "results.egrul.result.data[].search", "results.egrul.result.data[].company"]
}
```

</details>


