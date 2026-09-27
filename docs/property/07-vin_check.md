---
title: "vin_check — Проверка транспортного средства по VIN (Госуслуги)"
description: "Метод NEWDB vin_check проверяет сведения о ТС через Госуслуги: нахождение в розыске, ограничения на регистрацию, залоги в ФНП, розыск ПТС и технические данные."
canonical_url: https://newdb.net/docs/property/07-vin_check/
meta:
  - name: keywords
    content: "NEWDB API, vin_check, проверка авто, проверка по VIN, розыск авто, ограничения гибдд, залог фнп, госуслуги авто"
  - property: og:title
    content: "Проверка авто по VIN (Госуслуги) — метод vin_check"
  - property: og:description
    content: "Комплексная проверка автомобиля по VIN через Госуслуги: розыск, ограничения, залоги в нотариальной палате, розыск ПТС и технические характеристики."
---

# vin_check — Проверка транспортного средства по VIN (Госуслуги)

POST `https://api.newdb.net/v2`

Метод выполняет официальную онлайн-проверку транспортного средства через форму портала Госуслуг ([gosuslugi.ru/600308/1/form](https://www.gosuslugi.ru/600308/1/form)).

Метод в режиме реального времени проверяет:

1. **Юридическая чистота и розыск**:
   - Нахождение в розыске (`is_wanted`, `wanted_text`);
   - Розыск ПТС и специальной продукции (`has_pts_wanted`, `wanted_pts_text`).
2. **Ограничения на регистрационные действия**:
   - Наличие запретов и ограничений ГИБДД/ФССП (`has_restrictions`, `restrictions_text`, `restrictions_details`).
3. **Проверка в Федеральной нотариальной палате (ФНП)**:
   - Нахождение ТС в залоге (`is_pledged`, `pledge_text`, `pledge_details`).
4. **Технические данные и идентификация**:
   - VIN, номер кузова/кабины, номер шасси/рамы, марка, модель, год выпуска, цвет, мощность двигателя (л.с. и кВт), объем двигателя, категория ТС, экологический класс, масса.
5. **Ссылка на официальный отчет Госуслуг** (`report_url`).

---

**Раздел:** [Имущество](index.md)

## Связанные страницы

- [Обзор раздела имущество](index.md)
- [pledge_vin — Проверка залога по VIN (ФНП + Федресурс)](03-pledge_vin.md)
- [pledge_property — Проверка залога и обременений по ID (ФНП + Федресурс)](02-pledge_property.md)
- [nspd_cadastr — Получение геоданных по кадастровому номеру](04-nspd_cadastr.md)

---

## Когда использовать

- Комплексная проверка автомобиля перед покупкой, сделкой или автокредитованием.
- Проверка юридической чистоты ТС (отсутствие розыска, ограничений и залогов).
- Проверка залога в реестре Федеральной нотариальной палаты.
- Обогащение карточки транспортного средства техническими характеристиками из базы Госавтоинспекции.

---

## Заголовки

```text
Content-Type: application/json
X-API-KEY: <your_token>
```

---

## Параметры запроса

| Поле | Тип | Обязательный | Описание |
| :--- | :--- | :--- | :--- |
| `vin` | `string` | **Да** | 17-значный идентификационный номер ТС (VIN). Также допускается номер кузова или шасси. |
| `get_screen` | `integer` | Нет | `1` — сделать снимок экрана отчета Госуслуг и вернуть защищенную ссылку на скриншот. `0` — без скриншота (по умолчанию). |

---

## Примеры запросов

### cURL

```bash
curl -X POST https://api.newdb.net/v2 \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: YOUR_TOKEN" \
  -d '{
    "method": "vin_check",
    "params": {
      "vin": "X4XWY39460L583993",
      "get_screen": 0
    }
  }'
```

### Python

```python
import requests

url = "https://api.newdb.net/v2"
headers = {
    "Content-Type": "application/json",
    "X-API-KEY": "YOUR_TOKEN"
}
payload = {
    "method": "vin_check",
    "params": {
        "vin": "X4XWY39460L583993",
        "get_screen": 1
    }
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())
```

### Node.js

```javascript
import axios from 'axios';

const response = await axios.post('https://api.newdb.net/v2', {
  method: 'vin_check',
  params: {
    vin: 'X4XWY39460L583993',
    get_screen: 0
  }
}, {
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': 'YOUR_TOKEN'
  }
});

console.log(response.data);
```

---

## Пример успешного ответа (Транспортное средство проверено)

```json
{
  "status": "success",
  "results": {
    "vin_check": {
      "taskId": "72091c53-b3c4-4061-9c60-84a2f816cb10",
      "dateupdated": "2026-09-13 22:15:40",
      "result": {
        "status": 200,
        "found": true,
        "data": [
          {
            "vin": "X4XWY39460L583993",
            "body_number": "X4XWY39460L583993",
            "chassis_number": null,
            "brand_model": "BMW X3",
            "year": "2020",
            "color": "Черный",
            "category": "B",
            "power_hp": "190",
            "power_kw": "140",
            "engine_volume": "1995",
            "engine_type": "Дизельный",
            "eco_class": "Пятый",
            "max_weight": "2420",
            "curb_weight": "1825",
            "is_wanted": false,
            "wanted_text": "Нет",
            "has_restrictions": false,
            "restrictions_text": "Нет",
            "restrictions_details": [],
            "has_pts_wanted": false,
            "wanted_pts_text": "Нет",
            "is_pledged": false,
            "pledge_text": "Нет",
            "pledge_details": [],
            "report_url": "https://www.gosuslugi.ru/600308/1/form?external&screenId=s3&q1=X4XWY39460L583993&l1=",
            "raw_sections": {
              "technical_data": {
                "Идентификационный номер (VIN)": "X4XWY39460L583993",
                "Номер кузова (кабины)": "X4XWY39460L583993"
              },
              "legal_clean": {
                "В розыске": "Нет",
                "Ограничения на регистрацию": "Нет",
                "Розыск ПТС": "Нет"
              },
              "fnp_notary": {
                "Находится в залоге": "Нет"
              }
            }
          }
        ]
      }
    }
  },
  "dateupdated": "2026-09-13 22:15:40"
}
```

---

## Пример ответа при обнаружении розыска, ограничений или залога

```json
{
  "status": "success",
  "results": {
    "vin_check": {
      "taskId": "72091c53-b3c4-4061-9c60-84a2f816cb11",
      "dateupdated": "2026-09-13 22:15:40",
      "result": {
        "status": 200,
        "found": true,
        "data": [
          {
            "vin": "X4XWY39460L583993",
            "body_number": "X4XWY39460L583993",
            "chassis_number": null,
            "brand_model": "BMW X3",
            "year": "2020",
            "color": "Черный",
            "is_wanted": true,
            "wanted_text": "Да",
            "has_restrictions": true,
            "restrictions_text": "Запрет на регистрационные действия",
            "restrictions_details": [
              {
                "RestrictionType": "Запрет на регистрационные действия",
                "GIBDDDepart": "ОСП по ЦАО г. Москвы",
                "RestrictionDate": "15.02.2024"
              }
            ],
            "has_pts_wanted": false,
            "wanted_pts_text": "Нет",
            "is_pledged": true,
            "pledge_text": "Находится в залоге",
            "pledge_details": [
              {
                "PledgeNumber": "2023-004-981723-112",
                "PledgeDate": "10.11.2023"
              }
            ],
            "report_url": "https://www.gosuslugi.ru/600308/1/form?external&screenId=s3&q1=X4XWY39460L583993&l1="
          }
        ]
      }
    }
  },
  "dateupdated": "2026-09-13 22:15:40"
}
```

---

## Пример ответа, если ТС не найдено

```json
{
  "status": "success",
  "results": {
    "vin_check": {
      "taskId": "72091c53-b3c4-4061-9c60-84a2f816cb12",
      "dateupdated": "2026-09-13 22:15:40",
      "result": {
        "status": 200,
        "found": false,
        "data": [],
        "message": "Сведения о ТС не найдены"
      }
    }
  },
  "dateupdated": "2026-09-13 22:15:40"
}
```

---

## Коды ответов

| Код | Описание |
| :--- | :--- |
| `200` | Запрос успешно обработан, результат проверки в `data`. |
| `400` | Ошибка валидации (например, пустой или некорректный VIN). |
| `401` | Неверный или отсутствующий API-ключ `X-API-KEY`. |
| `402` | Недостаточно баланса на аккаунте. |
| `500` | Внутренняя ошибка сервиса или недоступность портала Госуслуг. |
| `503` | Временное ограничение частоты обращений к порталу Госуслуг. |
