---
title: "pledge_person — проверка залогов и обременений по физлицу"
description: "Метод NEWDB pledge_person ищет сведения о залогах и иных обременениях физического лица по ФИО и дате рождения в реестре ФНП и Федресурсе."
canonical_url: https://newdb.net/docs/fiz/06-pledge_person/
meta:
  - name: keywords
    content: "NEWDB API, pledge_person, залог, обременение, ФНП, Федресурс, проверка физлица"
  - property: og:title
    content: "Проверка залогов и обременений физлица — метод pledge_person"
  - property: og:description
    content: "Получите данные ФНП и Федресурса по залогам, лизингу и обременениям физического лица по ФИО и дате рождения через API NEWDB."
---

# pledge_person — Проверка залогов и обременений (ФНП + Федресурс)

POST `https://api.newdb.net/v2`

Метод выполняет поиск сведений о залогах, лизинге и других обременениях в отношении физического лица.  
Используются данные:

- **ФНП** — Реестр уведомлений о залоге движимого имущества;
- **Федресурс** — сообщения о возникновении прав залога, договорах лизинга и других обременениях.

Поиск осуществляется по ФИО и дате рождения физического лица, или ИНН. 
День рождения является не обязательным параметром, используется для фильтрации релевантных записей.



## Смотри также

- [Комплексная проверка по паспорту](04-complex_by_passport.md) — объединённый отчёт по всем источникам для физлица
- [Проверка по VIN](../property/03-pledge_vin.md) — поиск залогов и обременений по номеру VIN автомобиля
- [Проверка по ID/VIN](../property/02-pledge_property.md) — поиск залогов и обременений по идентификатору или VIN предмета

---

**Раздел:** [Физические лица](index.md)

## Связанные страницы

- [Обзор раздела физические лица](index.md)
- [bankrot_person — Проверка на банкротство физлица (Федресурс)](05-fedresurs_bankrot.md)
- [arbitr_person — Проверка арбитражных дел (физлица, КАД)](07-arbitr_person.md)
- [complex_by_passport — Комплексная проверка по данным паспорта](04-complex_by_passport.md)

## Когда использовать

Используйте метод, когда нужно проверить физлицо, документ или связанный с ним государственный реестр по структурированным данным.

## Типовые кейсы

- Проверка анкеты клиента перед onboarding или выдачей услуги
- Автоматическая верификация паспорта, ИНН, задолженностей или ограничений
- Обогащение внутренней карточки физлица данными из внешнего источника

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
    "firstname": "Сергей",
    "lastname": "Петров",
    "secondname": "Андреевич",
    "country": "ru",
    "dob": "1985-05-10",
    "method": "pledge_person"
  },
  "requestId": "a5962f88-2916-4779-b59d-43c023faa937"
}
```

##Пример ответа 

```json
{
  "params": {
    "firstname": "Сергей",
    "lastname": "Петров",
    "secondname": "Андреевич",
    "country": "ru",
    "dob": "1985-05-10",
    "method": "pledge_person",
    "newdb_qid": "EOgIIM29hqGwMygC"
  },
  "requestId": "a5962f88-2916-4779-b59d-43c023faa833",
  "datecreated": "2025-12-09 20:21:09",
  "state": "complete",
  "balance": 9928,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "pledge_person": {
      "result": {
        "status": 200,
        "data": [
          {
            "fnp": [
              {
                "source": "ФНП",
                "registry": "Реестр уведомлений о залоге движимого имущества",
                "message_number_and_date": "2025-012-232030-634 от 24.11.2025",
                "reference_number": "2025-012-232030-634",
                "message_type": "Возникновение залога",
                "pledge_subject_ids_raw": "Y4K8722Z3SB324012",
                "pledgor": "СЕРГЕЙ АНДРЕЕВИЧ ПЕТРОВ",
                "pledgee": "АКЦИОНЕРНОЕ ОБЩЕСТВО \"АЛЬФА-БАНК\"",
                "guid": "02cf5675-4c28-34f3-a3e0-898b24544077",
                "fnp_url": "https://www.reestr-zalogov.ru/search/notification/02cf5675-4c28-34f3-a3e0-898b24544077",
                "json_extra": {
                  "registrationTime": "2025-11-24T11:04:56",
                  "referenceNumber": "2025-012-232030-634",
                  "guid": "02cf5675-4c28-34f3-a3e0-898b24544077",
                  "pledgors": [
                    "СЕРГЕЙ АНДРЕЕВИЧ ПЕТРОВ"
                  ],
                  "pledgees": [
                    "АКЦИОНЕРНОЕ ОБЩЕСТВО \"АЛЬФА-БАНК\""
                  ],
                  "subjects": [
                    "Y4K8722Z3SB324012"
                  ],
                  "fnpUrl": "https://www.reestr-zalogov.ru/search/notification/02cf5675-4c28-34f3-a3e0-898b24544077"
                },
                "pledgor_detail_raw": "СЕРГЕЙ АНДРЕЕВИЧ ПЕТРОВ, 10.05.1985",
                "pledgor_detail_name": "СЕРГЕЙ АНДРЕЕВИЧ ПЕТРОВ",
                "pledgor_detail_birthdate": "10.05.1985"
              }
            ],
            "fedresurs": [
              {
                "source": "Федресурс",
                "message_number_and_date": "15169291 от 15.08.2023",
                "message_number": "15169291",
                "message_url": "https://fedresurs.ru/sfactmessages/290383f3-5712-4a9a-a1c1-d8ac93c76ada",
                "message_type": "Заключение договора финансовой аренды (лизинга)",
                "lessee": "Петров Сергей Андреевич",
                "lessor": "ООО \"ГРИНФИНАНС МА\"",
                "found_in_message": "... Сергей Андреевич Договор: 531/03/23-А/МА/А от 17.03.2023 Предмет финансовой аренды: , 0106008 Автомобили, Volkswagen, Polo, VIN XW8ZZZCKZMG012344 Срок ...",
                "links": [
                  {
                    "text": "15169291 от 15.08.2023",
                    "url": "https://fedresurs.ru/sfactmessages/290383f3-5712-4a9a-a1c1-d8ac93c76ada"
                  }
                ],
                "encumbrance_guid": "290383f3-5712-4a9a-a1c1-d8ac93c76ada",
                "encumbrance_publish_date": "2023-08-15T10:10:28.393",
                "encumbrance_type": "FinancialLeaseContract",
                "encumbrance_highlights_raw": [
                  "<res>Сергей</res> <res>Андреевич</res>\nДоговор: 531/03/23-А/МА/А от  17.03.2023\nПредмет финансовой аренды: , 0106008 Автомобили, Volkswagen, Polo, VIN XW8ZZZCKZMG012344\nСрок",
                  "ООО \"ГРИНФИНАНС МА\", ОГРН: 1166313123822, ИНН: 6330073199\nЛизингодатель: ООО \"ГРИНФИНАНС МА\", ОГРН: 1166313123822, ИНН: 6330073199\nЛизингополучатель: <res>Петров</res>"
                ],
                "encumbrance_highlights_text": "<res>Сергей</res> <res>Андреевич</res>\nДоговор: 531/03/23-А/МА/А от  17.03.2023\nПредмет финансовой аренды: , 0106008 Автомобили, Volkswagen, Polo, VIN XW8ZZZCKZMG012344\nСрок\nООО \"ГРИНФИНАНС МА\", ОГРН: 1166313123822, ИНН: 6330073199\nЛизингодатель: ООО \"ГРИНФИНАНС МА\", ОГРН: 1166313123822, ИНН: 6330073199\nЛизингополучатель: <res>Петров</res>",
                "encumbrance_message_url": "https://fedresurs.ru/message/290383f3-5712-4a9a-a1c1-d8ac93c76ada",
                "json_extra": {
                  "number": "15169291",
                  "guid": "290383f3-5712-4a9a-a1c1-d8ac93c76ada",
                  "publishDate": "2023-08-15T10:10:28.393",
                  "type": "FinancialLeaseContract",
                  "lessee": {
                    "guid": "11b1bf07-46bd-4d2b-a3de-cdb886050ebd",
                    "type": "Person",
                    "role": "Lessee",
                    "isHidden": false,
                    "name": "Петров Сергей Андреевич"
                  },
                  "lessor": {
                    "guid": "895d63fc-8208-1728-95a4-6c2895b5dbf7",
                    "type": "Company",
                    "role": "Lessor",
                    "isHidden": false,
                    "name": "ООО \"ГРИНФИНАНС МА\"",
                    "inn": "6330073199",
                    "ogrn": "1166313123822"
                  },
                  "highlights_text": "<res>Сергей</res> <res>Андреевич</res> ... Лизингополучатель: <res>Петров</res>",
                  "message_url": "https://fedresurs.ru/message/290383f3-5712-4a9a-a1c1-d8ac93c76ada"
                }
              },
              {
                "source": "Федресурс",
                "message_number_and_date": "15593458 от 05.06.2023",
                "message_number": "15593458",
                "message_url": "https://fedresurs.ru/sfactmessages/40de7684-5762-430a-bd05-83eb515108e2",
                "message_type": "Возникновение права залога",
                "lessee": "",
                "lessor": "",
                "found_in_message": "Реестр_предоставленных_займов_МФО на 23.05.2023.xlsx",
                "links": [
                  {
                    "text": "15593458 от 05.06.2023",
                    "url": "https://fedresurs.ru/sfactmessages/40de7684-5762-430a-bd05-83eb515108e2"
                  }
                ],
                "encumbrance_guid": "40de7684-5762-430a-bd05-83eb515108e2",
                "encumbrance_publish_date": "2023-06-05T10:00:21.51",
                "encumbrance_type": "CreationRightOfPledge2",
                "encumbrance_highlights_raw": [],
                "encumbrance_highlights_text": "",
                "encumbrance_message_url": "https://fedresurs.ru/message/40de7684-5762-430a-bd05-83eb515108e2",
                "json_extra": {
                  "number": "15593458",
                  "guid": "40de7684-5762-430a-bd05-83eb515108e2",
                  "publishDate": "2023-06-05T10:00:21.51",
                  "type": "CreationRightOfPledge2",
                  "highlights_text": "",
                  "message_url": "https://fedresurs.ru/message/40de7684-5762-430a-bd05-83eb515108e2"
                }
              }
            ],
            "fnp_urls": [
              "https://www.reestr-zalogov.ru/search/notification/02cf5675-4c28-34f3-a3e0-898b24544077",
              "https://www.reestr-zalogov.ru/search/notification/02b56bf3-3fc4-3d30-b191-d6b831146a61",
              "https://www.reestr-zalogov.ru/search/notification/2b923573-861c-3909-8df4-d7999c85c270"
            ]
          }
        ]
      },
      "dateupdated": "2025-12-09 20:22:25"
    }
  }
}

```

## Пример ответа (данные не найдены )

```json 
{
  "state": "complete",
  "results": {
    "pledge_person": {
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
  "method": "pledge_person",
  "intent": "Проверка залогов и обременений по данным физического лица",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["firstname", "lastname", "method", "country"],
  "returns": ["state", "results.pledge_person.result.status", "results.pledge_person.result.data"]
}
```

</details>


