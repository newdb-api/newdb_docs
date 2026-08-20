---
title: "bankrot_legal — банкротство юрлица через ЕФРСБ"
description: "Метод NEWDB bankrot_legal ищет сведения о банкротстве юридического лица в Едином федеральном реестре сведений о банкротстве."
canonical_url: https://newdb.net/docs/legal/03-bankrot_legal/
meta:
  - name: keywords
    content: "NEWDB API, bankrot_legal, ЕФРСБ, банкротство, юрлица"
  - property: og:title
    content: "Проверка банкротства юрлица — метод bankrot_legal"
  - property: og:description
    content: "Получите статусы дел и публикации ЕФРСБ по ИНН юридического лица через API NEWDB."
---

# bankrot_legal — Проверка на банкротство юрлица (Федресурс)

POST `https://api.newdb.net/v2`

Метод выполняет проверку юридического лица на наличие сведений о банкротстве в ЕФРСБ. Поиск осуществляется по ИНН компании.

**Раздел:** [Юридические лица](index.md)

## Связанные страницы

- [Обзор раздела юридические лица](index.md)
- [fns_block — Проверка блокировок счетов юрлица (ФНС)](02-fns_block.md)
- [egrul — Сведения ЕГРЮЛ / Прозрачный бизнес](04-egrul.md)
- [arbitr_legal — Проверка арбитражных дел (юрлица, КАД)](01-arbitr_legal.md)

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
    "method": "bankrot_legal"
  },
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
    "inn": "3906988988",
    "country": "ru",
    "method": "bankrot_legal"
  },
  "requestId": "a5962f99-2916-4779-b52d-43c123faa822"
}
```

## Пример ответа

```json
{
  "params": {
    "inn": "3906988988",
    "country": "ru",
    "method": "bankrot_legal"
  },
  "requestId": "a5962f99-2916-4779-b52d-43c123faa822",
  "datecreated": "2026-03-21 23:23:12",
  "state": "complete",
  "balance": 9687,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "bankrot_legal": {
      "result": {
        "status": 200,
        "data": [
          {
            "bankruptcy": [
              {
                "case_number": "А21-11927/2025",
                "case_url": "https://fedresurs.ru/legalcases/7fbe07fa-5a5c-4f1c-92d4-b79e5eaf259c",
                "status": "Конкурсное производство",
                "messages": [
                  {
                    "message_info": "22080695 от 21.03.2026",
                    "url": "https://fedresurs.ru/bankruptmessages/c5b36afc-ede4-45dd-8b37-54f053327255",
                    "type": "Сообщение о судебном акте"
                  },
                  {
                    "message_info": "22010926 от 16.03.2026",
                    "url": "https://fedresurs.ru/bankruptmessages/5081cc01-0016-403d-9dc0-b6c51fad05da",
                    "type": "Сообщение о результатах проведения собрания кредиторов"
                  },
                  {
                    "message_info": "22005113 от 16.03.2026",
                    "url": "https://fedresurs.ru/bankruptmessages/403f7fc0-a72b-4233-b8e7-7cab05bd82e9",
                    "type": "Сообщение о наличии или об отсутствии признаков преднамеренного или фиктивного банкротства"
                  }
                ]
              }
            ],
            "commmon": {
              "type": "company",
              "name_or_fio": "ООО \"УК \"РЕЗУЛЬТАТ\"",
              "inn": "3906988988",
              "reg_number_type": "ОГРН",
              "reg_number": "1163926066303",
              "activity": "Деятельность по управлению финансово-промышленными группами",
              "address": "236006, КАЛИНИНГРАДСКАЯ ОБЛАСТЬ, Г. КАЛИНИНГРАД, УЛ. ЯЛТИНСКАЯ, Д. 134",
              "status": "В отношении юридического лица в деле о несостоятельности (банкротстве) введено наблюдение",
              "details_url": "https://fedresurs.ru/companies/6ba277d4-899f-4ee9-a19f-3e443e2b879a"
            },
            "encumbrances": [],
            "publications": [
              {
                "category": "О лице",
                "number_date": "22080695 от 21.03.2026",
                "title": "Сообщение о судебном акте. о признании должника банкротом и открытии конкурсного производства",
                "url": "https://fedresurs.ru/bankruptmessages/c5b36afc-ede4-45dd-8b37-54f053327255"
              },
              {
                "category": "О лице",
                "number_date": "22010926 от 16.03.2026",
                "title": "Сообщение о результатах проведения собрания кредиторов",
                "url": "https://fedresurs.ru/bankruptmessages/5081cc01-0016-403d-9dc0-b6c51fad05da"
              },
              {
                "category": "О лице",
                "number_date": "22005113 от 16.03.2026",
                "title": "Сообщение о наличии или об отсутствии признаков преднамеренного или фиктивного банкротства",
                "url": "https://fedresurs.ru/bankruptmessages/403f7fc0-a72b-4233-b8e7-7cab05bd82e9"
              }
            ]
          }
        ]
      },
      "taskId": "2232ad0e-5156-4fe8-b610-91c545c2d907",
      "dateupdated": "2026-03-21 23:23:38"
    }
  }
}
```

## Поля результата `results.bankrot_legal.result.data[]`

| Поле | Описание |
|------|----------|
| `bankruptcy` | Список дел о банкротстве |
| `commmon` | Карточка компании из источника |
| `encumbrances` | Обременения, если они найдены |
| `publications` | Публикации по компании в ЕФРСБ |

## Поля `bankruptcy[]`

| Поле | Описание |
|------|----------|
| `case_number` | Номер дела о банкротстве |
| `case_url` | Ссылка на карточку дела или подборку материалов в источнике |
| `status` | Текущая стадия процедуры банкротства по делу |
| `messages` | Список связанных сообщений по конкретному делу |

## Поля `bankruptcy[].messages[]`

| Поле | Описание |
|------|----------|
| `message_info` | Номер и дата сообщения |
| `url` | Ссылка на публикацию в Федресурсе |
| `type` | Тип сообщения |

## Поля `commmon`

| Поле | Описание |
|------|----------|
| `type` | Тип субъекта. Для юрлица обычно `company` |
| `name_or_fio` | Наименование юридического лица |
| `inn` | ИНН компании |
| `reg_number_type` | Тип регистрационного номера, например `ОГРН` |
| `reg_number` | Регистрационный номер компании |
| `activity` | Основной вид деятельности |
| `address` | Адрес компании |
| `status` | Статус компании или формулировка статуса банкротной процедуры |
| `details_url` | Ссылка на карточку компании в Федресурсе |

## Поля `publications[]`

| Поле | Описание |
|------|----------|
| `category` | Категория публикации |
| `number_date` | Номер и дата публикации |
| `title` | Заголовок публикации |
| `url` | Ссылка на публикацию |

## Пример ответа (данные не найдены)

```json
{
  "state": "complete",
  "results": {
    "bankrot_legal": {
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
  "method": "bankrot_legal",
  "intent": "Проверка банкротства юридического лица",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["inn", "method", "country"],
  "returns": ["state", "results.bankrot_legal.result.status", "results.bankrot_legal.result.data"]
}
```

</details>


