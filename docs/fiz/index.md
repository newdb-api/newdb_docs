П---
title: "Физические лица — методы NEWDB"
description: "Обзор методов NEWDB для проверки физических лиц: ФССП, ФНС, паспорт, банкротство, залоги, арбитраж, ИП и специальные реестры."
canonical_url: https://newdb.net/docs/fiz/
meta:
  - name: keywords
    content: "NEWDB API, физлица, ФССП, ФНС, банкротство, паспорт, ИП"
  - property: og:title
    content: "Физические лица — методы NEWDB"
  - property: og:description
    content: "Реестр методов NEWDB для проверки физических лиц по ФИО, паспорту и ИНН."
---

# Физические лица

Раздел содержит методы NEWDB для проверки физических лиц по ФИО, дате рождения, паспортным данным и ИНН.

## Доступные методы

- [fssp_person](01-fssp_person.md) — исполнительные производства ФССП
- [passport_fns](02-passport_fns.md) — проверка паспорта и получение ИНН через ФНС
- [passport_mvd](03-passport_mvd.md) — проверка паспорта РФ на действительность
- [complex_by_passport](04-complex_by_passport.md) — комплексная проверка по паспорту
- [bankrot_person](05-fedresurs_bankrot.md) — банкротство физлица или ИП через Федресурс
- [pledge_person](06-pledge_person.md) — залоги и обременения по физлицу
- [arbitr_person](07-arbitr_person.md) — арбитражные дела физлица в КАД
- [nalog_debt](08-nalog_debt.md) — налоговая задолженность по ИНН
- [elmk_registry](09-elmk_registry.md) — статус электронной медицинской книжки
- [fns_block_person](10-fns_block_person.md) — блокировки счетов физлица по данным ФНС
- [egrul_ip](11-egrul_ip.md) — сведения ЕГРИП и статус ИП
- [terrorist](12-terrorist.md) — проверка по перечням терроризма, экстремизма и ОМУ
- [mvd_wanted](13-mvd_wanted.md) — проверка физлица в розыске МВД
- [inoagent](14-inoagent.md) — проверка физлица в реестре иностранных агентов Минюста
