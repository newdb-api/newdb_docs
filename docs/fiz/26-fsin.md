---
title: "fsin_wanted — проверка физлица в розыске ФСИН"
description: "Метод NEWDB fsin ищет физическое лицо в публичном сервисе ФСИН России «Внимание, розыск!» по ФИО, дате рождения и территориальному органу."
canonical_url: https://newdb.net/docs/fiz/26-fsin/
meta:
  - name: keywords
    content: "NEWDB API, fsin, ФСИН, розыск, физлица, Внимание розыск, осужденные"
  - property: og:title
    content: "Проверка физлица в розыске ФСИН — метод fsin"
  - property: og:description
    content: "Поиск физического лица в сервисе ФСИН России «Внимание, розыск!» по ФИО, дате рождения и территориальному органу."
---

# fsin_wanted — Проверка физлица в розыске ФСИН

POST `https://api.newdb.net/v2`

Метод выполняет поиск физического лица в публичном реестре Федеральной службы исполнения наказаний (ФСИН России) «Внимание, розыск!» и возвращает сведения о найденных ориентировках, фотографии, сведения о приговоре и территориальном органе.

**Раздел:** [Физические лица](index.md)

## Связанные страницы

- [Обзор раздела физические лица](index.md)
- [mvd_wanted — Проверка физлица в розыске МВД](13-mvd_wanted.md)
- [terrorist — Проверка по перечням терроризма, экстремизма и ОМУ](12-terrorist.md)
- [fssp_person — Исполнительные производства ФССП](01-fssp_person.md)

## Когда использовать

- Комплексная проверка физического лица на факт нахождения в розыске ФСИН
- Проверка соискателей, сотрудников СБ и комплаенс-контроль
- Проверка заемщиков и контрагентов в рамках due diligence

## Заголовки

```text
Content-Type: application/json
X-API-KEY: <your_token>
```

## Входная схема

```json
{
  "params": {
    "method": "fsin_wanted",
    "fio": "Волков Николай Алексеевич",
    "dob": "08.07.1973",
    "territory": "Свердловская область"
  },
  "requestId": "optional-string"
}
```

## Параметры запроса

| Поле | Тип | Обязательное | Описание |
| --- | --- | --- | --- |
| `params.method` | `string` | Да | Идентификатор метода: `fsin_wanted` (устаревший алиас `fsin` также поддерживается). |
| `params.fio` | `string` | Да* | Полное ФИО (например, `Волков Николай Алексеевич`). *Либо раздельные поля `lastname` и `firstname`. |
| `params.lastname` | `string` | Нет | Фамилия. |
| `params.firstname` | `string` | Нет | Имя. |
| `params.secondname` | `string` | Нет | Отчество. |
| `params.dob` | `string` | Нет | Дата рождения в формате `DD.MM.YYYY` или год `YYYY` для валидации совпадений. |
| `params.territory` | `string` | Нет | Территориальный орган ФСИН (наименование региона или код, например `3448` / `Свердловская область`). По умолчанию поиск по всей РФ. |
| `params.get_details` | `boolean` | Нет | Догружать ли детали ориентировки (полноразмерное фото и текст приговора/статьи). По умолчанию `true`. |

## Пример запроса

```json
{
  "requestId": "fsin-check-001",
  "params": {
    "method": "fsin_wanted",
    "fio": "Волков Николай Алексеевич"
  }
}
```

## Пример ответа

```json
{
  "requestId": "fsin-check-001",
  "taskId": "task-uuid",
  "params": {
    "method": "fsin_wanted",
    "fio": "Волков Николай Алексеевич"
  },
  "status": "success",
  "results": {
    "fsin_wanted": {
      "taskId": "task-uuid",
      "dateupdated": "2026-09-17 13:34:45",
      "result": {
        "status": 200,
        "found": true,
        "total": 1,
        "query": {
          "fio": "Волков Николай Алексеевич",
          "dob": "",
          "territory": "",
          "territory_title": ""
        },
        "source": "https://fsin.gov.ru/criminal/",
        "transport": "http",
        "data": [
          {
            "fio": "Волков Николай Алексеевич",
            "birth_date": "08.07.1973",
            "birth_place": "Казахская ССР, Кустанайская область, Урицкий район, п. Коскуль",
            "publish_date": "17.09.2026",
            "title": "Ориентировка Волков Николай Алексеевич",
            "territorial_organ": "Свердловская область (ГУФСИН)",
            "federal_organ": "Уральский федеральный округ",
            "thumbnail": "https://fsin.gov.ru/upload/iblock/c2c/qmwsk10mvkyn29hltxfk0riz7wdcvj0y.jpg",
            "image": "https://fsin.gov.ru/upload/iblock/c9b/lx0xua6hoyclln2d5s4jgg6j1368ds2s.png",
            "detail_url": "https://fsin.gov.ru/criminal/index.php?ELEMENT_ID=897448",
            "element_id": "897448",
            "raw_text": "Волков Николай Алексеевич, 08.07.1973 г.р., уроженец Казахская ССР, Кустанайская область, Урицкий район, п. Коскуль",
            "crime_info": "Осужден 17.11.2017 приговором Ирбитского районного суда Свердловской области по п. \"а\", \"б\",\"в\" ч. 2 ст. 158 УК РФ срок осуждения 5 лет лишения свободы",
            "match": "exact",
            "dob_match": null
          }
        ]
      }
    }
  }
}
```

## Описание полей ответа

| Поле | Тип | Описание |
| --- | --- | --- |
| `status` | `string` | Статус запроса (`success` / `error`). |
| `results.fsin_wanted.result.status` | `integer` | HTTP-статус (`200` при успешном поиске). |
| `results.fsin_wanted.result.found` | `boolean` | `true`, если найдены ориентировки розыска; `false`, если лицо не найдено. |
| `results.fsin_wanted.result.total` | `integer` | Количество найденных ориентировок. |
| `results.fsin_wanted.result.data[].fio` | `string` | ФИО разыскиваемого лица из ориентировки. |
| `results.fsin_wanted.result.data[].birth_date` | `string` | Дата рождения (`DD.MM.YYYY`). |
| `results.fsin_wanted.result.data[].birth_place` | `string` | Место рождения. |
| `results.fsin_wanted.result.data[].publish_date` | `string` | Дата публикации ориентировки на сайте ФСИН. |
| `results.fsin_wanted.result.data[].title` | `string` | Заголовок ориентировки. |
| `results.fsin_wanted.result.data[].territorial_organ` | `string` | Территориальный орган, объявивший розыск (ГУФСИН/УФСИН субъекта РФ). |
| `results.fsin_wanted.result.data[].federal_organ` | `string` | Федеральный округ. |
| `results.fsin_wanted.result.data[].image` | `string` | Ссылка на полноразмерную фотографию разыскиваемого. |
| `results.fsin_wanted.result.data[].thumbnail` | `string` | Ссылка на уменьшенную фотографию из списка. |
| `results.fsin_wanted.result.data[].detail_url` | `string` | Прямая ссылка на ориентировку на официальном портале ФСИН. |
| `results.fsin_wanted.result.data[].crime_info` | `string` | Фабула осуждения, суд, дата приговора, статьи УК РФ и срок наказания. |
| `results.fsin_wanted.result.data[].match` | `string` | Тип совпадения ФИО (`exact`, `tokens`, `partial`). |
| `results.fsin_wanted.result.data[].dob_match` | `boolean/null` | Совпадение даты рождения при указании `dob` в запросе. |

## Совместимость с форматом «За Честный Бизнес» (ЗБ)

Метод `fsin` полностью поддерживается конвертерами формата ЗБ (`format=zb`):
- Преобразуется в стандартный реестровый ответ (`Реестр: "fsin"`, `Найден: true/false`, `Записи: [...]`).
- Автоматически включается в комплексные отчеты физических лиц `flcheck_report` (блок 21 `fsin`) и карточку `person` (`РозыскФСИН: true/false`).
