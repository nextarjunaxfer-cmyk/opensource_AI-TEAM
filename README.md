# opensource_AI-TEAM

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/skills-1230-brightgreen.svg)](skills)
[![Agents](https://img.shields.io/badge/agents-72-blue.svg)](agents)
[![Commands](https://img.shields.io/badge/commands-99-lightgrey.svg)](commands)
[![Node](https://img.shields.io/badge/node-%3E%3D18-informational.svg)](package.json)

**Languages:** [English](README.md) | [简体中文](README.zh-CN.md) | [Bahasa Indonesia](README.id.md)

A collection of **agents, skills, and commands** for AI coding harnesses — built on top of
[ECC](https://github.com/affaan-m/ecc) (the agent harness operating system) and extended
with security and red-team skill packs.

What this repository ships:

| Component | Count | Location |
|---|---|---|
| Skills | **1230** | `skills/` — each skill is a directory containing a frontmattered `SKILL.md` |
| Agents | **72** | `agents/` — domain-specific subagents (planner, reviewers, build resolvers, etc.) |
| Commands | **99** | `commands/` — compatibility slash commands |
| Hooks | — | `hooks/` — trigger-based automations |
| Rules | — | `rules/` — always-follow guidelines (common + per language) |
| MCP servers | 37 | `mcp-configs/mcp-servers.json` — one server definition file |

## Skill packs

Beyond the core ECC skills, this repository bundles three external skill packs as default
skills (902 additional skills in total):

| Pack | Skills | Focus | License |
|---|---|---|---|
| ECC core | 328 | Agents, workflows, language and framework reviews | MIT |
| [Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | 83 | Bug hunting and web/application security testing | MIT (code) + CC BY 4.0 (skill content) |
| [security-audit-skill](https://github.com/cloudflare/security-audit-skill) | 1 | End-to-end security audit workflow | MIT |
| [Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills) | 818 | Forensics, malware analysis, threat hunting, cloud/AD security, DFIR, compliance, exploit analysis, red-team tradecraft | Apache-2.0 |

Copyright notices and license texts for the third-party packs are collected in
[NOTICE](NOTICE) and `docs/licenses/`.

Security and red-team skills are intended for authorized security testing only. See
`SECURITY.md`.

## Quick start

Requirements: **Node.js >= 18** (22+ recommended) and `yarn@4.9.2` (via corepack).

```bash
yarn install                 # or: npm install
node scripts/ecc.js --help   # CLI
```

Install into a target harness (Claude Code shown):

```bash
node scripts/ecc.js install --profile developer --target claude --no-hooks
```

Other frequently used commands:

```bash
node scripts/ecc.js status            # installation summary
node scripts/ecc.js doctor --target claude
```

## Repository layout

```
agents/          domain-specific subagents
skills/          workflows and domain knowledge (canonical surface)
commands/        slash commands (compatibility surface)
hooks/           trigger automations
rules/           always-follow guidelines
scripts/         cross-platform Node.js utilities
mcp-configs/     MCP server configurations
tests/           test suite
docs/            documentation
```

## Development

```bash
yarn test        # validators + test suite
```

New workflow contributions land in `skills/` first (skills-first policy).

## Contributing

New workflows land in `skills/` first (skills-first policy). To propose a skill:

1. **Create one directory per skill** under `skills/`:
   `skills/<skill-name>/SKILL.md`.
2. **Match the directory name to the frontmatter `name`.** Both must be the same
   lowercase, hyphenated identifier; a mismatch fails validation.
3. **Write frontmatter** with `name` and `description`. The description should state
   what the skill does *and* when it should activate — that text is how agents decide
   to load it.
4. **Keep it self-contained.** Put the procedure, commands, and expected outputs in
   `SKILL.md`; add supporting files in the same directory.

Minimal skeleton:

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

5. **Validate before opening a PR:**

   ```bash
   yarn test
   ```

   The validators check frontmatter, name/directory alignment, and broken cross-references.
6. **Open a PR** using a conventional commit title (`feat: add <skill-name> skill`) and
   describe the trigger conditions and any tools the skill assumes.

For agents, hooks, commands, and documentation changes, see
[CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT — see [LICENSE](LICENSE), with third-party attributions in [NOTICE](NOTICE).

Credits: this project derives from **ECC** by Affaan Mustafa
([affaan-m/ecc](https://github.com/affaan-m/ecc)), with additional security skill packs from
Claude-BugHunter, security-audit-skill, and Anthropic-Cybersecurity-Skills.
