---
title: "contracts_person — Контракты физлица и ИП в госзакупках (44-ФЗ / 223-ФЗ)"
description: "Метод contracts_person находит государственные и муниципальные контракты физического лица и индивидуального предпринимателя по 44-ФЗ и 223-ФЗ на портале ЕИС Закупки (zakupki.gov.ru) по ИНН."
canonical_url: https://newdb.net/docs/fiz/28-contracts_person/
meta:
  - name: keywords
    content: "NEWDB API, contracts_person, госзакупки ИП, 44-ФЗ, 223-ФЗ, ЕИС Закупки, zakupki.gov.ru, контракты физлица, тендеры ИП"
  - property: og:title
    content: "Контракты физлица и ИП в госзакупках — method contracts_person"
  - property: og:description
    content: "Поиск государственных и муниципальных контрактов ИП и физических лиц через API NEWDB."
---

# contracts_person — Контракты физлиц и ИП в госзакупках (44-ФЗ / 223-ФЗ)

POST `https://api.newdb.net/v2`

Метод осуществляет поиск и сбор данных по заключенным, исполняемым и завершенным государственным и муниципальным контрактам физического лица или индивидуального предпринимателя на портале **ЕИС Закупки** ([zakupki.gov.ru](https://zakupki.gov.ru)).

---

**Раздел:** [Физические лица](index.md)

> [!IMPORTANT]
> Метод принимает **12-значный ИНН** физического лица или индивидуального предпринимателя (`innfiz` или `inn`).
> 
> Метод автоматически участвует в комплексных проверках физических лиц ([complex_by_passport](04-complex_by_passport.md), `complex_by_innfiz`) и формирует блок №30 (`zakupki`) в отчетах формата «ЗаЧестныйБизнес».

## Связанные страницы

- [Обзор раздела физические лица](index.md)
- [contracts — Контракты юридических лиц в госзакупках](../legal/13-contracts.md)
- [egrul_ip — Проверка статуса ИП в ЕГРИП](11-egrul_ip.md)
- [self_employed — Статус самозанятого (НПД)](15-self_employed.md)
- [rnp — Реестр недобросовестных поставщиков](../legal/10-rnp.md)
- [Совместимость с ЗаЧестныйБизнес](../compatibility-zachestnyibiznes.md)

## Когда использовать

- **Проверка коммерческой деятельности ИП**: подтверждение реального опыта выполнения государственных и муниципальных контрактов.
- **Оценка финансовых оборотов**: суммарный объем контрактов, крупнейшие заказчики, успешность сдачи работ.
- **Формирование 39-блочного досье физлица**: заполнение блока `zakupki` (sourceCode: 30) в отчетах flcheck.

## Заголовки

Content-Type: application/json  
X-API-KEY: `<your_token>`

---

## Входная схема

```json
{
  "method": "contracts_person",
  "innfiz": "771234567890",
  "max_pages": 1
}
```

### Описание параметров

| Параметр | Тип | Обязательный | Описание |
| :--- | :--- | :--- | :--- |
| `method` | string | Да | Всегда `"contracts_person"` |
| `innfiz` / `inn` | string | Да | ИНН физического лица или ИП (12 цифр) |
| `max_pages` | integer | Нет | Максимальное число страниц поисковой выдачи для обхода. По умолчанию `1` |
| `download_documents` | boolean | Нет | Флаг скачивания прикрепленных документов к контракту |

---

## Пример ответа

```json
{
  "status": 200,
  "data": {
    "supplier_inn": "771234567890",
    "contracts_total": 2,
    "contracts_sum": 1500000.0,
    "completed": 2,
    "active": 0,
    "penalties_total": 0.0,
    "rnp_status": "Не состоит в РНП",
    "contracts": [
      {
        "registry_number": "3770123456725000088",
        "law": "44-ФЗ",
        "customer": "ГБУ ЖИЛИЩНИК",
        "subject": "Оказание услуг по техническому обслуживанию",
        "price": 1500000.0,
        "status": "Исполнен",
        "sign_date": "2024-05-10",
        "url": "https://zakupki.gov.ru/epz/contract/contractCard/common-info.html?reestrNumber=3770123456725000088"
      }
    ]
  },
  "ai_interpretation": {
    "status": "success",
    "risk_level": "low",
    "summary": "Найдены контракты по 44-ФЗ в качестве ИП/поставщика. Нарушений и включения в РНП не зафиксировано.",
    "confidence": 0.98
  }
}
```

---

## Формат ЗаЧестныйБизнес (`format=zb`)

```json
{
  "status": "200",
  "message": "OK",
  "body": {
    "aggr": {
      "customer_sum": 0.0,
      "participant_sum": 1500000.0
    },
    "customer": [],
    "participant": [
      {
        "registry_number": "3770123456725000088",
        "law": "44-ФЗ",
        "customer": "ГБУ ЖИЛИЩНИК",
        "subject": "Оказание услуг по техническому обслуживанию",
        "price": 1500000.0,
        "status": "Исполнен",
        "sign_date": "2024-05-10",
        "url": "https://zakupki.gov.ru/epz/contract/contractCard/common-info.html?reestrNumber=3770123456725000088"
      }
    ]
  }
}
```
