---
title: "nspd_cadastr — геоданные по кадастровому номеру"
description: "Метод NEWDB nspd_cadastr получает геоданные и сведения об объекте недвижимости по кадастровому номеру: координаты, контур, адрес, площадь, кадастровую стоимость и ЗОУИТ, найденные по выбранному объекту на карте."
canonical_url: https://newdb.net/docs/property/04-nspd_cadastr/
meta:
  - name: keywords
    content: "NEWDB API, nspd_cadastr, кадастровый номер, геоданные, недвижимость, координаты, контур, НСПД, ЗОУИТ"
  - property: og:title
    content: "Геоданные по кадастровому номеру — метод nspd_cadastr"
  - property: og:description
    content: "Получите геоданные, контур и характеристики объекта недвижимости по кадастровому номеру через API NEWDB."
---

# nspd_cadastr — Получение геоданных по кадастровому номеру

POST `https://api.newdb.net/v2`

Метод возвращает сведения об объекте недвижимости по кадастровому номеру, включая:

- координаты центра объекта
- точки контура
- геометрию объекта в формате `Polygon`
- адрес, площадь, этажность, год постройки
- назначение, вид права и кадастровую стоимость
- ЗОУИТ и другие выбранные объекты, которые НСПД показывает после клика по найденному объекту на карте

**Раздел:** [Имущество](index.md)

## Связанные страницы

- [Обзор раздела имущество](index.md)
- [pledge_vin — Проверка залога и обременений по VIN (ФНП + Федресурс)](03-pledge_vin.md)
- [pledge_property — Проверка залога и обременений по ID (ФНП + Федресурс)](02-pledge_property.md)
- [rosreestr — Проверка объекта недвижимости (Росреестр)](01-rosreestr.md)

## Когда использовать

Используйте метод, когда нужно проверить объект недвижимости, транспорт или сведения о залоге и обременениях.

## Типовые кейсы

- Проверка объекта перед сделкой или выдачей займа
- Получение сведений о залоге, кадастровых данных или геометрии объекта
- Обогащение карточки имущества структурированными данными из внешнего реестра

## Заголовки

Content-Type: application/json
X-API-KEY: <your_token>

## Входная схема (request)

```json
{
  "requestId": "optional-string",
  "params": {
    "method": "nspd_cadastr",
    "cad_num": "50:20:0020402:2230",
    "country": "ru"
  }
}
```

## Параметры запроса

| Поле | Тип | Обязательное | Описание |
| --- | --- | --- | --- |
| `requestId` | `string` | Нет | Уникальный идентификатор запроса на стороне клиента. |
| `taskId` | `string` | Нет | Внутренний идентификатор задачи, если используется в вашей интеграции. |
| `params.method` | `string` | Да | Значение должно быть `nspd_cadastr`. |
| `params.cad_num` | `string` | Да | Кадастровый номер объекта недвижимости. |
| `params.country` | `string` | Да | Код страны. Для России используйте `ru`. |

## Пример запроса

POST /v2 HTTP/1.1
Host: api.newdb.net
Content-Type: application/json
X-API-KEY: YOUR_TOKEN

```json
{
  "requestId": "a5962f88-2916-4779-b59d-43c023fa1894",
  "taskId": "nspd-cadastr-local-test-001",
  "params": {
    "method": "nspd_cadastr",
    "cad_num": "50:20:0020402:2230",
    "country": "ru"
  }
}
```

## Пример ответа

```json
{
  "requestId": "a5962f88-2916-4779-b59d-43c023fa1894",
  "taskId": "nspd-cadastr-local-test-001",
  "params": {
    "method": "nspd_cadastr",
    "cad_num": "50:20:0020402:2230",
    "country": "ru"
  },
  "datecreated": "2026-04-06 23:10:57",
  "state": "complete",
  "balance": 9623,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "nspd_cadastr": {
      "taskId": "68360634-9601-4af5-9820-aa5c7c416e48",
      "dateupdated": "2026-04-06 23:11:28",
      "result": {
        "status": 200,
        "data": [
          {
            "count": 1,
            "items": [
              {
                "object": {
                  "id": 157240605,
                  "cad_num": "50:20:0020402:2230",
                  "category": "Здания",
                  "type": "Здание",
                  "name": "Индивидуальный жилой",
                  "address": "Российская Федерация, Московская область, г.о. Одинцовский, д Глазынино, д. 60Б",
                  "area": 174.2,
                  "floors": "1",
                  "year_built": "2022",
                  "status": "Учтенный",
                  "purpose": "Жилой дом",
                  "permitted_use": "Индивидуальный жилой дом",
                  "ownership_type": "Частная",
                  "right_type": "Собственность",
                  "cad_cost": 7020879.97
                },
                "geo": {
                  "center": {
                    "lat": 55.66651799,
                    "lon": 37.307048
                  },
                  "points": [
                    {
                      "lon": 37.30692886,
                      "lat": 55.66660437
                    },
                    {
                      "lon": 37.30697884,
                      "lat": 55.66642699
                    },
                    {
                      "lon": 37.30716713,
                      "lat": 55.66644389
                    },
                    {
                      "lon": 37.30712621,
                      "lat": 55.66658964
                    },
                    {
                      "lon": 37.3069899,
                      "lat": 55.66657738
                    },
                    {
                      "lon": 37.30698101,
                      "lat": 55.666609
                    },
                    {
                      "lon": 37.30692886,
                      "lat": 55.66660437
                    }
                  ],
                  "source_geometry": {
                    "type": "Polygon",
                    "coordinates": [
                      [
                        [
                          4152988.323135661,
                          7492330.286758492
                        ],
                        [
                          4152993.886819103,
                          7492295.2779500205
                        ],
                        [
                          4153014.847311023,
                          7492298.61263929
                        ],
                        [
                          4153010.2915783804,
                          7492327.380263791
                        ],
                        [
                          4152995.118216751,
                          7492324.959447225
                        ],
                        [
                          4152994.128032246,
                          7492331.20095866
                        ],
                        [
                          4152988.323135661,
                          7492330.286758492
                        ]
                      ]
                    ]
                  },
                  "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                      [
                        [
                          37.30692886,
                          55.66660437
                        ],
                        [
                          37.30697884,
                          55.66642699
                        ],
                        [
                          37.30716713,
                          55.66644389
                        ],
                        [
                          37.30712621,
                          55.66658964
                        ],
                        [
                          37.3069899,
                          55.66657738
                        ],
                        [
                          37.30698101,
                          55.666609
                        ],
                        [
                          37.30692886,
                          55.66660437
                        ]
                      ]
                    ]
                  }
                }
              },
              {
                "object": {
                  "cad_num": "77:01:0000000:1001"
                }
              },
              {
                "object": {
                  "cad_num": "77:01:0000000:1002"
                }
              }
            ],
            "objects_list": {
              "count": 2,
              "cad_nums": [
                "77:01:0000000:1001",
                "77:01:0000000:1002"
              ],
              "items": [
                {
                  "object": {
                    "cad_num": "77:01:0000000:1001"
                  }
                },
                {
                  "object": {
                    "cad_num": "77:01:0000000:1002"
                  }
                }
              ],
              "raw": {
                "title": "Список объектов"
              }
            },
            "selected_objects": {
              "count": 1,
              "items": [
                {
                  "id": "470000000",
                  "category": "ЗОУИТ природных территорий",
                  "type": "ЗОУИТ природных территорий",
                  "number": "77:01-6.100",
                  "number_type": "registry_boundary_number",
                  "text": "Реестровый номер границы: 77:01-6.100",
                  "source": "accordion_item",
                  "is_special_conditions_zone": true
                }
              ],
              "raw_text": "Реестровый номер границы: 77:01-6.100"
            },
            "selected_special_conditions_zones_count": 1,
            "selected_special_conditions_zones": [
              {
                "id": "470000000",
                "category": "ЗОУИТ природных территорий",
                "type": "ЗОУИТ природных территорий",
                "number": "77:01-6.100",
                "number_type": "registry_boundary_number",
                "text": "Реестровый номер границы: 77:01-6.100",
                "source": "accordion_item",
                "is_special_conditions_zone": true
              }
            ],
            "has_zouit_by_selected_objects": true,
            "special_conditions_zones_count": 0,
            "special_conditions_zones": [],
            "url": "https://nspd.gov.ru/map?thematic=PKK&zoom=20&coordinate_x=4100000&coordinate_y=7500000&baseLayerId=235&theme_id=1&is_copy_url=true&active_layers=37577%2C37579%2C37581%2C37580%2C37578&selectedCard=157240605%2C36368%2C77%3A01%3A0000000%3A1000"
          }
        ]
      }
    }
  }
}
```

## Что возвращается в ответе

| Поле | Описание |
| --- | --- |
| `state` | Статус обработки запроса. |
| `results.nspd_cadastr.result.status` | HTTP-статус результата обработки. |
| `results.nspd_cadastr.result.data[].count` | Количество найденных объектов. |
| `results.nspd_cadastr.result.data[].items[].object` | Основные сведения об объекте: тип, адрес, площадь, этажность, назначение, форма собственности и кадастровая стоимость. |
| `results.nspd_cadastr.result.data[].items[].geo.center` | Центральная точка объекта в координатах WGS84. |
| `results.nspd_cadastr.result.data[].items[].geo.points` | Точки контура объекта в координатах WGS84. |
| `results.nspd_cadastr.result.data[].items[].geo.geometry` | Геометрия объекта в формате `Polygon` с координатами WGS84. |
| `results.nspd_cadastr.result.data[].items[].geo.source_geometry` | Исходная геометрия объекта в системе координат источника. |
| `results.nspd_cadastr.result.data[].objects_list` | Список объектов, который НСПД показывает в карточке выбранного результата. Обычно содержит связанные кадастровые номера, найденные рядом с выбранным объектом. |
| `results.nspd_cadastr.result.data[].selected_objects` | Объекты из вкладки «Выделенные объекты» после клика по найденному объекту на карте. В этот блок попадают ЗОУИТ и другие элементы, которые НСПД показывает в accordion-списке. |
| `results.nspd_cadastr.result.data[].selected_objects.items[].number` | Номер выбранного объекта. Для ЗОУИТ обычно это реестровый номер границы, например `77:01-6.100`. |
| `results.nspd_cadastr.result.data[].selected_objects.items[].number_type` | Тип номера. Значение `registry_boundary_number` означает реестровый номер границы ЗОУИТ; `cadastral_number` — кадастровый номер. |
| `results.nspd_cadastr.result.data[].selected_objects.items[].category` | Раздел НСПД, из которого получен выбранный объект, например `ЗОУИТ природных территорий`, `Иные ЗОУИТ`, `ЗОУИТ объектов энергетики, связи, транспорта`. |
| `results.nspd_cadastr.result.data[].selected_objects.items[].is_special_conditions_zone` | `true`, если выбранный объект распознан как ЗОУИТ или зона с особыми условиями использования территории. |
| `results.nspd_cadastr.result.data[].selected_special_conditions_zones` | Отфильтрованный список ЗОУИТ из `selected_objects.items`. |
| `results.nspd_cadastr.result.data[].selected_special_conditions_zones_count` | Количество найденных ЗОУИТ в списке выбранных объектов. |
| `results.nspd_cadastr.result.data[].has_zouit_by_selected_objects` | `true`, если после клика по объекту НСПД вернул хотя бы одну ЗОУИТ во вкладке «Выделенные объекты». |
| `results.nspd_cadastr.result.data[].special_conditions_zones` | ЗОУИТ, найденные непосредственно среди объектов поисковой выдачи. Может быть пустым, даже если `selected_special_conditions_zones` содержит зоны после клика по карте. |
| `results.nspd_cadastr.result.data[].url` | Ссылка на НСПД с выбранной карточкой, активными слоями ЗОУИТ и координатами объекта. |

## Разделы ЗОУИТ

При открытии результата на карте метод активирует слои ЗОУИТ и читает вкладку «Выделенные объекты». Если НСПД показывает рядом с объектом зоны с особыми условиями использования территории, они возвращаются в `selected_objects` и дублируются в `selected_special_conditions_zones`.

Поддерживаемые разделы ЗОУИТ:

- `ЗОУИТ объектов культурного наследия`
- `ЗОУИТ объектов энергетики, связи, транспорта`
- `ЗОУИТ природных территорий`
- `ЗОУИТ охраняемых объектов и безопасности`
- `Иные ЗОУИТ`

Пример элемента ЗОУИТ:

```json
{
  "id": "470000000",
  "category": "ЗОУИТ природных территорий",
  "type": "ЗОУИТ природных территорий",
  "number": "77:01-6.100",
  "number_type": "registry_boundary_number",
  "text": "Реестровый номер границы: 77:01-6.100",
  "source": "accordion_item",
  "is_special_conditions_zone": true
}
```

Если `has_zouit_by_selected_objects` равно `true`, объект пересекается или связан с одной или несколькими зонами, которые НСПД показал после клика по объекту на карте. Для пользовательского интерфейса обычно достаточно выводить `selected_special_conditions_zones_count` и список `selected_special_conditions_zones`.

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "nspd_cadastr",
  "intent": "Получение геоданных и характеристик объекта недвижимости по кадастровому номеру",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["cad_num", "method", "country"],
  "returns": [
    "state",
    "results.nspd_cadastr.result.status",
    "results.nspd_cadastr.result.data[].items[].geo",
    "results.nspd_cadastr.result.data[].selected_special_conditions_zones",
    "results.nspd_cadastr.result.data[].has_zouit_by_selected_objects"
  ]
}
```

</details>
