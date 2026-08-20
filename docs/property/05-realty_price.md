---
title: "realty_price — оценка стоимости недвижимости"
description: "Метод NEWDB realty_price оценивает стоимость недвижимости по кадастровому номеру или адресу для сценариев покупки и аренды, возвращает расчетную стоимость, сводную информацию по разбросу цен, сведения Росреестра и координаты НСПД."
canonical_url: https://newdb.net/docs/property/05-realty_price/
meta:
  - name: keywords
    content: "NEWDB API, realty_price, оценка недвижимости, кадастровый номер, стоимость квартиры, аренда, покупка, Росреестр, НСПД"
  - property: og:title
    content: "Оценка стоимости недвижимости — метод realty_price"
  - property: og:description
    content: "Получите расчет стоимости объекта недвижимости для покупки или аренды, сводную информацию по разбросу цен, данные Росреестра и координаты НСПД через API NEWDB."
---

# realty_price — Оценка стоимости недвижимости

POST `https://api.newdb.net/v2`

Метод рассчитывает ориентировочную рыночную стоимость объекта недвижимости по кадастровому номеру или адресу. Оценка строится на основе сводных данных по объявлениям недвижимости с максимально похожими объектами по характеристикам и адресу.

В ответе возвращаются:

- итоговая расчетная стоимость объекта
- стоимость квадратного метра
- сводная информация по разбросу цен
- сведения Росреестра по объекту
- данные НСПД, включая координаты для отображения на карте

**Раздел:** [Имущество](index.md)

## Связанные страницы

- [Обзор раздела имущество](index.md)
- [rosreestr — Проверка объекта недвижимости (Росреестр)](01-rosreestr.md)
- [nspd_cadastr — Получение геоданных по кадастровому номеру](04-nspd_cadastr.md)

## Когда использовать

Используйте метод, когда нужно получить расчет стоимости квартиры, помещения, дома или другого объекта недвижимости для сделки, скоринга, витрины, CRM или внутренней аналитики.

## Типы оценки

Поле `params.valuation_type` задает сценарий оценки:

| Значение | Описание |
| --- | --- |
| `sale` | Оценка стоимости для покупки или продажи объекта. |
| `rent` | Оценка стоимости аренды объекта. |

## Заголовки

Content-Type: application/json
X-API-KEY: <your_token>

## Входная схема (request)

```json
{
  "requestId": "optional-string",
  "taskId": "optional-string",
  "params": {
    "method": "realty_price",
    "address": "77:09:0002010:3108",
    "valuation_type": "sale",
    "country": "ru"
  }
}
```

## Параметры запроса

| Поле | Тип | Обязательное | Описание |
| --- | --- | --- | --- |
| `requestId` | `string` | Нет | Уникальный идентификатор запроса на стороне клиента. |
| `taskId` | `string` | Нет | Внутренний идентификатор задачи, если используется в вашей интеграции. |
| `params.method` | `string` | Да | Значение должно быть `realty_price`. |
| `params.address` | `string` | Да | Кадастровый номер или текстовый адрес объекта недвижимости. |
| `params.valuation_type` | `string` | Да | Тип оценки: `sale` для покупки или продажи, `rent` для аренды. |
| `params.country` | `string` | Нет | Код страны. Для России используйте `ru`. |

## Пример запроса

POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_TOKEN

```json
{
  "requestId": "a5962f88-2916-4789-b69d-43c023fa1294",
  "taskId": "nspd-cadastr-local-test-001",
  "params": {
    "method": "realty_price",
    "address": "77:09:0002010:3108",
    "valuation_type": "sale"
  }
}
```

## Пример ответа

```json
{
  "requestId": "a5962f88-2916-4789-b69d-43c023fa1294",
  "taskId": "nspd-cadastr-local-test-001",
  "params": {
    "method": "realty_price",
    "address": "77:09:0002010:3108",
    "valuation_type": "sale",
    "country": "ru",
    "newdb_qid": "EIw7IOnCpI3hMygD"
  },
  "datecreated": "2026-05-10 14:32:36",
  "state": "complete",
  "balance": 9467,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "realty_price": {
      "taskId": "880ff153-66d1-426f-9d66-57f3101716be",
      "dateupdated": "2026-05-10 14:33:15",
      "result": {
        "status": 200,
        "summary": {
          "offers_count": 10,
          "failed_offers_count": 0,
          "prices_count": 10,
          "average_price": 15704000,
          "average_price_label": "15 704 000 ₽",
          "median_price": 14800000,
          "median_price_label": "14 800 000 ₽",
          "min_price": 13250000,
          "min_price_label": "13 250 000 ₽",
          "max_price": 21000000,
          "max_price_label": "21 000 000 ₽"
        },
        "avm": {
          "estimated_price": 12777434,
          "estimated_price_label": "12 777 434 ₽",
          "price_range": {
            "low": 9199752,
            "high": 16355116
          },
          "confidence": "low",
          "base_price": 12913021,
          "weighted_price": 12913021,
          "weighted_price_per_m2": 426172
        },
        "rosreestr": {
          "results": {
            "rosreestr": {
              "result": {
                "status": 200,
                "data": [
                  {
                    "cadNumber": "77:09:0002010:3108",
                    "cadQuarter": "77:09:0002010",
                    "area": "30.30",
                    "address": {
                      "readableAddress": "Российская Федерация, город Москва, вн.тер.г. муниципальный округ Дмитровский, улица Лобненская, дом 4, квартира 86"
                    },
                    "rights": [
                      {
                        "rightTypeDesc": "Собственность",
                        "rightRegDate": "09.09.2013",
                        "rightNumber": "77-77-09/234/2013-811"
                      }
                    ],
                    "encumbrances": [
                      {
                        "startDate": "25.07.2008",
                        "encumbranceNumber": "77-77-09/031/2008-825",
                        "type": "022098000000"
                      }
                    ],
                    "cadCost": "6990401.19",
                    "cadCostDeterminationDate": "01.01.2025",
                    "levelFloor": "7",
                    "objType_text": "Помещение",
                    "purpose_text": "Жилое"
                  }
                ]
              }
            }
          }
        },
        "nspd": {
          "results": {
            "nspd_cadastr": {
              "result": {
                "status": 200,
                "data": [
                  {
                    "count": 1,
                    "items": [
                      {
                        "object": {
                          "id": 279443831,
                          "category": "Помещения",
                          "address": "Российская Федерация, город Москва, вн.тер.г. муниципальный округ Дмитровский, улица Лобненская, дом 4, квартира 86",
                          "purpose": "Жилое",
                          "ownership_type": "Частная",
                          "cad_cost": 6990401.19
                        },
                        "geo": {
                          "center": {
                            "lat": 55.89046315,
                            "lon": 37.53910976
                          },
                          "geometry": {
                            "type": "Point",
                            "coordinates": [
                              37.53910976,
                              55.89046315
                            ]
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            }
          }
        }
      }
    }
  }
}
```

## Где находится итоговая оценка

Итоговое значение оценки находится в блоке `results.realty_price.result.avm`:

| Поле | Описание |
| --- | --- |
| `avm.estimated_price` | Итоговая расчетная стоимость объекта. Для `sale` возвращается цена покупки или продажи, для `rent` — расчетная стоимость аренды. |
| `avm.estimated_price_label` | То же значение в человекочитаемом формате с валютой. |
| `avm.price_range.low` | Нижняя граница расчетного диапазона. |
| `avm.price_range.high` | Верхняя граница расчетного диапазона. |
| `avm.confidence` | Степень точности оценки относительно сводной информации по объявлениям. Например, `low` означает низкую уверенность: оценку нужно интерпретировать осторожно, особенно если объявлений мало или они сильно отличаются по цене. |
| `avm.base_price` | Базовая расчетная стоимость до дополнительных корректировок. |
| `avm.weighted_price` | Взвешенная расчетная стоимость объекта. |
| `avm.weighted_price_per_m2` | Взвешенная стоимость квадратного метра. |

## Сводная информация по разбросу цен

Блок `results.realty_price.result.summary` показывает сводную информацию по разбросу цен в объявлениях, которые использовались для расчета и сравнения с похожими объектами:

| Поле | Описание |
| --- | --- |
| `summary.offers_count` | Количество найденных объявлений. |
| `summary.failed_offers_count` | Количество объявлений, которые не удалось использовать при расчете. |
| `summary.prices_count` | Количество цен, попавших в расчет сводной информации. |
| `summary.average_price` | Средняя цена по объявлениям. |
| `summary.median_price` | Медианная цена по объявлениям. |
| `summary.min_price` | Минимальная цена среди объявлений. |
| `summary.max_price` | Максимальная цена среди объявлений. |
| `summary.*_label` | Человекочитаемые версии цен с валютой. |

## Данные Росреестра в ответе

В блоке `results.realty_price.result.rosreestr` возвращается вложенный результат метода `rosreestr`. Он содержит юридические и кадастровые сведения об объекте:

| Поле | Описание |
| --- | --- |
| `cadNumber` | Кадастровый номер объекта. |
| `cadQuarter` | Кадастровый квартал. |
| `area` | Площадь объекта. |
| `address.readableAddress` | Полный читаемый адрес объекта. |
| `regDate` | Дата постановки объекта на кадастровый учет. |
| `rights` | Сведения о зарегистрированных правах: тип права, дата регистрации, номер записи, вид собственности. |
| `encumbrances` | Сведения об ограничениях и обременениях: дата начала, номер, тип и описание ограничения. |
| `oldNumbers` | Старые, условные или инвентарные номера объекта. |
| `cadCost` | Кадастровая стоимость. |
| `cadCostDeterminationDate` | Дата определения кадастровой стоимости. |
| `cadCostRegistrationDate` | Дата внесения кадастровой стоимости. |
| `infoUpdateDate` | Дата обновления сведений. |
| `levelFloor` | Этаж расположения помещения, если источник вернул это поле. |
| `mainCharacters` | Основные характеристики объекта, например площадь и единица измерения. |
| `objType_text` | Тип объекта в текстовом виде. |
| `purpose_text` | Назначение объекта в текстовом виде. |

## Данные НСПД и карта

В блоке `results.realty_price.result.nspd` возвращается вложенный результат метода `nspd_cadastr`. Эти данные можно использовать для отображения объекта на карте:

| Поле | Описание |
| --- | --- |
| `object.id` | Идентификатор объекта в источнике НСПД. |
| `object.category` | Категория объекта, например `Помещения`, `Здания` или `Земельные участки`. |
| `object.address` | Адрес объекта. |
| `object.purpose` | Назначение объекта. |
| `object.ownership_type` | Форма собственности, если она доступна. |
| `object.cad_cost` | Кадастровая стоимость по данным НСПД. |
| `geo.center.lat` | Широта центральной точки объекта в WGS84. |
| `geo.center.lon` | Долгота центральной точки объекта в WGS84. |
| `geo.points` | Точки контура объекта в WGS84, если источник вернул контур. |
| `geo.geometry` | Геометрия для карты в WGS84. Может быть `Point` для точечного объекта или `Polygon` для объекта с контуром. |
| `geo.source_geometry` | Исходная геометрия в системе координат источника. |

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "realty_price",
  "intent": "Оценка стоимости недвижимости для покупки/продажи или аренды",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["address", "method", "valuation_type"],
  "valuation_types": ["sale", "rent"],
  "returns": [
    "state",
    "results.realty_price.result.status",
    "results.realty_price.result.summary",
    "results.realty_price.result.avm.estimated_price",
    "results.realty_price.result.avm.weighted_price_per_m2",
    "results.realty_price.result.avm.confidence",
    "results.realty_price.result.rosreestr",
    "results.realty_price.result.nspd"
  ]
}
```

</details>
