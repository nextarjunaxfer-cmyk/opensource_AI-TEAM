# opensource_AI-TEAM

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
| MCP configs | 14 | `mcp-configs/` |

## Skill packs

Beyond the core ECC skills, this repository bundles three external skill packs as default
skills (902 additional skills in total):

- **Claude-BugHunter** (83 skills) — bug hunting and web/application security testing
- **security-audit-skill** (1 skill) — end-to-end security audit workflow
- **Anthropic-Cybersecurity-Skills** (818 skills) — a large cybersecurity skill library:
  forensics, malware analysis, threat hunting, cloud/AD security, DFIR, compliance,
  exploit analysis, and red-team tradecraft

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

## License

MIT — see [LICENSE](LICENSE), with third-party attributions in [NOTICE](NOTICE).

Credits: this project derives from **ECC** by Affaan Mustafa
(https://github.com/affaan-m/ecc), with additional security skill packs from
Claude-BugHunter, security-audit-skill, and Anthropic-Cybersecurity-Skills.
