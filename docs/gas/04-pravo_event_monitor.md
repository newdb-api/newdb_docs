---
title: "pravo_event_monitor — онлайн-мониторинг судебного дела (ГАС Правосудие / Мосгорсуд)"
description: "Метод NEWDB pravo_event_monitor для онлайн-мониторинга судебного дела в судах общей юрисдикции: прямой сбор карточки через CDP, формирование базового снимка (snapshot) и вычисление дельты (delta) новых событий и документов."
canonical_url: https://newdb.net/docs/gas/04-pravo_event_monitor/
meta:
  - name: keywords
    content: "NEWDB API, pravo_event_monitor, ГАС Правосудие, Мосгорсуд, СОЮ, мониторинг дела, процессуальный контроль, snapshot, delta, ods_id"
  - property: og:title
    content: "Онлайн-мониторинг дела СОЮ — метод pravo_event_monitor"
  - property: og:description
    content: "Описание метода pravo_event_monitor: онлайн-сбор данных дела СОЮ через CDP браузер, вычисление дельты изменений и триггеры уведомлений."
---

# pravo_event_monitor — Онлайн-мониторинг дела (ГАС Правосудие / Мосгорсуд)

POST `https://api.newdb.net/v2`

Метод **pravo_event_monitor** предназначен для онлайн-мониторинга судебных дел в судах общей юрисдикции РФ (ГАС «Правосудие» и портал судов г. Москвы «Мосгорсуд»).

В отличие от исторического поиска по реестру, метод подключается через управляемый CDP-браузер напрямую к сайту соответствующего суда в режиме реального времени, считывает актуальные вкладки карточки дела, формирует нормализованный **снимок состояния дела (snapshot)** с криптографическими сигнатурами событий и рассчитывает **дельту изменений (delta)** относительно предыдущего состояния.

---

**Раздел:** [ГАС Правосудие](index.md)

## Связанные страницы

- [Обзор раздела ГАС Правосудие](index.md)
- [pravo_cases_details — Детали дела по case_id](01-pravo_cases_details.md)
- [pravo_search — Поиск судебных дел](02-pravo_search.md)
- [kad_event_monitor — Процессуальный контроль арбитражных дел (КАД)](../legal/08-kad_event_monitor.md)

## Специфика адресации и мэтчинга дел в судах общей юрисдикции

Номер дела в СОЮ (например, `2-1234/2025` или `02-17913/2025`) **не является уникальным по РФ** — одинаковые номера могут использоваться в сотнях различных районных и мировых судов.

Для точечного поиска и онлайн-мониторинга метод поддерживает **4 гибких способа мэтчинга дел**:

1. **`case_id`** (рекомендуется) — прямой внутренний идентификатор дела в базе NewDB (`ods.cases.case_id`). Спайдер мгновенно определяет суд и официальную карточку дела. (Для обратной совместимости также принимаются алиасы `ods_id` и `id`).
2. **`unique_case_id` (УИД дела)** — федеральный уникальный идентификатор дела (например, `77RS0014-01-2025-000067-45`). Передаётся в параметре `unique_case_id` или `case_number`. Так как УИД уникален по всей России, система однозначно находит соответствующий суд и карточку дела.
3. **`case_url`** — прямая официальная ссылка на карточку дела на порталах `*.sudrf.ru` или `*.mos-gorsud.ru`.
4. **`court_url` + `case_number`** — официальный URL сайта суда (например, `http://kgvs.klg.sudrf.ru` или `https://mos-gorsud.ru`) вместе с локальным номером дела. Спайдер сам производит поиск по судебному делопроизводству суда.

> [!TIP]
> **Автоматическое хранение снимков (Internal Snapshot Storage):**  
> Метод автоматически сохраняет полученный снимок дела в таблицу `ods.case_monitoring_snapshots`. При последующих вызовах метода клиенту **не обязательно передавать `previous_snapshot`** — спайдер сам извлечет предыдущий снимок из базы NewDB и рассчитает дельту изменений (`delta`), если она возникла. Передача `previous_snapshot` в теле запроса сохраняется как дополнительная возможность для клиентов, хранящих снимки в своей CRM.

---

## Когда использовать

- Постановка дел общей юрисдикции на регулярный мониторинг изменений (новые заседания, определения, решения).
- Автоматический контроль движения споров в районных, городских и военных судах, а также в Мосгорсуде.
- Отслеживание появления новых документов и судебных актов без ручной проверки сайтов судов.
- Интеграция в юридические CRM, боты и системы нотификаций без необходимости локально хранить массивные снимки состояния.

---

## Заголовки

```http
Content-Type: application/json
X-API-KEY: <your_token>
```

---

## Входная схема (request)

```json
{
  "params": {
    "method": "pravo_event_monitor",
    "case_id": "integer, optional (рекомендуется): внутренний ID дела в NewDB",
    "case_number": "string, optional: номер дела в суде или УИД дела",
    "unique_case_id": "string, optional: федеральный уникальный идентификатор дела (УИД)",
    "case_url": "string, optional: прямая официальная ссылка на карточку дела",
    "court_url": "string, optional: официальный URL сайта суда (используется вместе с case_number)",
    "previous_snapshot": "object, optional: предыдущий снимок (если не передан, берется из БД NewDB)",
    "telegram_id": "integer | string, optional: Telegram ID пользователя или чата для мгновенного уведомления",
    "email": "string, optional: Email-адрес для отправки отчета об изменениях",
    "webhook_url": "string, optional: URL для отправки HTTP POST вебхука с дельтой изменений",
    "notify_on_unchanged": "boolean, optional: отправлять уведомление даже если изменений нет, default false",
    "sync_ods": "boolean, optional: точечное обновление базы ODS, default true",
    "country": "ru"
  },
  "webhook": "https://your.host/webhook",
  "requestId": "optional-string"
}
```

### Пояснения к параметрам

| Параметр | Тип | Обязательный | Описание |
| :--- | :--- | :--- | :--- |
| `method` | `string` | **Да** | Должен быть равен `"pravo_event_monitor"`. |
| `case_id` | `integer` | Нет* | Идентификатор дела в NewDB (`ods.cases.case_id`). Алиасы: `ods_id`, `id`. |
| `unique_case_id` | `string` | Нет* | Федеральный уникальный идентификатор дела (УИД, например `77RS0014-01-2025-000067-45`). |
| `case_url` | `string` | Нет* | Прямая ссылка на карточку дела на домене `*.sudrf.ru` или `*.mos-gorsud.ru`. Алиас: `url`. |
| `court_url` | `string` | Нет* | Официальный URL суда. Требуется, если передается обычный `case_number` без `case_url`, `case_id` или `unique_case_id`. |
| `case_number` | `string` | Нет* | Номер дела в суде либо УИД. Алиасы: `delo_case_number`, `case`. |
| `previous_snapshot` | `object` | Нет | Объект предыдущего снимка дела (`snapshot`). Если не передан — автоматически загружается сохраненный снимок из NewDB. |
| `telegram_id` | `integer` \| `string` | Нет | Telegram ID получателя или чата/канала (например `123456789` или `"@channel"`). При обнаружении изменений спайдер отправляет форматированное Markdown-сообщение через Telegram-шлюз NewDB. Алиасы: `tg_id`, `notification_telegram_id`, `chat_id`. |
| `email` | `string` | Нет | Email-адрес для доставки сводки изменений по делу. Алиасы: `notification_email`, `email_to`. |
| `webhook_url` | `string` | Нет | HTTP/HTTPS URL клиентского сервиса. При фиксации дельты спайдер отправляет POST-запрос с JSON-пейлоадом изменений. Алиасы: `webhook`, `callback_url`. |
| `notify_on_unchanged` | `boolean` | Нет | Принудительно отправлять нотификацию в указанные каналы, даже если дельта не содержит изменений. По умолчанию `false`. |
| `sync_ods` | `boolean` | Нет | Точечная синхронизация полученных онлайн-данных в ODS базу NewDB (`ods.cases`, `ods.case_events`, `ods.case_documents`, `ods.case_fields`, `ods.case_parties`, `ods.case_acts`, `ods.case_monitoring_snapshots`). По умолчанию `true`. |
| `country` | `string` | Нет | Код страны, по умолчанию `"ru"`. |

*\*Обязательно указание хотя бы одного из вариантов адресации: `case_id`, `unique_case_id`, `case_url` или пары `court_url` + `case_number`.*

---

## Пример запроса по `case_id`

```json
{
  "params": {
    "method": "pravo_event_monitor",
    "case_id": 250719904,
    "country": "ru"
  },
  "requestId": "pravo-mon-req-001"
}
```

## Пример запроса по УИД (`unique_case_id`)

```json
{
  "params": {
    "method": "pravo_event_monitor",
    "unique_case_id": "77RS0014-01-2025-000067-45",
    "country": "ru"
  },
  "requestId": "pravo-mon-req-uid"
}
```

## Пример запроса по `case_url` с вычислением дельты

```json
{
  "params": {
    "method": "pravo_event_monitor",
    "case_url": "http://kgvs.klg.sudrf.ru/modules.php?name=sud_delo&srv_num=1&name_op=case&case_id=158355598&case_uid=802df7c7-0a6d-4e41-a6bc-c35812de1e25&delo_id=1540005&new=",
    "previous_snapshot": {
      "case_number": "2-33/2025 ~ М-18/2025",
      "events": [
        {
          "Наименование события": "Регистрация иска (заявления, жалобы) в суде",
          "Дата": "06.02.2025",
          "signature": "b3a54992f711ea0aebaf45f244e1e31343f8c329a3b1147eea69c3725ddef64a"
        }
      ],
      "documents": []
    }
  },
  "requestId": "pravo-mon-req-002"
}
```

---

## Пример ответа

```json
{
  "params": {
    "method": "pravo_event_monitor",
    "ods_id": 250719904,
    "country": "ru"
  },
  "requestId": "pravo-mon-req-001",
  "datecreated": "2026-09-04 13:40:50",
  "state": "complete",
  "tasks": 1,
  "results": {
    "pravo_event_monitor": {
      "taskId": "task-pravo-mon-123",
      "dateupdated": "2026-09-04 13:40:55",
      "result": {
        "status": 200,
        "meta": {
          "source_mode": "online",
          "candidates_checked": 1,
          "matches": 1
        },
        "data": [
          {
            "found": true,
            "resolution": "ods_id",
            "snapshot": {
              "source_mode": "online",
              "court_url": "http://kgvs.klg.sudrf.ru",
              "case_url": "http://kgvs.klg.sudrf.ru/modules.php?name=sud_delo&srv_num=1&name_op=case&case_id=158355598...",
              "case_number": "ДЕЛО № 2-33/2025 ~ М-18/2025",
              "fields": [
                {"name": "Судья", "value": "Иванов И.И."},
                {"name": "Категория дела", "value": "О взыскании сумм по договору займа"}
              ],
              "events": [
                {
                  "Наименование события": "Судебное заседание",
                  "Дата": "04.09.2026",
                  "Время": "10:00",
                  "Результат события": "Вынесено решение",
                  "signature": "c92b8344e18d..."
                },
                {
                  "Наименование события": "Регистрация иска (заявления, жалобы) в суде",
                  "Дата": "06.02.2025",
                  "Время": "11:35",
                  "signature": "b3a54992f711ea0aebaf45f244e1e31343f8c329a3b1147eea69c3725ddef64a"
                }
              ],
              "documents": [
                {
                  "Наименование документа": "Решение суда",
                  "Дата": "04.09.2026",
                  "signature": "81f1807d..."
                }
              ],
              "metrics": {
                "events_count": 2,
                "documents_count": 1
              }
            },
            "delta": {
              "has_previous_snapshot": true,
              "changed": true,
              "summary": "Новые события: 1, новые документы: 1.",
              "changes": [
                {
                  "field": "events",
                  "added": [
                    {
                      "Наименование события": "Судебное заседание",
                      "Дата": "04.09.2026",
                      "Время": "10:00",
                      "Результат события": "Вынесено решение",
                      "signature": "c92b8344e18d..."
                    }
                  ]
                },
                {
                  "field": "documents",
                  "added": [
                    {
                      "Наименование документа": "Решение суда",
                      "Дата": "04.09.2026",
                      "signature": "81f1807d..."
                    }
                  ]
                }
              ]
            },
            "notification_event": {
              "event_type": "court_case_changed",
              "should_notify": true,
              "summary": "Новые события: 1, новые документы: 1.",
              "channels_supported": ["email", "telegram", "webhook"],
              "configured_destinations": {
                "telegram_id": "987654321",
                "email": "lawyer@example.com",
                "webhook_url": "https://your.host/webhook"
              },
              "dispatch_status": "sent",
              "dispatch_results": {
                "telegram": {"status": "sent", "http_code": 200},
                "webhook": {"status": "sent", "http_code": 200},
                "email": {"status": "sent", "info": "Email delivered"}
              }
            }
          }
        ]
      }
    }
  }
}
```

---

## Структура ключевых блоков

### 1. `snapshot` (Актуальный снимок дела)
- Содержит точные реквизиты (`court_url`, `case_url`, `case_number`), набор извлеченных полей (`fields`), список всех событий движения дела (`events`) и список документов (`documents`).
- Каждое событие и документ снабжены детерминированной SHA-256 сигнатурой (`signature`), исключающей влияние порядка сериализации или служебных временных меток.

### 2. `delta` (Расчет изменений)
- `has_previous_snapshot`: `true` если в запросе был передан `previous_snapshot` или найден в базе NewDB.
- `changed`: флаг наличия изменений (`true` / `false`).
- `summary`: краткая текстовая сводка изменений (например, `"Новые события: 2, новые документы: 1."`).
- `changes`: детальный список добавленных объектов (`added`) или измененных реквизитов.

### 3. `notification_event` (Маршрутизация и доставка уведомлений)
- `should_notify`: флаг необходимости отправки уведомления клиенту (`true` если в `delta` есть фактические изменения или задан `notify_on_unchanged`).
- `event_type`: тип события (`court_case_changed`, `court_case_unchanged`, `court_case_not_found`).
- `channels_supported`: поддерживаемые каналы отправки (`email`, `telegram`, `webhook`).
- `configured_destinations`: переданные в запросе адресаты (`telegram_id`, `email`, `webhook_url`).
- `dispatch_status`: итоговый статус отправки (`sent`, `partial_or_failed`, `pending`, `skipped`, `not_configured`).
- `dispatch_results`: детализированный статус отправки по каждому настроенному каналу (HTTP-код вебхука, статус отправки в Telegram/SMTP).

---

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "pravo_event_monitor",
  "intent": "Онлайн-мониторинг событий и документов дела в судах общей юрисдикции РФ (ГАС Правосудие, Мосгорсуд)",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields_one_of": [
    ["ods_id"],
    ["case_url"],
    ["court_url", "case_number"]
  ],
  "optional_fields": ["previous_snapshot", "country", "requestId", "webhook"],
  "returns": [
    "state",
    "results.pravo_event_monitor.result.status",
    "results.pravo_event_monitor.result.meta.source_mode",
    "results.pravo_event_monitor.result.data[0].found",
    "results.pravo_event_monitor.result.data[0].resolution",
    "results.pravo_event_monitor.result.data[0].snapshot",
    "results.pravo_event_monitor.result.data[0].delta",
    "results.pravo_event_monitor.result.data[0].notification_event"
  ]
}
```

</details>
