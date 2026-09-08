---
title: "complex_by_passport — комплексная проверка по паспорту"
description: "Метод NEWDB complex_by_passport объединяет проверки МВД, ФНС и ФССП для полного анализа физлица по данным паспорта."
canonical_url: https://newdb.net/docs/fiz/04-complex_by_passport/
meta:
  - name: keywords
    content: "NEWDB API, complex_by_passport, композитная проверка, ФНС, МВД, ФССП"
  - property: og:title
    content: "Комплексная проверка по паспорту — метод complex_by_passport"
  - property: og:description
    content: "Единый API запрос, объединяющий проверки паспорта, ИНН и исполнительных производств."
---

# complex_by_passport — Комплексная проверка по данным паспорта

POST `https://api.newdb.net/v2`

Метод выполняет комплексную сквозную проверку физического лица по паспортным данным гражданина РФ (серия, номер, ФИО, дата рождения). 
В рамках одного запроса автоматически оркестрируются до 16 специализированных государственных и публичных проверок:

1. **Действительность паспорта РФ** ([`passport_mvd`](03-passport_mvd.md)) — проверка по учетам МВД РФ на действительность, истечение срока действия или нахождение среди утраченных/недействительных бланков.
2. **Поиск ИНН по паспорту** ([`passport_fns`](02-passport_fns.md)) — установление идентификационного номера налогоплательщика в ФНС России (необходим для дальнейших налоговых проверок).
3. **Исполнительные производства ФССП** ([`fssp_person`](01-fssp_person.md)) — открытые производства, судебные взыскания, задолженности, запреты на выезд из РФ.
4. **Банкротство физлиц (Федресурс)** ([`bankrot_person`](05-fedresurs_bankrot.md)) — сообщения о реструктуризации долгов, реализации имущества, завершении или прекращении процедуры банкротства в ЕФРСБ.
5. **Арбитражные дела** ([`arbitr_person`](07-arbitr_person.md)) — участие гражданина в судебных спорах по Картотеке арбитражных дел (КАД Арбитр).
6. **Суды общей юрисдикции** ([`pravo_search`](../gas/02-pravo_search.md)) — поиск гражданских, административных и уголовных дел в федеральных судах и мировых судьях через ГАС «Правосудие».
7. **Блокировки счетов ФНС** ([`fns_block_person`](10-fns_block_person.md)) — действующие решения налоговых органов о приостановлении операций по банковским счетам налогоплательщика.
8. **Перечень террористов и экстремистов** ([`terrorist`](12-terrorist.md)) — нахождение в официальном реестре Росфинмониторинга (115-ФЗ).
9. **Федеральный розыск МВД** ([`mvd_wanted`](13-mvd_wanted.md)) — проверка по базе лиц, объявленных в розыск правоохранительными органами РФ.
10. **Реестр иностранных агентов** ([`inoagent`](14-inoagent.md)) — проверка статуса иностранного агента по реестру Министерства юстиции РФ.
11. **Залоги движимого имущества** ([`pledge_person`](06-pledge_person.md)) — обременения транспортных средств, оборудования и долей по базе Федеральной нотариальной палаты (ФНП).
12. **Статус индивидуального предпринимателя (ЕГРИП)** ([`egrul_ip`](11-egrul_ip.md)) — регистрация в качестве ИП, действующий статус, история, ОКВЭД.
13. **Статус самозанятого (НПД)** ([`self_employed`](15-self_employed.md)) — подтверждение регистрации в качестве плательщика налога на профессиональный доход по данным ФНС РФ.
14. **Реестр массовых руководителей** ([`fns_mass_leaders`](17-fns_mass_leaders.md)) — факт включения ФИО/ИНН в реестр дисквалифицированных или массовых директоров ФНС РФ.
15. **Реестр массовых учредителей** ([`fns_mass_founders`](16-fns_mass_founders.md)) — факт включения в реестр массовых участников/учредителей юридических лиц ФНС РФ.
16. **Патенты и товарные знаки Роспатента** ([`intellectual_property`](18-intellectual_property.md)) — наличие зарегистрированных объектов интеллектуальной собственности (патенты на изобретения, товарные знаки, свидетельства ПО/БД) по базе ФИПС.

Состав шагов в `steps` и `results` оркестрируется динамически: на первом этапе параллельно запускаются проверки паспорта МВД, ФНС, ФССП, розыска, терроризма, иноагентов и судов. После определения ИНН автоматически инициируются подметоды проверки налоговых блокировок, банкротства, ИП, самозанятого, массовых руководителей и учредителей.

---

**Раздел:** [Физические лица](index.md)

## Связанные страницы

- [Обзор раздела физические лица](index.md)
- [passport_mvd — Проверка паспорта РФ на действительность](03-passport_mvd.md)
- [passport_fns — Проверка паспорта/ИНН через ФНС](02-passport_fns.md)
- [self_employed — Статус самозанятого (НПД)](15-self_employed.md)
- [fns_mass_leaders — Реестр массовых руководителей](17-fns_mass_leaders.md)
- [fns_mass_founders — Реестр массовых учредителей](16-fns_mass_founders.md)
- [intellectual_property — Товарные знаки и патенты Роспатента](18-intellectual_property.md)
- [bankrot_person — Проверка на банкротство физлица (Федресурс)](05-fedresurs_bankrot.md)

## Когда использовать

Используйте метод, когда нужно проверить физлицо, документ или связанный с ним государственный реестр по структурированным данным.

## Типовые кейсы

- Проверка анкеты клиента перед onboarding или выдачей услуги
- Автоматическая верификация паспорта, ИНН, задолженностей или ограничений
- Обогащение внутренней карточки физлица данными из внешнего источника

## Заголовки

 

Content-Type: application/json
X-API-KEY: <your_token>

 

## Входная схема (request)

```json
{
  "params": {
    "seria": "string (серия паспорта)",
    "number": "string (номер паспорта)",
    "firstname": "string",
    "lastname": "string",
    "secondname": "string",
    "dob": "YYYY-MM-DD",
    "country": "ru",
    "regioncode": "number (код региона ФССП или 100 для всех регионов)",
    "method": "complex_by_passport"
  },
  "webhook": "https://your.host/whook",
  "requestId": "optional-string"
}
```

`regioncode` используется для проверки ФССП внутри комплексной проверки. Передайте `regioncode: 100`, если нужно искать исполнительные производства по всем регионам ФССП.

---

## Пример запроса

```json
POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_TOKEN

{
  "params": {
    "seria": "0000",
    "number": "000000",
    "method": "complex_by_passport",
    "firstname": "Иван",
    "secondname": "Иванович",
    "lastname": "Иванов",
    "dob": "1990-01-01",
    "country": "ru",
    "regioncode": 77
  },
  "requestId": "11111111-2222-3333-4444-555555555555"
}
```

---

## Пример ответа

```json
{
  "params": {
    "seria": "0000",
    "number": "000000",
    "method": "complex_by_passport",
    "firstname": "Иван",
    "secondname": "Иванович",
    "lastname": "Иванов",
    "dob": "1990-01-01",
    "country": "ru",
    "regioncode": 77
  },
  "requestId": "11111111-2222-3333-4444-555555555555",
  "datecreated": "2026-03-17 12:00:00",
  "state": "complete",
  "balance": 9999,
  "steps": {
    "fssp_person": {
      "status": "complete",
      "error": null,
      "requestId": "aaaaaaaa-1111-2222-3333-bbbbbbbbbbbb"
    },
    "passport_mvd": {
      "status": "complete",
      "error": null,
      "requestId": "cccccccc-1111-2222-3333-dddddddddddd"
    },
    "passport_fns": {
      "status": "complete",
      "error": "passport_fns request failed with status 405",
      "requestId": "eeeeeeee-1111-2222-3333-ffffffffffff"
    },
    "pledge_person": {
      "status": "complete",
      "error": null,
      "requestId": "12121212-3434-5656-7878-909090909090"
    },
    "egrul_ip": {
      "status": "complete",
      "error": null,
      "requestId": "abababab-cdcd-efef-0101-232323232323"
    }
  },
  "results": {
    "passport_fns": {
      "taskId": "99999999-8888-7777-6666-555555555555",
      "result": {
        "status": 405,
        "data": []
      },
      "dateupdated": "2026-03-17 12:00:10"
    },
    "passport_mvd": {
      "taskId": "44444444-5555-6666-7777-888888888888",
      "dateupdated": "2026-03-17 12:00:12",
      "result": {
        "status": 200,
        "data": [
          {
            "doc_status": "Действительный"
          }
        ]
      }
    },
    "fssp_person": {
      "taskId": "10101010-2020-3030-4040-505050505050",
      "dateupdated": "2026-03-17 12:00:15",
      "result": {
        "status": 200,
        "data": []
      }
    },
    "pledge_person": {
      "taskId": "61616161-7272-8383-9494-050505050505",
      "dateupdated": "2026-03-17 12:00:18",
      "result": {
        "status": 200,
        "data": []
      }
    },
    "egrul_ip": {
      "taskId": "abab1111-cdcd-2222-efef-333344445555",
      "dateupdated": "2026-03-17 12:00:20",
      "result": {
        "status": 200,
        "data": []
      }
    }
  },
  "finished_at": "2026-03-17 12:00:21"
}
```

## AI Summary
 
<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "complex_by_passport",
  "intent": "Комплексная проверка физического лица по паспортным данным",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["firstname", "lastname", "secondname", "dob", "seria", "number", "method", "country"],
  "returns": ["state", "results.complex_by_passport.result.status", "results.complex_by_passport.result.data"]
}
```

</details>


