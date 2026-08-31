---
title: "bankrot_person — банкротство физлица через ЕФРСБ"
description: "Метод NEWDB bankrot_person ищет сведения о банкротстве физического лица в Едином федеральном реестре сведений о банкротстве."
canonical_url: https://newdb.net/docs/fiz/05-fedresurs_bankrot/
meta:
  - name: keywords
    content: "NEWDB API, bankrot_person, ЕФРСБ, банкротство, проверка физлица"
  - property: og:title
    content: "Проверка банкротства физлица — метод bankrot_person"
  - property: og:description
    content: "Получите статусы дел и публикации ЕФРСБ по ИНН физического лица через API NEWDB."
---

# bankrot_person — Проверка на банкротство физлица (Федресурс)

POST `https://api.newdb.net/v2`

Метод выполняет проверку физического лица на наличие сообщений о банкротстве в Едином федеральном реестре сведений о банкротстве (ЕФРСБ). Поиск осуществляется по ИНН физического лица.

**Рекомендуем также:** комплексная проверка по паспорту — [complex_by_passport](04-complex_by_passport.md).

---

**Раздел:** [Физические лица](index.md)

## Связанные страницы

- [Обзор раздела физические лица](index.md)
- [complex_by_passport — Комплексная проверка по данным паспорта](04-complex_by_passport.md)
- [pledge_person — Проверка залогов и обременений (ФНП + Федресурс)](06-pledge_person.md)
- [passport_mvd — Проверка паспорта РФ на действительность](03-passport_mvd.md)

## Когда использовать

Используйте метод, когда нужно проверить физлицо, документ или связанный с ним государственный реестр по структурированным данным.

## Типовые кейсы

- Проверка анкеты клиента перед onboarding или выдачей услуги
- Автоматическая верификация паспорта, ИНН, задолженностей или ограничений
- Обогащение внутренней карточки физлица данными из внешнего источника

## Заголовки

Content-Type: application/json
X-API-KEY: <your_token>

---

## Входная схема (request)

```json
{
  "params": {
    "innfiz": "string (ИНН физ. лица)",
    "country": "string (ru)",
    "method": "bankrot_person"
  },
  "webhook": "https://your.host/whook",
  "requestId": "optional-string"
}
```

---

## Пример запроса

```json
POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_TOKEN

{
  "params": {
    "innfiz": "270392288605",
    "country": "ru",
    "method": "bankrot_person"
  },
  "requestId": "a5962f88-2916-4779-b59d-43c023faa903"
}
```

---

## Пример ответа

```json
{
    "params": {
        "innfiz": "270392288605",
        "country": "ru",
        "method": "bankrot_person",
        "newdb_qid": "EOAIIPOM7p-vMygB"
    },
    "requestId": "a5962f88-2916-4779-b59d-43c023faa903",
    "datecreated": "2026-01-02 15:26:52",
    "state": "complete",
    "balance": 9893,
    "tasks": 1,
    "is_repeat": false,
    "results": {
        "bankrot_person": {
            "result": {
                "status": 200,
                "data": [
                    {
                        "bankruptcy": [
                            {
                                "case_number": "А73-7992/2017",
                                "case_url": "https://fedresurs.ru/legalcases/7975d0c7-9c63-41b4-b649-cd17331c759e",
                                "status": "Производство по делу завершено",
                                "messages": [
                                    {
                                        "message_info": "2475822 от 20.02.2018",
                                        "url": "https://fedresurs.ru/bankruptmessages/125ea70c-fb5b-29cb-5674-bbc1a56552a8",
                                        "type": "Сообщение о судебном акте"
                                    },
                                    {
                                        "message_info": "2399553 от 23.01.2018",
                                        "url": "https://fedresurs.ru/bankruptmessages/5f394cfc-149e-b52b-b5d4-f5a018d7d5ba",
                                        "type": "Сообщение о собрании кредиторов"
                                    },
                                    {
                                        "message_info": "2230490 от 14.11.2017",
                                        "url": "https://fedresurs.ru/bankruptmessages/96fd6a47-5290-3b19-a7c4-7b51d9e8593d",
                                        "type": "Уведомление о получении требований кредитора"
                                    }
                                ]
                            }
                        ],
                        "commmon": {
                            "type": "person",
                            "name_or_fio": "Пыж Анна Викторовна",
                            "inn": "270392288605",
                            "reg_number_type": "ОГРНИП",
                            "reg_number": "323270000057022",
                            "activity": "Торговля розничная, осуществляемая непосредственно при помощи информационно-коммуникационной сети Интернет",
                            "address": null,
                            "status": null,
                            "details_url": "https://fedresurs.ru/persons/19f439eb-3f9c-4d9e-88f8-94704f04d2ca"
                        },
                        "encumbrances": [],
                        "publications": [
                            {
                                "category": "О лице",
                                "number_date": "2475822 от 20.02.2018",
                                "title": "Сообщение о судебном акте. о завершении реализации имущества гражданина",
                                "url": "https://fedresurs.ru/bankruptmessages/125ea70c-fb5b-29cb-5674-bbc1a56552a8"
                            },
                            {
                                "category": "О лице",
                                "number_date": "2399553 от 23.01.2018",
                                "title": "Сообщение о собрании кредиторов",
                                "url": "https://fedresurs.ru/bankruptmessages/5f394cfc-149e-b52b-b5d4-f5a018d7d5ba"
                            },
                            {
                                "category": "О лице",
                                "number_date": "2230490 от 14.11.2017",
                                "title": "Уведомление о получении требований кредитора",
                                "url": "https://fedresurs.ru/bankruptmessages/96fd6a47-5290-3b19-a7c4-7b51d9e8593d"
                            }
                        ]
                    }
                ]
            },
            "taskId": "dc7e331a-b87f-45b9-ba30-a9fd0a8f7dfa",
            "dateupdated": "2026-01-02 15:27:12"
        }
    }
}
```

---

## Поля результата `results.bankrot_person.result.data[]`

| Поле | Описание |
|------|----------|
| `bankruptcy` | Список дел о банкротстве, их статусов и связанных сообщений |
| `commmon` | Карточка физлица или ИП из источника |
| `encumbrances` | Обременения, если они найдены |
| `publications` | Публикации по лицу в ЕФРСБ |

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "bankrot_person",
  "intent": "Проверка банкротства физического лица по данным Федресурса",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["innfiz", "method", "country"],
  "returns": ["state", "results.bankrot_person.result.status", "results.bankrot_person.result.data"]
}
```

</details>


