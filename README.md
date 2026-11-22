# opensource_AI-TEAM

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
| MCP config | 14 | `mcp-configs/` |

## Paket skill

Selain skill inti ECC, repo ini menyertakan tiga paket skill eksternal yang diimpor
sebagai skill default (Total 902 skill tambahan):

- **Claude-BugHunter** (83 skill) — bug hunting dan web/app security testing
- **security-audit-skill** (1 skill) — alur audit keamanan
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

## Lisensi

MIT — lihat [LICENSE](LICENSE).

Kredit: proyek ini merupakan turunan dari **ECC** oleh Affaan Mustafa
(https://github.com/affaan-m/ecc), dengan tambahan paket skill keamanan dari
Claude-BugHunter, security-audit-skill, dan Anthropic-Cybersecurity-Skills.
