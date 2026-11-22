# opensource_AI-TEAM

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/skills-1230-brightgreen.svg)](skills)
[![Agents](https://img.shields.io/badge/agents-72-blue.svg)](agents)
[![Commands](https://img.shields.io/badge/commands-99-lightgrey.svg)](commands)
[![Node](https://img.shields.io/badge/node-%3E%3D18-informational.svg)](package.json)

**Bahasa:** [English](README.md) | [简体中文](README.zh-CN.md) | [Bahasa Indonesia](README.id.md)

Kumpulan **agent, skill, dan command** untuk AI coding harness — dibangun di atas
[ECC](https://github.com/affaan-m/ecc) (agent harness operating system) dan diperluas
dengan paket skill keamanan serta red-team.

Repo ini berisi:

| Komponen | Jumlah | Lokasi |
|---|---|---|
| Skill | **1230** | `skills/` — tiap skill adalah direktori berisi `SKILL.md` berfrontmatter |
| Agent | **72** | `agents/` — subagent khusus per domain (planner, reviewer, build resolver, dll.) |
| Command | **99** | `commands/` — slash command kompatibilitas |
| Hook | — | `hooks/` — otomasi berbasis trigger |
| Rules | — | `rules/` — pedoman wajib (umum + per bahasa) |
| Server MCP | 37 | `mcp-configs/mcp-servers.json` — satu file definisi server |

## Paket skill

Selain skill inti ECC, repo ini menyertakan tiga paket skill eksternal yang diimpor
sebagai skill default (total 902 skill tambahan):

- **Claude-BugHunter** (83 skill) — bug hunting dan web/app security testing
- **security-audit-skill** (1 skill) — alur audit keamanan menyeluruh
- **Anthropic-Cybersecurity-Skills** (818 skill) — perpustakaan besar skill keamanan:
  forensik, malware analysis, threat hunting, cloud/AD security, DFIR, compliance,
  exploit analysis, dan red-team tradecraft

Skill keamanan/red-team hanya untuk pengujian yang sah dan diizinkan (authorized
security testing). Lihat `SECURITY.md`.

## Mulai cepat

Prasyarat: **Node.js >= 18** (disarankan 22+) dan `yarn@4.9.2` (via corepack).

```bash
yarn install                 # atau: npm install
node scripts/ecc.js --help   # CLI
```

Instal ke harness target (contoh Claude Code):

```bash
node scripts/ecc.js install --profile developer --target claude --no-hooks
```

Perintah lain yang sering dipakai:

```bash
node scripts/ecc.js status            # ringkasan instalasi
node scripts/ecc.js doctor --target claude
```

## Struktur repo

```
agents/          subagent khusus domain
skills/          workflow & domain knowledge (sumber utama)
commands/        slash command (permukaan kompatibilitas)
hooks/           otomasi trigger
rules/           pedoman selalu-dipakai
scripts/         utilitas Node.js lintas platform
mcp-configs/     konfigurasi server MCP
tests/           test suite
docs/            dokumentasi
```

## Pengembangan

```bash
yarn test        # validator + test suite
```

Kontribusi workflow baru masuk ke `skills/` terlebih dahulu (kebijakan skills-first).

## Kontribusi

Untuk mengusulkan skill:

1. **Satu direktori per skill** di bawah `skills/`: `skills/<skill-name>/SKILL.md`.
2. **Nama direktori harus sama dengan `name` di frontmatter.** Keduanya memakai
   identifier huruf kecil dengan tanda hubung; jika tidak cocok, validasi gagal.
3. **Tulis frontmatter** berisi `name` dan `description`. `description` harus
   menjelaskan apa yang dilakukan skill **dan** kapan skill harus aktif — teks itulah
   yang dipakai agent untuk memutuskan memuat skill.
4. **Buat self-contained.** Tulis prosedur, perintah, dan output yang diharapkan di
   `SKILL.md`; file pendukung diletakkan di direktori yang sama.

Contoh kerangka minimal:

```markdown
---
name: reviewing-terraform-plans
description: Reviews Terraform plan output for destructive changes and drift.
  Use when a plan is attached to a pull request or infrastructure changes are proposed.
---

# Reviewing Terraform Plans

1. Confirm the plan targets the expected workspace and environment.
2. List every resource marked for replacement or destruction.
3. Flag changes that remove stateful resources without a migration step.
4. Report findings ordered by blast radius, with the plan excerpt for each.
```

5. **Validasi sebelum membuka PR:**

   ```bash
   yarn test
   ```

   Validator memeriksa frontmatter, kesesuaian nama/direktori, dan referensi silang
   yang rusak.
6. **Buka PR** dengan judul conventional commit (`feat: add <skill-name> skill`) dan
   jelaskan kondisi trigger serta tool yang diasumsikan skill tersebut.

Untuk perubahan agent, hook, command, dan dokumentasi, lihat
[CONTRIBUTING.md](CONTRIBUTING.md).

## Lisensi

MIT — lihat [LICENSE](LICENSE), dengan atribusi pihak ketiga di [NOTICE](NOTICE).

Kredit: proyek ini merupakan turunan dari **ECC** oleh Affaan Mustafa
(https://github.com/affaan-m/ecc), dengan tambahan paket skill keamanan dari
Claude-BugHunter, security-audit-skill, dan Anthropic-Cybersecurity-Skills.
