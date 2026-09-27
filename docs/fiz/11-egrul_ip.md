---
title: "egrul_ip — сведения ЕГРИП / статус ИП"
description: "Метод NEWDB egrul_ip получает сведения об ИП из сервиса Прозрачный бизнес по ИНН физического лица."
canonical_url: https://newdb.net/docs/fiz/11-egrul_ip/
meta:
  - name: keywords
    content: "NEWDB API, egrul_ip, ЕГРИП, ИП, Прозрачный бизнес"
  - property: og:title
    content: "ЕГРИП / статус ИП — метод egrul_ip"
  - property: og:description
    content: "Проверка статуса ИП и сведений ЕГРИП по ИНН физического лица через API NEWDB."
---

# egrul_ip — Проверка статуса ИП / сведений ЕГРИП

POST `https://api.newdb.net/v2`

Метод выполняет поиск сведений об индивидуальном предпринимателе по `innfiz` через источник ФНС "Прозрачный бизнес".

Для запроса нужно передавать `innfiz` из 12 цифр.

**Раздел:** [Физические лица](index.md)

## Связанные страницы

- [Обзор раздела физические лица](index.md)
- [fns_block_person — Проверка блокировок счетов физлица (ФНС)](10-fns_block_person.md)
- [terrorist — Проверка на причастность к терроризму и распространению ОМУ](12-terrorist.md)
- [elmk_registry — Проверка статуса электронной медицинской книжки](09-elmk_registry.md)

## Когда использовать

Используйте метод, когда нужно проверить физлицо, документ или связанный с ним государственный реестр по структурированным данным.

## Типовые кейсы

- Проверка анкеты клиента перед onboarding или выдачей услуги
- Автоматическая верификация паспорта, ИНН, задолженностей или ограничений
- Обогащение внутренней карточки физлица данными из внешнего источника

## Заголовки

```text
Content-Type: application/json
X-API-KEY: <your_token>
```

## Входная схема (request)

```json
{
  "params": {
    "innfiz": "string (ИНН физлица, 12 цифр)",
    "country": "string (ru)",
    "method": "egrul_ip"
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
    "innfiz": "270392288605",
    "country": "ru",
    "method": "egrul_ip"
  },
  "requestId": "df5f4a21-2d3c-4de7-9a8d-455b89990011"
}
```

## Пример ответа

```json
{
  "params": {
    "innfiz": "270392288605",
    "country": "ru",
    "method": "egrul_ip"
  },
  "requestId": "df5f4a21-2d3c-4de7-9a8d-455b89990011",
  "datecreated": "2026-03-20 07:12:31",
  "state": "complete",
  "balance": 9707,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "egrul_ip": {
      "taskId": "0b8cb1c6-67bf-4f3f-b2ba-2b2d205f3d53",
      "dateupdated": "2026-03-20 07:12:45",
      "result": {
        "status": 200,
        "data": []
      }
    }
  }
}
```

## Что приходит при найденных данных

Если ИП найден, элемент в `results.egrul_ip.result.data[]` имеет ту же верхнеуровневую структуру, что и метод [`egrul`](../legal/04-egrul.md): `request`, `http`, `search`, `company`.

В блоке `search.matches[]` обычно возвращаются ИНН, ОГРНИП, краткое и полное имя, статус, дата регистрации, коды ОКВЭД и ссылки на карточку в "Прозрачном бизнесе".

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "egrul_ip",
  "intent": "Проверка статуса ИП и сведений из ЕГРИП",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["innfiz", "method", "country"],
  "returns": ["state", "results.egrul_ip.result.status", "results.egrul_ip.result.data"]
}
```

</details>


