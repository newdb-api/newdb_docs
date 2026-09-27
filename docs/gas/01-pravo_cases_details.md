---
title: "pravo_cases_details — детали судебного дела по case_id"
description: "Метод NEWDB pravo_cases_details возвращает карточку судебного дела, события, поля, участников и документы по case_id."
canonical_url: https://newdb.net/docs/gas/01-pravo_cases_details/
meta:
  - name: keywords
    content: "NEWDB API, pravo_cases_details, детали дела, case_id, ГАС Правосудие, суд"
  - property: og:title
    content: "Детали судебного дела по case_id — метод pravo_cases_details"
  - property: og:description
    content: "Получите карточку дела, события, участников, поля и ссылки на документы по case_id через API NEWDB."
---

# pravo_cases_details — Получение деталей дела по case_id

POST `https://api.newdb.net/v2`

Метод возвращает расширенную карточку судебного дела по идентификатору `case_id`. Обычно используется после поиска дел, когда нужно получить полную структуру конкретного дела: сведения из карточки, хронологию событий, дополнительные поля, участников процесса и ссылки на документы.

---

**Раздел:** [ГАС Правосудие](index.md)

## Связанные страницы

- [Обзор раздела ГАС Правосудие](index.md)
- [arbitr_person — Проверка арбитражных дел (физлица, КАД)](../fiz/07-arbitr_person.md)
- [arbitr_legal — Проверка арбитражных дел (юрлица, КАД)](../legal/01-arbitr_legal.md)

## Когда использовать

Используйте метод, когда по ранее найденному делу нужно получить детальную карточку и полную структуру данных для отображения, анализа или сохранения во внутреннюю систему.

## Типовые кейсы

- Дозагрузка полной информации по делу после поиска
- Отображение карточки дела в CRM, KYC или antifraud-интерфейсе
- Сохранение хронологии дела, участников и документов во внутренней БД

## Заголовки

Content-Type: application/json
X-API-KEY: <your_token>

---

## Входная схема (request)

```json
{
  "params": {
    "case_id": "string | number",
    "country": "ru",
    "method": "pravo_cases_details"
  },
  "requestId": "optional-string"
}
```

## Параметры `params`

| Поле | Обязательное | Описание |
|------|--------------|----------|
| `case_id` | Да | Внутренний идентификатор дела NEWDB, полученный из результата поиска |
| `country` | Да | Код страны. Для метода используется `ru` |
| `method` | Да | Название метода: `pravo_cases_details` |

---

## Пример запроса

```json
POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_TOKEN

{
  "params": {
    "case_id": "11051155",
    "country": "ru",
    "method": "pravo_cases_details"
  },
  "requestId": "a5972f88-2926-4179-b69d-43c123faa912"
}
```

---

## Пример ответа

```json
{
  "params": {
    "case_id": "11051155",
    "country": "ru",
    "method": "pravo_cases_details"
  },
  "requestId": "a5972f88-2926-4179-b69d-43c123faa912",
  "datecreated": "2026-04-16 22:42:00",
  "state": "complete",
  "balance": 9577,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "pravo_cases_details": {
      "taskId": "9e46bcc1-31ac-4181-8c03-85ebe69e3321",
      "dateupdated": "2026-04-16 22:42:04",
      "result": {
        "status": 200,
        "data": [
          {
            "case": {
              "case_id": 11051155,
              "row_num": "16.",
              "case_url": "http://zhigulevsky.sam.sudrf.ru/modules.php?name=sud_delo&srv_num=1&name_op=case&case_id=115225941&case_uid=6ae69d13-bd99-4771-bc03-70dbde712a96&delo_id=1540005&new=",
              "case_info": "КАТЕГОРИЯ: Споры, связанные с имущественными правами → Иски о взыскании сумм по договору займа, кредитному договоруИСТЕЦ(ЗАЯВИТЕЛЬ): ООО ПКО \"Региональная служба взыскания\"ОТВЕТЧИК: Антосенко Александр Иванович",
              "court_url": "http://zhigulevsky.sam.sudrf.ru",
              "loaded_at": "2026-04-13T11:14:23.193164+00:00",
              "judge_name": "Семенова Н.Ю.",
              "updated_at": "2026-04-13T11:14:23.193164+00:00",
              "case_header": "Гражданские дела - первая инстанция",
              "case_number": "2-1435/2025",
              "region_code": "63",
              "region_name": "Самарская область",
              "result_text": "Вынесено решение по делу",
              "review_date": "2025-08-13",
              "source_json": {},
              "hearing_date": "2025-08-13",
              "hearing_time": "12:00:00",
              "publish_info": "опубликовано 18.07.2025 14:07, изменено 22.09.2025 19:08",
              "section_name": "Гражданские дела - первая инстанция",
              "category_text": "Споры, связанные с имущественными правами → Иски о взыскании сумм по договору займа, кредитному договору",
              "hearing_place": "13",
              "received_date": "2025-07-18",
              "list_item_acts": null,
              "unique_case_id": "63RS0029-02-2025-002581-08",
              "proceeding_sign": "Рассмотрено единолично судьей",
              "delo_case_number": "ДЕЛО № 2-1435/2025",
              "modified_at_text": "22.09.2025 19:08",
              "source_case_hash": "4aa26c3debe4c01a8c3e11487576847c9072edae19f31bdc4bbf5c44ee5f6f16",
              "published_at_text": "18.07.2025 14:07",
              "last_seen_batch_id": null,
              "first_seen_batch_id": null
            },
            "events": [
              {
                "case_id": 11051155,
                "event_id": 115814538,
                "event_ts": null,
                "loaded_at": "2026-04-13T11:14:23.193164+00:00",
                "event_date": "2025-07-18",
                "event_name": "Регистрация иска (заявления, жалобы) в суде и принятие его к производству",
                "event_note": null,
                "event_time": "11:54:00",
                "updated_at": "2026-04-13T11:14:23.193164+00:00",
                "event_basis": null,
                "event_place": null,
                "event_result": null,
                "publish_date": "2025-07-18",
                "source_row_json": {}
              },
              {
                "case_id": 11051155,
                "event_id": 115814541,
                "event_ts": null,
                "loaded_at": "2026-04-13T11:14:23.193164+00:00",
                "event_date": "2025-08-13",
                "event_name": "Судебное заседание",
                "event_note": null,
                "event_time": "12:00:00",
                "updated_at": "2026-04-13T11:14:23.193164+00:00",
                "event_basis": "ОТКАЗАНО в удовлетворении иска (заявлении, жалобы)",
                "event_place": "13",
                "event_result": "Вынесено решение по делу",
                "publish_date": "2025-07-20",
                "source_row_json": {}
              }
            ],
            "fields": [
              {
                "case_id": 11051155,
                "field_id": 74754054,
                "loaded_at": "2026-04-13T11:14:23.193164+00:00",
                "field_name": "Признак рассмотрения дела",
                "field_value": "Рассмотрено единолично судьей"
              },
              {
                "case_id": 11051155,
                "field_id": 74757467,
                "loaded_at": "2026-04-13T11:14:23.193164+00:00",
                "field_name": "Результат рассмотрения",
                "field_value": "ОТКАЗАНО в удовлетворении иска (заявлении, жалобы)"
              }
            ],
            "parties": [
              {
                "inn": null,
                "kpp": null,
                "ogrn": null,
                "ogrnip": null,
                "case_id": 11051155,
                "party_id": 24870760,
                "loaded_at": "2026-04-13T11:14:23.193164+00:00",
                "role_code": "defendant",
                "role_text": "ОТВЕТЧИК",
                "party_name": "Антосенко Александр Иванович",
                "updated_at": "2026-04-13T11:14:23.193164+00:00",
                "source_row_json": {}
              },
              {
                "inn": "7707782563",
                "kpp": "770701001",
                "ogrn": "1127746618768",
                "ogrnip": null,
                "case_id": 11051155,
                "party_id": 24870762,
                "loaded_at": "2026-04-13T11:14:23.193164+00:00",
                "role_code": "plaintiff",
                "role_text": "ИСТЕЦ",
                "party_name": "ООО ПКО \"Региональная служба взыскания\"",
                "updated_at": "2026-04-13T11:14:23.193164+00:00",
                "source_row_json": {}
              }
            ],
            "documents": [
              {
                "case_id": 11051155,
                "doc_url": "http://zhigulevsky.sam.sudrf.ru/modules.php?name=sud_delo&name_op=doc&number=123524383&delo_id=1540005&new=&text_number=1&srv_num=1",
                "doc_type": null,
                "loaded_at": "2026-04-13T11:14:23.193164+00:00",
                "updated_at": "2026-04-13T11:14:23.193164+00:00",
                "document_id": 5927035
              }
            ]
          }
        ],
        "meta": {
          "case_ids": [11051155],
          "count": 1
        }
      }
    }
  }
}
```

---

## Что есть в ответе

Каждый объект в `results.pravo_cases_details.result.data[]` состоит из пяти основных блоков:

| Блок | Описание |
|------|----------|
| `case` | Основная карточка дела: номер, категория, суд, судья, даты, статус, ссылки |
| `events` | Хронология движения дела и судебных событий |
| `fields` | Дополнительные атрибуты дела в формате `имя -> значение` |
| `parties` | Участники процесса с ролями и, если доступны, реквизитами |
| `documents` | Ссылки на прикрепленные документы по делу |

## Поля блока `case`

| Поле | Описание |
|------|----------|
| `case_id` | Идентификатор дела в NEWDB |
| `case_number` | Номер дела |
| `delo_case_number` | Номер дела в формате карточки источника |
| `unique_case_id` | Уникальный идентификатор дела |
| `case_header` | Заголовок или тип раздела дела |
| `section_name` | Раздел судопроизводства |
| `category_text` | Категория дела |
| `case_info` | Краткая сводка по делу, категории и сторонам |
| `judge_name` | Судья |
| `court_url` | Ссылка на сайт суда |
| `case_url` | Ссылка на карточку дела в источнике |
| `region_code` | Код региона |
| `region_name` | Название региона |
| `received_date` | Дата поступления дела |
| `review_date` | Дата рассмотрения |
| `hearing_date` | Дата заседания |
| `hearing_time` | Время заседания |
| `hearing_place` | Номер зала, кабинета или иное место заседания |
| `result_text` | Итоговый статус по делу |
| `proceeding_sign` | Признак рассмотрения дела |
| `publish_info` | Информация о публикации и изменении карточки |
| `published_at_text` | Дата и время публикации |
| `modified_at_text` | Дата и время последнего изменения |
| `loaded_at` | Когда запись была загружена в NEWDB |
| `updated_at` | Когда запись была обновлена в NEWDB |

## Поля блока `events[]`

| Поле | Описание |
|------|----------|
| `event_id` | Идентификатор события |
| `event_date` | Дата события |
| `event_time` | Время события |
| `event_name` | Тип события |
| `event_note` | Дополнительная заметка по событию |
| `event_basis` | Основание или суть результата по событию |
| `event_place` | Место проведения события |
| `event_result` | Результат события |
| `publish_date` | Дата публикации события в источнике |
| `event_ts` | Временная метка события, если доступна |

## Поля блока `fields[]`

| Поле | Описание |
|------|----------|
| `field_id` | Идентификатор поля |
| `field_name` | Название поля из карточки дела |
| `field_value` | Значение поля |
| `loaded_at` | Когда поле было загружено в NEWDB |

Через `fields[]` часто передаются такие сведения, как:

- дата поступления дела
- дата рассмотрения
- судья
- результат рассмотрения
- категория дела
- уникальный идентификатор дела

## Поля блока `parties[]`

| Поле | Описание |
|------|----------|
| `party_id` | Идентификатор участника |
| `role_code` | Технический код роли: например `plaintiff`, `defendant`, `other` |
| `role_text` | Текстовая роль участника |
| `party_name` | Наименование организации или ФИО участника |
| `inn` | ИНН, если доступен |
| `kpp` | КПП, если доступен |
| `ogrn` | ОГРН, если доступен |
| `ogrnip` | ОГРНИП, если доступен |
| `loaded_at` | Когда участник был загружен в NEWDB |
| `updated_at` | Когда участник был обновлён в NEWDB |

## Поля блока `documents[]`

| Поле | Описание |
|------|----------|
| `document_id` | Идентификатор документа |
| `doc_url` | Прямая ссылка на документ |
| `doc_type` | Тип документа, если он определён |
| `loaded_at` | Когда документ был загружен в NEWDB |
| `updated_at` | Когда документ был обновлён в NEWDB |

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "pravo_cases_details",
  "intent": "Получение детальной карточки судебного дела по case_id",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["case_id", "country", "method"],
  "returns": [
    "state",
    "results.pravo_cases_details.taskId",
    "results.pravo_cases_details.result.status",
    "results.pravo_cases_details.result.data",
    "results.pravo_cases_details.result.meta"
  ]
}
```

</details>
