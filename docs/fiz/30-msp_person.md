---
title: "msp_person — физлицо в реестре получателей поддержки МСП"
description: "Метод NEWDB msp_person (msp_fio) проверяет сведения о получении государственной поддержки субъектами МСП и самозанятыми по ФИО и ИНН физлица."
canonical_url: https://newdb.net/docs/fiz/30-msp_person/
meta:
  - name: keywords
    content: "NEWDB API, msp_person, msp_fio, реестр МСП, поддержка МСП, ФНС, субсидии, гранты, самозанятые, нарушения МСП"
  - property: og:title
    content: "Реестр поддержки МСП физлиц — метод msp_person"
  - property: og:description
    content: "Проверка физлица, ИП и самозанятых в Едином реестре субъектов МСП — получателей поддержки через API NEWDB."
---

# msp_person — Проверка физлица в реестре получателей поддержки МСП (ФНС)

POST `https://api.newdb.net/v2`

Метод выполняет поиск физического лица (индивидуального предпринимателя, самозанятого гражданина, руководителя или участника юридического лица) в **Едином реестре субъектов малого и среднего предпринимательства — получателей поддержки** (реестр ФНС России).

Метод возвращает:
- категорию субъекта МСП (`msp_category`: микропредприятие, малое или среднее предприятие);
- количество фактов оказания мер поддержки (`support_count`);
- общую сумму полученной финансовой поддержки (`total_support_amount`);
- детализацию мер поддержки (`supports`: субсидии, льготные кредиты, гранты, гарантии, консультации, обучающие программы);
- сведения о нарушениях порядка и условий предоставления поддержки (`has_violations`, `violations_count`, `has_unresolved_violations`).

> **Обратите внимание:** В системном реестре задач и внутри комплексных проверок ([`complex_by_passport`](04-complex_by_passport.md) и `complex_by_innfiz`) метод доступен также под именем `msp_fio`. Оба названия поддерживаются API.

**Раздел:** [Физические лица](index.md)

## Связанные страницы

- [Обзор раздела физические лица](index.md)
- [complex_by_passport — Комплексная проверка по паспорту](04-complex_by_passport.md)
- [egrul_ip — Проверка статуса ИП / сведений ЕГРИП](11-egrul_ip.md)
- [corporate_restrictions_person — Корпоративные запреты и недостоверность ЕГРЮЛ](23-egrul_untrusted.md)
- [fns_block_person — Проверка блокировок счетов физлица (ФНС)](10-fns_block_person.md)

## Когда использовать

- При анализе деловой репутации и масштаба бизнеса предпринимателя, руководителя или соискателя.
- При андеррайтинге кредитных заявок и лизинговых сделок для подтверждения государственной поддержки.
- Для выявления нарушений условий предоставления господдержки (факты нецелевого использования бюджетных средств или нарушения отчетности).
- Для подтверждения статуса самозанятого или плательщика налога на профессиональный доход, получающего господдержку.

## Заголовки

```text
Content-Type: application/json
X-API-KEY: <your_token>
```

## Входная схема (request)

```json
{
  "params": {
    "lastname": "string (Фамилия)",
    "firstname": "string (Имя)",
    "secondname": "string (Отчество, опционально)",
    "fio": "string (Полное ФИО, опционально)",
    "innfiz": "string (ИНН физлица, опционально)",
    "country": "string (ru)",
    "method": "msp_person"
  },
  "webhook": "https://your.host/whook",
  "requestId": "optional-string"
}
```

### Параметры запроса

| Параметр | Тип | Обязательный | Описание |
| :--- | :--- | :--- | :--- |
| `lastname` | string | Да* | Фамилия проверяемого лица. |
| `firstname` | string | Да* | Имя проверяемого лица. |
| `secondname` | string | Нет | Отчество. |
| `fio` | string | Нет | Полное ФИО (может использоваться в качестве дополнения или альтернативы). |
| `innfiz` / `inn` | string | Нет | ИНН физического лица. Уточняет поиск при наличии совпадений по ФИО. |
| `country` | string | Да | Код страны: `ru`. |
| `method` | string | Да | `msp_person` (или `msp_fio`). |

---

## Пример запроса

```http
POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_TOKEN

{
  "params": {
    "lastname": "Иванов",
    "firstname": "Иван",
    "secondname": "Иванович",
    "country": "ru",
    "method": "msp_person"
  },
  "requestId": "b2c3d4e5-f6a7-8901-bcde-fa2345678901"
}
```

---

## Пример ответа (запись найдена)

```json
{
  "params": {
    "lastname": "Иванов",
    "firstname": "Иван",
    "secondname": "Иванович",
    "country": "ru",
    "method": "msp_person"
  },
  "requestId": "b2c3d4e5-f6a7-8901-bcde-fa2345678901",
  "datecreated": "2026-10-27 12:00:00",
  "state": "complete",
  "balance": 9980,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "msp_person": {
      "taskId": "c3d4e5f6-a7b8-9012-cdef-ab3456789012",
      "dateupdated": "2026-10-27 12:00:03",
      "result": {
        "status": 200,
        "found": true,
        "data": [
          {
            "status": 200,
            "inn": "770123456789",
            "entity_type": "ИП",
            "ogrn": "319774600000000",
            "name": "ИП ИВАНОВ ИВАН ИВАНОВИЧ",
            "fio": "ИВАНОВ ИВАН ИВАНОВИЧ",
            "last_name": "ИВАНОВ",
            "first_name": "ИВАН",
            "middle_name": "ИВАНОВИЧ",
            "msp_category": "Микропредприятие",
            "msp_category_code": 1,
            "support_count": 2,
            "total_support_amount": 350000.0,
            "has_violations": false,
            "violations_count": 0,
            "has_unresolved_violations": false,
            "last_support_date": "2025-11-15",
            "supports": [
              {
                "support_form": "Финансовая поддержка",
                "support_type": "Предоставление субсидии",
                "amount": 250000.0,
                "decision_date": "2025-05-20",
                "provider_name": "Департамент предпринимательства и инновационного развития города Москвы"
              },
              {
                "support_form": "Консультационная поддержка",
                "support_type": "Консультационные услуги",
                "amount": 100000.0,
                "decision_date": "2025-11-15",
                "provider_name": "ГБУ Малый бизнес Москвы"
              }
            ],
            "source_file": "data-20261001.xml",
            "source_date": "2026-10-01"
          }
        ]
      }
    }
  }
}
```

---

## Пример ответа (записей не найдено)

```json
{
  "params": {
    "lastname": "Иванов",
    "firstname": "Иван",
    "country": "ru",
    "method": "msp_person"
  },
  "requestId": "b2c3d4e5-f6a7-8901-bcde-fa2345678901",
  "state": "complete",
  "results": {
    "msp_person": {
      "result": {
        "status": 200,
        "found": false,
        "data": [
          {
            "status": 200,
            "found": false,
            "is_msp_support_recipient": false,
            "support_count": 0,
            "fio": "ИВАНОВ ИВАН",
            "message": "В едином реестре субъектов МСП – получателей поддержки ФНС не найден"
          }
        ]
      }
    }
  }
}
```

## Ключевые поля результата

- `found` (`boolean`): признак нахождения лица в реестре.
- `msp_category` (`string`): категория субъекта (Микропредприятие, Малое предприятие, Среднее предприятие).
- `support_count` (`integer`): суммарное число предоставленных мер поддержки.
- `total_support_amount` (`number`): совокупный объем финансовой господдержки в рублях.
- `has_violations` (`boolean`): признак зафиксированных нарушений порядка и условий оказания поддержки.
- `has_unresolved_violations` (`boolean`): признак неустраненных нарушений.
- `supports[]`: перечень мер поддержки с указанием формы, органа/организации-провайдера, даты решения и суммы.

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "msp_person",
  "aliases": ["msp_fio"],
  "intent": "Поиск физического лица, ИП или самозанятого в Едином реестре субъектов МСП — получателей поддержки ФНС",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["country", "method", "lastname", "firstname"],
  "optional_fields": ["secondname", "fio", "innfiz", "inn"],
  "returns": [
    "state",
    "results.msp_person.result.status",
    "results.msp_person.result.found",
    "results.msp_person.result.data.support_count",
    "results.msp_person.result.data.total_support_amount",
    "results.msp_person.result.data.has_violations"
  ]
}
```

</details>
