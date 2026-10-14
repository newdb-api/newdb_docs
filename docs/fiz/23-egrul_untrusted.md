---
title: "corporate_restrictions_person — Корпоративные ограничения физлица"
description: "Метод egrul_untrusted извлекает метки о недостоверности сведений о физлице (руководитель no_corr_boss, учредитель no_corr_founder), недостоверности адреса, рассчитывает риск 3-летнего запрета на руководство и предстоящего исключения из ЕГРЮЛ."
canonical_url: https://newdb.net/docs/fiz/23-egrul_untrusted/
meta:
  - name: keywords
    content: "NEWDB API, egrul_untrusted, недостоверность ЕГРЮЛ, no_corr_boss, no_corr_founder, no_corr_address, комплаенс, 129-ФЗ, запрет руководства"
  - property: og:title
    content: "Недостоверные сведения ЕГРЮЛ — method egrul_untrusted"
  - property: og:description
    content: "Проверка меток недостоверности сведений в ЕГРЮЛ о руководителе, учредителях и адресе через API NEWDB."
---

# corporate_restrictions_person — Корпоративные ограничения физлица

POST `https://api.newdb.net/v2`

Метод осуществляет глубокую комплаенс-проверку наличия отметок о недостоверности сведений в ЕГРЮЛ в отношении физических лиц (руководителей `no_corr_boss`, учредителей/участников `no_corr_founder`), юридических адресов (`no_corr_address`), а также выявляет решения регистрирующего органа о предстоящем исключении из реестра и риски 3-летнего запрета на создание и руководство новыми юридическими лицами (в соответствии с пп. «ф» п. 1 ст. 23 Федерального закона № 129-ФЗ).

---

**Раздел:** [Физические лица](index.md)

## Связанные страницы

- [Обзор раздела физические лица](index.md)
- [disqual — Реестр дисквалифицированных лиц](19-disqual.md)
- [fns_mass_leaders — Реестр массовых руководителей](17-fns_mass_leaders.md)
- [fns_mass_founders — Реестр массовых учредителей](16-fns_mass_founders.md)
- [court_arbitration — Арбитраж по компаниям физлица](21-court_arbitration.md)

## Когда использовать

- **Критический комплаенс и скоринг физлиц** перед назначением на руководящую должность или выдачей кредита.
- **Проверка контрагентов** на номинальность руководства (отметки по форме Р34001 — отказ физлица от участия).
- **Выявление рисков блокировки счетов и ликвидации компании** налоговым органом (через 6 месяцев после внесения записи о недостоверности ФНС инициирует принудительное исключение из ЕГРЮЛ).

## Заголовки

Content-Type: application/json  
X-API-KEY: `<your_token>`

---

## Входная схема

```json
{
  "params": {
    "inn": "string, optional, ИНН физлица (12 знаков) или юрлица (10 знаков)",
    "fio": "string, optional, ФИО физлица для поиска связей",
    "ogrn": "string, optional, ОГРН организации",
    "country": "ru",
    "method": "corporate_restrictions_person"
  },
  "webhook": "https://your.host/webhook",
  "requestId": "optional-string"
}
```

> [!NOTE]
> В запросе достаточно передать `inn` (10 или 12 цифр), либо `fio`, либо `ogrn`.

---

## Пример запроса

```json
POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_TOKEN

{
  "params": {
    "inn": "7723071768",
    "country": "ru",
    "method": "corporate_restrictions_person"
  },
  "requestId": "00000000-0000-4000-8000-000000000301"
}
```

---

## Пример ответа

Публичный метод `corporate_restrictions_person` возвращает компактный контракт:

```json
{
  "status": 200,
  "found": true,
  "data": [
    {
      "person_restrictions": [
        {
          "type": "ogrfl",
          "description": "Ограничение участия физлица в ЮЛ",
          "details": {"basis": "пп. ф п. 1 ст. 23 129-ФЗ"}
        }
      ],
      "risk_3_year_ban_active": true,
      "evidence_records": [
        {
          "source": "pb.nalog.ru",
          "record_type": "ogrfl",
          "description": "Ограничение участия физлица в ЮЛ",
          "record": {"basis": "пп. ф п. 1 ст. 23 129-ФЗ"}
        }
      ]
    }
  ]
}
```

Расширенный ответ ниже относится к сохранённому legacy-методу `egrul_untrusted`:

```json
{
  "params": {
    "inn": "7723071768",
    "country": "ru",
    "method": "corporate_restrictions_person",
    "newdb_qid": "EL0LILzjmqi4MygC"
  },
  "requestId": "00000000-0000-4000-8000-000000000301",
  "datecreated": "2026-09-15 21:00:00",
  "state": "complete",
  "balance": 9880,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "egrul_untrusted": {
      "result": {
        "status": 200,
        "data": [
          {
            "status": 200,
            "found": true,
            "has_untrusted_records": true,
            "no_corr_boss": true,
            "no_corr_founder": false,
            "no_corr_address": true,
            "risk_level": "CRITICAL",
            "total_companies_checked": 1,
            "untrusted_companies_count": 1,
            "summary": {
              "inn": "7723071768",
              "ogrn": "1117746865037",
              "fio": null,
              "risk_3_year_ban_active": true,
              "compliance_status": "КРИТИЧЕСКИЙ РИСК: обнаружены отметки о недостоверности сведений в ЕГРЮЛ"
            },
            "companies": [
              {
                "inn": "7723071768",
                "ogrn": "1117746865037",
                "name": "ООО АЛЬФА-СЕРВИС",
                "boss_info": "Руководитель юридического лица: Кошкаров Борис Петрович",
                "no_corr_boss": true,
                "no_corr_founder": false,
                "no_corr_address": true,
                "has_untrusted_records": true,
                "decision_upcoming_exclusion": true,
                "decision_date": "2024-05-15",
                "untrusted_records": [
                  {
                    "type": "boss",
                    "type_description": "Недостоверность сведений о руководителе (лице без доверенности)",
                    "person_fio": "Кошкаров Борис Петрович",
                    "grn": "2237701234567",
                    "entry_date": "2023-11-10",
                    "basis": "Заявление физического лица о недостоверности сведений о нем (форма № Р34001)",
                    "days_active": 309,
                    "deadline_6_months": "2024-05-10",
                    "days_until_liquidation": -127,
                    "is_overdue_6_months": true,
                    "risk_3_year_ban": true
                  },
                  {
                    "type": "address",
                    "type_description": "Недостоверность сведений об адресе места нахождения",
                    "basis": "Результаты проверки достоверности сведений регистрирующим органом"
                  }
                ]
              }
            ],
            "person_restrictions": []
          }
        ]
      },
      "taskId": "00000000-0000-4000-8000-000000000302",
      "dateupdated": "2026-09-15 21:00:08"
    }
  }
}
```

---

## Структура полей ответа

Для `corporate_restrictions_person` публичны только:

- `person_restrictions[]` — найденные запреты и ограничения участия/руководства;
- `risk_3_year_ban_active` — активен ли риск трёхлетнего запрета;
- `evidence_records[]` — подтверждающие записи ФНС/ЕГРЮЛ с источником и исходными реквизитами.

Следующие поля возвращаются только расширенным методом `egrul_untrusted`:

- `has_untrusted_records` (boolean) — флаг наличия хотя бы одной записи о недостоверности сведений в ЕГРЮЛ.
- `no_corr_boss` (boolean) — запись о недостоверности сведений о руководителе организации (генеральном директоре / лице с правом действовать без доверенности).
- `no_corr_founder` (boolean) — запись о недостоверности сведений об учредителе (участнике) организации.
- `no_corr_address` (boolean) — запись о недостоверности юридического адреса компании.
- `risk_level`:
  - `CRITICAL` — недостоверность сведений о руководителе или учредителе, либо наличие ограничения участия по пп. «ф» п. 1 ст. 23 129-ФЗ (влечет дисквалификацию и 3-летний запрет).
  - `HIGH` — недостоверность адреса или наличие решения налогового органа о предстоящем исключении из ЕГРЮЛ.
  - `NONE` — недостоверных отметок не обнаружено, комплаенс-статус чистый.
- `untrusted_records[]`:
  - `type` — категория метки (`boss`, `founder`, `address`).
  - `grn` — государственный регистрационный номер записи в ЕГРЮЛ.
  - `entry_date` — дата внесения записи о недостоверности.
  - `basis` — основание внесения: заявление физлица по форме Р34001, результаты контрольных мероприятий ФНС или судебный акт.
  - `days_active` — количество дней с момента внесения записи.
  - `deadline_6_months` — дата истечения 6-месячного срока (после которого ФНС начинает принудительную ликвидацию).
  - `is_overdue_6_months` — превысил ли срок 6 месяцев.
  - `risk_3_year_ban` — признак наступления 3-летнего запрета на руководство и владение бизнесом.
- `person_restrictions[]` — ограничения участия из реестров Прозрачного бизнеса (`ogrfl`, `upr`, `uchr`, `rdl`).

## Статусы

- `200` — проверка успешно выполнена.
- `400` — не переданы поисковые параметры (`inn`, `fio`, `ogrn`).
- `500` — временный сбой внешнего источника.
