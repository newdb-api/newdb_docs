---
title: "NEWDB API — документация и подключение"
description: "Официальное руководство по REST API NEWDB: базовый URL, аутентификация и обзор ключевых разделов."
canonical_url: https://newdb.net/docs/
meta:
  - name: keywords
    content: "NEWDB API, REST, документация, интеграция, AI агенты"
  - property: og:title
    content: "NEWDB API — документация и подключение"
  - property: og:description
    content: "Инструкция по подключению к REST API NEWDB с примерами токенов и доступных разделов."
---

# NEWDB — REST API

Добро пожаловать в документацию NEWDB. Здесь вы найдёте описание REST API, примеры запросов/ответов, а также **метаданные для AI-агентов** (раздел `x-ai` в описаниях методов).

## Базовый URL

```
https://api.newdb.net/v2
```

## Swagger UI

Интерактивная OpenAPI-спецификация доступна по адресу [https://newdb.net/swagger/](https://newdb.net/swagger/). В Swagger можно посмотреть схемы запросов и ответов, а также выполнить тестовый запрос к `https://api.newdb.net`.

## Аутентификация

Передавайте токен в заголовке:

```
X-API-KEY: <your_token>
```

API разработан для проведения комплексных проверок юридических и физических лиц. Для получения токена напишите письмо на access@newdb.net.

## Проверка баланса

Для проверки текущего баланса используйте запрос:

```http
GET https://api.newdb.net/v2/balance
Headers: 
X-API-KEY: <your_token>
```

Пример ответа:

```json
{
  "token": "2f5c2f2d-7d46-4f5c-9c6f-1f4e8e7b9a31",
  "balance": 9696
}
```

## Реестр методов

### Физические лица

- [fssp_person](fiz/01-fssp_person.md) — проверка исполнительных производств ФССП по ФИО, дате рождения и региону
- [passport_fns](fiz/02-passport_fns.md) — проверка паспорта и получение ИНН через ФНС
- [passport_mvd](fiz/03-passport_mvd.md) — проверка паспорта РФ на действительность
- [complex_by_passport](fiz/04-complex_by_passport.md) — комплексная проверка человека по паспорту
- [bankrot_person](fiz/05-fedresurs_bankrot.md) — проверка банкротства физлица или ИП через Федресурс
- [pledge_person](fiz/06-pledge_person.md) — проверка залогов и обременений по физлицу
- [arbitr_person](fiz/07-arbitr_person.md) — арбитражные дела физлица в КАД
- [nalog_debt](fiz/08-nalog_debt.md) — налоговая задолженность физлица по ИНН
- [elmk_registry](fiz/09-elmk_registry.md) — статус электронной медицинской книжки
- [fns_block_person](fiz/10-fns_block_person.md) — блокировки счетов физлица по данным ФНС
- [egrul_ip](fiz/11-egrul_ip.md) — сведения ЕГРИП и статус ИП по `innfiz`
- [terrorist](fiz/12-terrorist.md) — проверка на причастность к терроризму, экстремизму и распространению ОМУ
- [inoagent](fiz/14-inoagent.md) — проверка физлица в реестре иностранных агентов Минюста

### Иностранные граждане

- [foreign_vng](foreign/01-foreign_vng.md) — проверка вида на жительство
- [foreign_patent](foreign/02-foreign_patent.md) — проверка патента
- [foreign_rvp_stamp](foreign/03-foreign_rvp_stamp.md) — проверка РВП по штампу в паспорте
- [foreign_rvp_blank](foreign/04-foreign_rvp_blank.md) — проверка РВП по бланку
- [foreign_rnr](foreign/05-foreign_rnr.md) — проверка разрешения на работу
- [rkl](foreign/06-foreign_rkl.md) — проверка по реестру контролируемых лиц
- [patent_msk](foreign/07-foreign_patent_msk.md) — патент для Москвы
- [patent_mo](foreign/08-foreign_patent_mo.md) — патент для Московской области

### Юридические лица

- [arbitr_legal](legal/01-arbitr_legal.md) — арбитражные дела юрлица в КАД
- [fns_block](legal/02-fns_block.md) — блокировки счетов юрлица по данным ФНС
- [bankrot_legal](legal/03-bankrot_legal.md) — проверка банкротства юрлица через Федресурс
- [egrul](legal/04-egrul.md) — сведения ЕГРЮЛ и карточка компании из Прозрачного бизнеса
- [fssp_legal](legal/05-fssp_legal.md) — исполнительные производства ФССП по ИНН юридического лица
- [pledge_legal](legal/07-pledge_legal.md) — залоги, лизинг и обременения юрлица по ИНН

### ГАС Правосудие

- [pravo_cases_details](gas/01-pravo_cases_details.md) — получение деталей судебного дела по `case_id`
- [pravo_search](gas/02-pravo_search.md) — поиск судебных дел по участникам, номеру, судье, категории и тексту актов

### Имущество

- [rosreestr](property/01-rosreestr.md) — проверка объекта недвижимости по кадастровому номеру или адресу
- [pledge_property](property/02-pledge_property.md) — проверка залога и обременений по идентификатору предмета
- [pledge_vin](property/03-pledge_vin.md) — проверка залога и обременений по VIN
- [nspd_cadastr](property/04-nspd_cadastr.md) — получение геоданных и характеристик объекта по кадастровому номеру
- [realty_price](property/05-realty_price.md) — оценка стоимости недвижимости для покупки или аренды

## Общий формат запроса

Отправьте POST на `https://api.newdb.net/v2`:

```json
{
  "params": { "...": "..." },
  "requestId": "3f1f9c4d-6b62-4d72-9c68-2f7b9d1e5a10",
  "webhook": "<url>"
}
```

| Параметр            | Обязательный | Описание                                                                                               |
|---------------------|--------------|--------------------------------------------------------------------------------------------------------|
| **params**          | Да           | Параметры запроса                                                                                      |
| **params.country**  | Да           | Код страны (2 буквы) — ISO 3166-1 alpha-2                                                              |
| **params.method**   | Да           | Метод API                                                                                              |
| **requestId**       | Нет          | UUIDv4 идентификатор запроса. При повторном использовании API вернёт старый результат без нового запроса |
| **webhook**         | Нет          | HTTPS URL, на который NEWDB отправит POST-уведомление при обновлении состояния запроса                  |

Подробная логика синхронного вызова, polling по `requestId` и работы с `webhook` описана в разделе [Примеры вызова API](api-example.md).

## Разделы документации

Используйте левое меню или реестр методов выше для быстрого перехода к нужному методу.


 
