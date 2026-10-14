---
title: "self_employed — проверка статуса самозанятого (НПД) по ИНН"
description: "Метод NEWDB self_employed проверяет статус плательщика налога на профессиональный доход (самозанятого) через официальный сервис ФНС России по 12-значному ИНН."
canonical_url: https://newdb.net/docs/fiz/15-self_employed/
meta:
  - name: keywords
    content: "NEWDB API, self_employed, самозанятый, НПД, налог на профессиональный доход, ФНС, проверка самозанятого, ИНН"
  - property: og:title
    content: "Проверка статуса самозанятого по ИНН — метод self_employed"
  - property: og:description
    content: "Быстрая верификация статуса самозанятого (плательщика НПД) через сервис ФНС России по ИНН физического лица."
---

# self_employed — Проверка статуса самозанятого (НПД)

POST `https://api.newdb.net/v2`

Метод выполняет оперативную проверку статуса физического лица в качестве плательщика налога на профессиональный доход (самозанятого) по данным сервиса Федеральной налоговой службы (ФНС России).

**Рекомендуем также:** статус ИП и выписка ЕГРИП — [egrul_ip](11-egrul_ip.md), налоговая задолженность — [nalog_debt](08-nalog_debt.md), блокировки счетов — [fns_block_person](10-fns_block_person.md).

**Раздел:** [Физические лица](index.md)

## Связанные страницы

- [Обзор раздела физические лица](index.md)
- [egrul_ip — Проверка статуса ИП и выписки ЕГРИП](11-egrul_ip.md)
- [nalog_debt — Налоговая задолженность по ИНН](08-nalog_debt.md)
- [fns_block_person — Блокировка счета физлица (ФНС)](10-fns_block_person.md)
- [fssp_person — Исполнительные производства ФССП](01-fssp_person.md)

## Когда использовать

- Проверка права физического лица на применение специального налогового режима (НПД) перед заключением договора ГПХ
- Ежемесячный аудит действующих самозанятых исполнителей и подрядчиков перед выплатой вознаграждения (ст. 14 Федерального закона № 422-ФЗ)
- Предотвращение налоговых рисков переквалификации договоров и доначисления страховых взносов и НДФЛ
- Автоматизированная проверка статуса в HR-, ERP- и FinTech-системах

## Заголовки

```http
Content-Type: application/json
X-API-KEY: <your_token>
```

## Входная схема (request)

```json
{
  "params": {
    "method": "self_employed",
    "inn": "770200000139",
    "request_date": "2026-09-08"
  },
  "requestId": "00000000-0000-4000-8000-000000000001",
  "webhook": "https://your.host/webhook"
}
```

## Параметры запроса

| Параметр | Тип | Обязательный | Описание / Алиасы |
|---|---|---|---|
| `method` | `string` | **Да** | Имя метода, всегда `self_employed`. |
| `inn` | `string` | **Да** | 12-значный ИНН физического лица. Валидируется по контрольным разрядам. Допустимый алиас: `innfiz`. |
| `request_date` | `string` | Нет | Дата, на которую запрашивается статус (форматы: `YYYY-MM-DD` или `DD.MM.YYYY`). По умолчанию — текущая дата. Будущие даты не допускаются. Алиасы: `requestDate`, `date`. |
| `timeout` | `float` | Нет | Таймаут ожидания ответа поставщика в секундах (от 3 до 60, по умолчанию 20.0). |

## Примеры запросов

### Стандартный запрос по ИНН (на текущую дату)

```http
POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_API_TOKEN

{
  "params": {
    "method": "self_employed",
    "inn": "770200000139"
  },
  "requestId": "00000000-0000-4000-8000-000000000001"
}
```

### Запрос с проверкой статуса на ретроспективную дату

```http
POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_API_TOKEN

{
  "params": {
    "method": "self_employed",
    "inn": "770200000139",
    "request_date": "2026-01-15"
  },
  "requestId": "00000000-0000-4000-8000-000000000002"
}
```

## Пример ответа

### 1. Физическое лицо зарегистрировано как самозанятый (`is_self_employed: true`)

```json
{
  "params": {
    "method": "self_employed",
    "inn": "770200000139",
    "taskId": "task-se-001"
  },
  "requestId": "00000000-0000-4000-8000-000000000001",
  "state": "complete",
  "status": "success",
  "results": {
    "self_employed": {
      "taskId": "task-se-001",
      "dateupdated": "2026-09-08 14:40:00",
      "result": {
        "status": 200,
        "found": true,
        "is_self_employed": true,
        "registry_status": "self_employed",
        "message": "770200000139 является плательщиком налога на профессиональный доход",
        "data": [
          {
            "inn": "770200000139",
            "request_date": "2026-09-08",
            "is_self_employed": true,
            "registry_status": "self_employed",
            "message": "770200000139 является плательщиком налога на профессиональный доход",
            "source": "ФНС России",
            "source_url": "https://statusnpd.nalog.ru/api/v1/tracker/taxpayer_status"
          }
        ],
        "meta": {
          "inn": "770200000139",
          "request_date": "2026-09-08"
        }
      }
    }
  }
}
```

### 2. Физическое лицо не является самозанятым (`is_self_employed: false`)

```json
{
  "results": {
    "self_employed": {
      "result": {
        "status": 200,
        "found": false,
        "is_self_employed": false,
        "registry_status": "not_self_employed",
        "message": "770200000139 не является плательщиком налога на профессиональный доход",
        "data": [
          {
            "inn": "770200000139",
            "request_date": "2026-09-08",
            "is_self_employed": false,
            "registry_status": "not_self_employed",
            "message": "770200000139 не является плательщиком налога на профессиональный доход",
            "source": "ФНС России",
            "source_url": "https://statusnpd.nalog.ru/api/v1/tracker/taxpayer_status"
          }
        ],
        "meta": {
          "inn": "770200000139",
          "request_date": "2026-09-08"
        }
      }
    }
  }
}
```

## Интерпретация полей ответа

- `status` (`integer`): HTTP-код проверки (`200` при успешной верификации, `400` при ошибке валидации ИНН/даты, `500` при недоступности реестра ФНС).
- `found` (`boolean`): признак регистрации в качестве самозанятого (`true` — найден как плательщик НПД, `false` — статус отсутствует).
- `is_self_employed` (`boolean`): явный логический флаг статуса самозанятого.
- `registry_status` (`string`): машиночитаемый статус:
  - `"self_employed"` — лицо является плательщиком налога на профессиональный доход;
  - `"not_self_employed"` — лицо не состоит на учете как плательщик НПД.
- `message` (`string`): официальная формулировка из ответа сервиса ФНС.
- `request_date` (`string`): дата, на которую зафиксирован статус.

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "self_employed",
  "intent": "Проверка статуса самозанятого (НПД) по ИНН в ФНС",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["method", "inn"],
  "optional_fields": ["request_date", "timeout"],
  "returns": [
    "results.self_employed.result.status",
    "results.self_employed.result.is_self_employed",
    "results.self_employed.result.registry_status",
    "results.self_employed.result.message",
    "results.self_employed.result.data"
  ]
}
```

</details>
