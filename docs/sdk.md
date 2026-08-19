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
```

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
```

[Репозиторий на GitHub &rarr;](https://github.com/newdb-api/newdb-php)
