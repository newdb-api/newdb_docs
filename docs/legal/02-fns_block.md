---
title: "fns_block — блокировки счетов юрлица (ФНС)"
description: "Метод NEWDB fns_block проверяет решения ФНС о приостановлении операций по счетам юридического лица по ИНН."
canonical_url: https://newdb.net/docs/legal/02-fns_block/
meta:
  - name: keywords
    content: "NEWDB API, fns_block, ФНС, блокировка счетов, приостановление операций, юрлица"
  - property: og:title
    content: "Блокировки счетов юрлица — метод fns_block"
  - property: og:description
    content: "Проверка решений ФНС о приостановлении операций по счетам по ИНН юридического лица через API NEWDB."
---

# fns_block — Проверка блокировок счетов юрлица (ФНС)

POST `https://api.newdb.net/v2`

Метод возвращает сведения о решениях ФНС по приостановлению операций по банковским счетам юридического лица (блокировки счетов) по ИНН.

**Раздел:** [Юридические лица](index.md)

## Связанные страницы

- [Обзор раздела юридические лица](index.md)
- [arbitr_legal — Проверка арбитражных дел (юрлица, КАД)](01-arbitr_legal.md)
- [bankrot_legal — Проверка на банкротство юрлица (Федресурс)](03-bankrot_legal.md)
- [egrul — Сведения ЕГРЮЛ / Прозрачный бизнес](04-egrul.md)

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
    "method": "fns_block"
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
    "method": "fns_block"
  },
  "webhook": "https://newer.net/whook",
  "requestId": "81863f18-2326-4779-b59d-45c011faa898"
}
```

## Пример ответа

```json
{
  "params": {
    "inn": "1326200720",
    "country": "ru",
    "method": "fns_block",
    "newdb_qid": "EKoiIMCdvITJMygD"
  },
  "webhook": "https://newer.net/whook",
  "requestId": "81863f18-2326-4779-b59d-45c011faa898",
  "datecreated": "2026-02-24 19:50:17",
  "state": "complete",
  "balance": 9776,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "fns_block": {
      "taskId": "733fc952-80f4-4c64-8574-2d05537f6755",
      "dateupdated": "2026-02-24 19:50:42",
      "result": {
        "status": 200,
        "data": [
          {
            "DATASTART": "03.03.2022",
            "NOMER": "990",
            "DATA": "03.03.2022",
            "KODOSNOV": "02",
            "SALDO": "(Отсутствует значение)",
            "IFNS": "1326",
            "BIK": "048952615",
            "DATABI": "06.03.2022 04:06:09"
          },
          {
            "DATASTART": "01.07.2022",
            "NOMER": "786",
            "DATA": "01.07.2022",
            "KODOSNOV": "02",
            "SALDO": "(Отсутствует значение)",
            "IFNS": "1300",
            "BIK": "048952615",
            "DATABI": "06.07.2022 21:45:00"
          },
          {
            "DATASTART": "19.06.2023",
            "NOMER": "1001",
            "DATA": "19.06.2023",
            "KODOSNOV": "02",
            "SALDO": "(Отсутствует значение)",
            "IFNS": "1300",
            "BIK": "048952615",
            "DATABI": "19.06.2023 15:05:07"
          },
          {
            "DATASTART": "03.03.2022",
            "NOMER": "989",
            "DATA": "03.03.2022",
            "KODOSNOV": "02",
            "SALDO": "(Отсутствует значение)",
            "IFNS": "1326",
            "BIK": "048952752",
            "DATABI": "05.03.2022 09:45:13"
          },
          {
            "DATASTART": "01.07.2022",
            "NOMER": "785",
            "DATA": "01.07.2022",
            "KODOSNOV": "02",
            "SALDO": "(Отсутствует значение)",
            "IFNS": "1300",
            "BIK": "048952752",
            "DATABI": "06.07.2022 21:45:00"
          }
        ],
        "query": {
          "inn": "1326200720",
          "bik": "442455546"
        }
      }
    }
  }
}
```

## Поля результата `results.fns_block.result.data[]`

| Поле        | Описание |
|-------------|----------|
| `DATASTART` | Дата начала действия решения о приостановлении операций |
| `NOMER`     | Номер решения |
| `DATA`      | Дата решения |
| `KODOSNOV`  | Код основания (как в выгрузке источника) |
| `SALDO`     | Остаток/сальдо (может отсутствовать) |
| `IFNS`      | Код налогового органа (ИФНС) |
| `BIK`       | БИК банка, по которому опубликована запись |
| `DATABI`    | Дата и время публикации/обновления записи в источнике |

## Пример ответа (данные не найдены)

```json
{
  "state": "complete",
  "results": {
    "fns_block": {
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
  "method": "fns_block",
  "intent": "Проверка блокировки счета юридического лица по ФНС",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["inn", "method", "country"],
  "returns": ["state", "results.fns_block.result.status", "results.fns_block.result.data"]
}
```

</details>


