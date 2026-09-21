---
title: "Официальные SDK для NewDB API (Python, Node.js, PHP)"
description: "Официальные библиотеки и SDK для быстрой интеграции с REST API NEWDB на Python, TypeScript / Node.js и PHP."
canonical_url: https://newdb.net/docs/sdk/
---

# Официальные SDK NewDB

Для быстрой и надежной интеграции с REST API NEWDB разработаны официальные клиентские библиотеки с полной типизацией методов, поддержкой асинхронности и автоматического ожидания результатов.

---

## 1. Python SDK (`newdb`)

[![PyPI](https://img.shields.io/badge/PyPI-newdb-blue.svg)](https://github.com/newdb-api/newdb-python)
[![Python](https://img.shields.io/badge/Python-3.9%2B-brightgreen.svg)](https://python.org)

Официальный SDK с поддержкой синхронного (`NewDBClient`) и асинхронного (`AsyncNewDBClient`) режимов на базе `httpx`.

### Установка
```bash
pip install newdb
```

### Пример использования
```python
from newdb import NewDBClient

client = NewDBClient(api_key="your_api_key")

# 1. Проверка действительности паспорта РФ (МВД)
passport = client.person.check_passport_mvd(
    seria="4510",
    number="123456",
    firstname="Иван",
    lastname="Иванов"
)
print(passport.results)

# 2. Комплексная проверка организации по ИНН с авто-ожиданием
company_task = client.legal.complex_check(inn="7707083893")
completed = client.wait_for_result(company_task.request_id, timeout=60)
print(completed.results)

# 3. Скачать PDF-отчет по завершенной проверке
pdf = client.generate_report(completed.request_id, format="pdf")
with open("company-report.pdf", "wb") as report_file:
    report_file.write(pdf)

# 4. Работа в тестовом контуре (Sandbox) без списания баланса
test_client = NewDBClient(test_mode=True)
test_res = test_client.person.check_passport_mvd(seria="4510", number="123456", firstname="Иван", lastname="Иванов")
print(test_res.results)
```

> [!TIP]
> Подробнее о тестовом контуре и синтетических данных читайте в разделе [Тестовый контур (Sandbox)](test-api.md).

[Репозиторий на GitHub &rarr;](https://github.com/newdb-api/newdb-python)

---

## 2. Node.js & TypeScript SDK (`@newdb/sdk`)

[![npm](https://img.shields.io/badge/npm-@newdb/sdk-red.svg)](https://github.com/newdb-api/newdb-node)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue.svg)](https://typescriptlang.org)

Библиотека без внешних зависимостей (zero-dependency) на нативном `fetch` с полными `.d.ts` тайпингами.

### Установка
```bash
npm install @newdb/sdk
```

### Пример использования
```typescript
import { NewDBClient } from '@newdb/sdk';

const client = new NewDBClient({ apiKey: 'your_api_key' });

async function run() {
  const task = await client.person.checkFssp({
    firstname: 'Иван',
    lastname: 'Иванов',
    dob: '1990-01-01',
    regioncode: '77'
  });
  
  const result = await client.waitForResult(task.requestId);
  console.log(result.results);

  const report = await client.generateReport(task.requestId, 'pdf');
  // Node.js: сохраните Buffer.from(report) в файл или передайте дальше.

  // Тестовый режим без списания баланса:
  const testClient = new NewDBClient({ testMode: true });
  const testRes = await testClient.person.checkPassportMvd({ seria: '4510', number: '123456', firstname: 'Иван', lastname: 'Иванов' });
  console.log('Sandbox:', testRes.results);
}
run();
```

[Репозиторий на GitHub &rarr;](https://github.com/newdb-api/newdb-node)

---

## 3. PHP SDK (`newdb/sdk`)

[![Composer](https://img.shields.io/badge/Packagist-newdb/sdk-orange.svg)](https://github.com/newdb-api/newdb-php)
[![PHP](https://img.shields.io/badge/PHP-8.1%2B-blueviolet.svg)](https://php.net)

Composer-пакет со строгой типизацией для PHP 8.1+.

### Установка
```bash
composer require newdb/sdk
```

### Пример использования
```php
<?php

require_once __DIR__ . '/vendor/autoload.php';

use NewDB\Client;

$client = new Client('your_api_key');

$passport = $client->checkPassportMvd('4510', '123456', 'Иван', 'Иванов');
print_r($passport);

// Метод возвращает бинарное содержимое HTML/PDF-файла.
$pdf = $client->generateReport('00000000-0000-4000-8000-000000000101', 'pdf');
file_put_contents('person-report.pdf', $pdf);

// Тестовый режим без списания баланса:
$testClient = new Client(testMode: true);
$testRes = $testClient->checkPassportMvd('4510', '123456', 'Иван', 'Иванов');
print_r($testRes);
```

[Репозиторий на GitHub &rarr;](https://github.com/newdb-api/newdb-php)

Подробнее об одиночных и агрегированных отчетах: [Отчеты по комплексным проверкам](reports.md).
