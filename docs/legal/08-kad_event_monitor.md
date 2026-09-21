---
title: "kad_event_monitor — процессуальный контроль дела КАД"
description: "Метод NEWDB kad_event_monitor для непрерывного мониторинга арбитражного дела: снимок (snapshot), хронология событий, риски, дельта изменений и рекомендации."
canonical_url: https://newdb.net/docs/legal/08-kad_event_monitor/
meta:
  - name: keywords
    content: "NEWDB API, kad_event_monitor, арбитраж, КАД, мониторинг дела, процессуальный контроль, арбитражный суд, snapshot, delta"
  - property: og:title
    content: "Процессуальный контроль дела КАД — метод kad_event_monitor"
  - property: og:description
    content: "Описание метода kad_event_monitor: автоматический контроль стадий, перерывов, заседаний, судебных актов, дельты изменений и рисков арбитражного дела."
---

# kad_event_monitor — Процессуальный контроль дела (КАД)

POST `https://api.newdb.net/v2`

Метод **kad_event_monitor** выполняет специализированный процессуальный мониторинг конкретного арбитражного дела по его номеру в КАД (`kad.arbitr.ru`). 

В отличие от общего поиска дел по ИНН, метод формирует детальный **снимок состояния дела (snapshot)**, извлекает и классифицирует процессуальные события (перерывы в заседаниях, отложения, обеспечительные меры, истребование доказательств, апелляции), вычисляет процессуальные риски, строит практические рекомендации для юриста и рассчитывает **дельту изменений (delta)** относительно предыдущего снимка.

---

**Раздел:** [Юридические лица](index.md)

## Связанные страницы

- [Обзор раздела юридические лица](index.md)
- [arbitr_legal — Проверка арбитражных дел юрлиц (КАД)](01-arbitr_legal.md)
- [arbitr_person — Арбитражные дела физлиц (КАД)](../fiz/07-arbitr_person.md)
- [pravo_search — Поиск дел в судах общей юрисдикции (ГАС Правосудие)](../gas/02-pravo_search.md)

## Когда использовать

- Постановка ключевых арбитражных споров компании на регулярный автоматический контроль
- Отслеживание критичных событий: назначение даты продолжения после перерыва, вынесение определений об оставлении без движения, принятие обеспечительных мер
- Автоматическое выявление новых документов и заседаний через передачу `previous_snapshot` (расчет дельты)
- Формирование оперативных сводок и рекомендаций для юридического отдела

## Типовые кейсы

- **Ежедневный комплаенс арбитражных процессов:** вызов метода по расписанию для отслеживания новых актов и заседаний.
- **Предотвращение пропуска сроков:** автоматический сигнал при оставлении заявления без движения или объявлении перерыва.
- **Интеграция в CRM/ERP и юридические боты:** получение структурированных событий и готового AI-резюме по спору.

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
    "method": "kad_event_monitor",
    "case_number": "string, обязательный, номер дела в КАД",
    "country": "ru",
    "previous_snapshot": "object, optional, предыдущий объект snapshot для вычисления дельты",
    "openai_interpretation": "integer, optional (1 или 0), включение расширенной AI-интерпретации, default 1"
  },
  "webhook": "https://your.host/webhook",
  "requestId": "optional-string"
}
```

### Пояснения к полям

- `method` — значение `kad_event_monitor`.
- `case_number` — номер арбитражного дела (например, `"А40-123456/2024"`, `"А56-795/2024"`). Также поддерживаются алиасы `delo_case_number`, `case`, `num_case`.
- `country` — код страны (`"ru"`).
- `previous_snapshot` — *(опционально)* объект снимка состояния дела, полученный в предыдущей проверке. При передаче метод выполняет автоматическую сверку и возвращает список добавленных событий и изменившихся полей в блоке `delta`.
- `openai_interpretation` — *(опционально)* флаг включения расширенного аналитического заключения от ИИ (`1` — включено, `0` — выключено).

---

## Пример запроса

```json
{
  "params": {
    "method": "kad_event_monitor",
    "case_number": "А56-795/2024",
    "country": "ru",
    "openai_interpretation": 1
  },
  "requestId": "f83a0011-8022-4091-8abc-000000000001"
}
```

---

## Пример ответа

```json
{
  "params": {
    "method": "kad_event_monitor",
    "case_number": "А56-795/2024",
    "country": "ru",
    "openai_interpretation": 1,
    "newdb_qid": "EP0iIP63yfbLMygA"
  },
  "requestId": "f83a0011-8022-4091-8abc-000000000001",
  "datecreated": "2026-08-27 11:34:20",
  "state": "complete",
  "balance": 9800,
  "tasks": 1,
  "is_repeat": false,
  "results": {
    "kad_event_monitor": {
      "taskId": "task-kad-monitor-001",
      "dateupdated": "2026-08-27 11:35:05",
      "result": {
        "status": 200,
        "data": [
          {
            "query_case_number": "А56-795/2024",
            "found": true,
            "snapshot": {
              "case_number": "А56-795/2024",
              "status": "АС города Санкт-Петербурга и Ленинградской области",
              "source_url": "https://kad.arbitr.ru/Card/e55e8888-fd43-486b-b9ee-50b64f3dddbd",
              "latest_act": {
                "date": "15.01.2024",
                "type": "Решение",
                "signature": "15.01.2024|решение"
              },
              "next_calendar_event": null,
              "process_events": [
                {
                  "source": "act",
                  "date": "15.01.2024",
                  "title": "Решение суда первой инстанции",
                  "result": "Иск удовлетворен полностью",
                  "link": "https://kad.arbitr.ru/Document/Pdf/...",
                  "event_type": "decision_or_ruling",
                  "risk": "medium",
                  "recommended_action": "Проверить дату изготовления акта и сроки обжалования.",
                  "signature": "15.01.2024|решение суда первой инстанции"
                }
              ],
              "metrics": {
                "acts_count": 6,
                "calendar_events_count": 4,
                "electronic_case_files_count": 12,
                "actionable_events_count": 2,
                "high_risk_events_count": 0,
                "hearing_breaks_count": 0,
                "participants_count": 4,
                "has_pdf_ai_analysis": true
              }
            },
            "metrics": {
              "acts_count": 6,
              "calendar_events_count": 4,
              "electronic_case_files_count": 12,
              "actionable_events_count": 2,
              "high_risk_events_count": 0,
              "hearing_breaks_count": 0,
              "participants_count": 4,
              "has_pdf_ai_analysis": true
            },
            "interpretation": {
              "scope": "processual_control_only",
              "risk_level": "medium",
              "summary": "По делу А56-795/2024 есть процессуально значимые события для планового контроля.",
              "limitations": "Интерпретация построена только по данным карточки КАД и не заменяет анализ полного текста судебных актов юристом."
            },
            "recommended_actions": [
              {
                "event_type": "decision_or_ruling",
                "risk": "medium",
                "date": "15.01.2024",
                "action": "Проверить дату изготовления акта и сроки обжалования."
              }
            ],
            "delta": {
              "has_previous_snapshot": false,
              "changed": false,
              "summary": "Предыдущий снимок не передан; сформирован базовый снимок для следующего сравнения.",
              "changes": []
            },
            "ai_interpretation": {
              "risk_level": "medium",
              "summary": "Судебный акт первой инстанции вынесен в пользу истца. Требуется контроль срока подачи апелляционной жалобы.",
              "key_findings": [
                "Вынесено итоговое решение суда первой инстанции",
                "Заседаний на будущие даты не назначено"
              ],
              "recommended_actions": [
                "Отслеживать вступление решения в законную силу",
                "Контролировать подачу апелляционных жалоб ответчиком"
              ],
              "deadlines_or_dates": [
                "Срок подачи апелляционной жалобы — 1 месяц со дня изготовления решения в полном объеме"
              ],
              "delta_summary": "Базовый снимок состояния дела",
              "confidence": 0.95,
              "limitations": "Анализ произведен на основании открытых данных карточки дела КАД"
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

### 1. `snapshot` (Снимок дела)
- Содержит текущий номер дела, суд, ссылку на карточку `kad.arbitr.ru`, последний судебный акт (`latest_act`), ближайшее заседание (`next_calendar_event`), полный реестр классифицированных событий (`process_events`) и агрегированные счетчики (`metrics`).

### 2. `process_events` (Процессуальные события)
Каждое событие размечается категорией и уровнем процессуального риска:
- `event_type`:
  - `hearing_break` — перерыв в судебном заседании (высокий приоритет: продолжение через несколько дней);
  - `adjournment` — отложение судебного разбирательства;
  - `claim_left_without_motion` — оставление иска без движения (риск возврата документов);
  - `interim_measures` — обеспечительные меры (аресты, запреты);
  - `evidence_request` — истребование доказательств судом;
  - `appeal_or_cassation` — обжалование (апелляция/кассация);
  - `decision_or_ruling` — вынесение решения или определения;
  - `informational` — стандартные процессуальные действия.
- `risk`: `"low"`, `"medium"`, `"high"`.
- `recommended_action`: практическая подсказка для юриста.

### 3. `delta` (Разница относительно предыдущего снимка)
- `changed`: булево значение (`true` / `false`), сигнализирующее о наличии изменений.
- `changes`: список измененных полей (новые события `process_events`, сменившийся статус, новый судебный акт).

### 4. `ai_interpretation` (Юридическое резюме от ИИ)
- Структурированный вывод GPT-анализа: `risk_level`, `summary`, `key_findings`, `recommended_actions`, `deadlines_or_dates`.

---

## AI Summary

<details>
<summary>Компактные метаданные для AI и агентных систем</summary>

```json
{
  "method": "kad_event_monitor",
  "intent": "Процессуальный контроль и мониторинг изменений по конкретному арбитражному делу КАД",
  "endpoint": "POST https://api.newdb.net/v2",
  "required_headers": ["X-API-KEY"],
  "required_fields": ["method", "case_number", "country"],
  "optional_fields": ["previous_snapshot", "openai_interpretation", "requestId", "webhook"],
  "returns": [
    "state",
    "results.kad_event_monitor.result.status",
    "results.kad_event_monitor.result.data[0].found",
    "results.kad_event_monitor.result.data[0].snapshot",
    "results.kad_event_monitor.result.data[0].metrics",
    "results.kad_event_monitor.result.data[0].interpretation",
    "results.kad_event_monitor.result.data[0].recommended_actions",
    "results.kad_event_monitor.result.data[0].delta",
    "results.kad_event_monitor.result.data[0].ai_interpretation"
  ]
}
```

</details>
