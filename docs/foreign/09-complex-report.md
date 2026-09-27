---
title: "Комплексный отчет по иностранному гражданину"
description: "Объединение результатов РКЛ, ВНЖ, патентов, РВП и разрешения на работу в единый HTML/PDF-отчет NEWDB."
canonical_url: https://newdb.net/docs/foreign/09-complex-report/
---

# Комплексный отчет по иностранному гражданину

Это агрегирование уже завершенных миграционных проверок, а не отдельный платный метод. Генерация файла не списывает баланс повторно.

Поддерживаются `rkl`, `foreign_vng`, `foreign_patent`, `patent_msk`, `patent_mo`, `foreign_rvp_stamp`, `foreign_rvp_blank` и `foreign_rnr`.

[Открыть интерактивный пример](https://newdb.net/examples/complex-foreign-report)

```bash
curl --request POST \
  --url 'https://api.newdb.net/v2/report' \
  --header 'Content-Type: application/json' \
  --header 'X-API-KEY: YOUR_API_KEY' \
  --data '{
    "requestIds": [
      "00000000-0000-4000-8000-000000000101",
      "00000000-0000-4000-8000-000000000102"
    ],
    "report_type": "complex_foreign",
    "format": "html"
  }' \
  --output foreign-report.html
```

Все запросы должны принадлежать одному API-ключу и иметь состояние `complete`. Подробнее: [API отчетов](../reports.md).

