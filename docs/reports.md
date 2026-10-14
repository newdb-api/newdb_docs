---
title: "Отчеты по комплексным проверкам — HTML и PDF"
description: "Генерация HTML- и PDF-отчетов NEWDB по завершенным комплексным проверкам физических лиц, компаний, недвижимости и иностранных граждан."
canonical_url: https://newdb.net/docs/reports/
---

# Отчеты по комплексным проверкам

API отчетов преобразует завершенные результаты NEWDB в документ с исходными данными, сводкой источников, факторами риска, заключением и рекомендациями. Генерация не запускает проверки повторно и не списывает баланс.

| `report_type` | Исходные проверки | Пример |
| --- | --- | --- |
| `complex_by_passport` | Комплексная проверка физлица | [Открыть](https://newdb.net/examples/complex-passport-report) |
| `complex_by_inn` | Комплексная проверка компании | [Открыть](https://newdb.net/examples/complex-company-report) |
| `realty_price` | Комплексная оценка недвижимости | [Открыть](https://newdb.net/examples/complex-realty-report) |
| `complex_foreign` | РКЛ, ВНЖ, патенты, РВП и РНР | [Открыть](https://newdb.net/examples/complex-foreign-report) |

## Отчет по одному запросу

```bash
curl --request GET \
  --url 'https://api.newdb.net/v2/report?requestId=00000000-0000-4000-8000-000000000101&format=pdf' \
  --header 'X-API-KEY: YOUR_API_KEY' \
  --output report.pdf
```

| Поле | Обязательное | Описание |
| --- | --- | --- |
| `requestId` | Да | UUID завершенного запроса, принадлежащего API-ключу. |
| `format` | Нет | `html` (по умолчанию) или `pdf`. |
| `report_type` | Нет | Явный тип отчета; обычно определяется автоматически. |

## Агрегированный отчет иностранного гражданина

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

Можно объединить от 1 до 20 завершенных результатов `rkl`, `foreign_vng`, `foreign_patent`, `patent_msk`, `patent_mo`, `foreign_rvp_stamp`, `foreign_rvp_blank` и `foreign_rnr`.

## Ответ и ошибки

Успешный ответ имеет `Content-Type: text/html; charset=utf-8` или `application/pdf`, `Content-Disposition: attachment` и `Cache-Control: private, no-store`.

| HTTP | Причина |
| --- | --- |
| `400` | Нет идентификатора, превышен лимит или неверный формат. |
| `401` | Недействительный `X-API-KEY`. |
| `404` | Запрос не найден либо принадлежит другому пользователю. |
| `409` | Проверка еще не завершена. |
| `422` | Метод или набор результатов не поддерживается. |
| `503` | PDF-рендерер временно недоступен. |

!!! note "Актуальность"
    Отчет фиксирует состояние источников на момент исходных запросов. Повторное скачивание не обновляет данные.

