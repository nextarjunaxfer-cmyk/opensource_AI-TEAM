# opensource_AI-TEAM

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/skills-1230-brightgreen.svg)](skills)
[![Agents](https://img.shields.io/badge/agents-72-blue.svg)](agents)
[![Commands](https://img.shields.io/badge/commands-99-lightgrey.svg)](commands)
[![Node](https://img.shields.io/badge/node-%3E%3D18-informational.svg)](package.json)

面向 AI 编码 harness 的 **agent、skill 与 command** 集合 —— 基于
[ECC](https://github.com/affaan-m/ecc)（agent harness operating system）构建，并扩展了
安全与红队 skill 包。

本仓库包含：

| 组件 | 数量 | 位置 |
|---|---|---|
| Skill | **1230** | `skills/` —— 每个 skill 是一个目录，内含带 frontmatter 的 `SKILL.md` |
| Agent | **72** | `agents/` —— 按领域划分的子 agent（planner、reviewer、build resolver 等） |
| Command | **99** | `commands/` —— 兼容性 slash command |
| Hook | — | `hooks/` —— 基于触发器的自动化 |
| Rule | — | `rules/` —— 必须遵循的准则（通用 + 按语言） |
| MCP 配置 | 14 | `mcp-configs/` |

## Skill 包

除 ECC 核心 skill 外，本仓库还以默认 skill 形式内置了三个外部 skill 包
（合计新增 902 个 skill）：

- **Claude-BugHunter**（83 个 skill）—— bug hunting 与 Web/应用安全测试
- **security-audit-skill**（1 个 skill）—— 端到端安全审计流程
- **Anthropic-Cybersecurity-Skills**（818 个 skill）—— 大型网络安全 skill 库：
  取证、恶意软件分析、威胁狩猎、云/AD 安全、DFIR、合规、漏洞利用分析与红队技战术

安全与红队 skill 仅限用于获得授权的安全测试。详见 `SECURITY.md`。

## 快速开始

环境要求：**Node.js >= 18**（推荐 22+）以及 `yarn@4.9.2`（通过 corepack）。

```bash
yarn install                 # 或：npm install
node scripts/ecc.js --help   # CLI
```

安装到目标 harness（以 Claude Code 为例）：

```bash
node scripts/ecc.js install --profile developer --target claude --no-hooks
```

其他常用命令：

```bash
node scripts/ecc.js status            # 安装状态摘要
node scripts/ecc.js doctor --target claude
```

## 仓库结构

```
agents/          按领域划分的子 agent
skills/          工作流与领域知识（核心来源）
commands/        slash command（兼容层）
hooks/           触发器自动化
rules/           始终生效的准则
scripts/         跨平台 Node.js 工具
mcp-configs/     MCP server 配置
tests/           测试套件
docs/            文档
```

## 开发

```bash
yarn test        # 校验器 + 测试套件
```

新增工作流优先提交到 `skills/`（skills-first 策略）。

## 贡献

新增工作流优先提交到 `skills/`（skills-first 策略）。提案一个新 skill：

1. **每个 skill 一个目录**：`skills/<skill-name>/SKILL.md`。
2. **目录名必须与 frontmatter 中的 `name` 一致**，都使用小写加连字符；不一致会导致校验失败。
3. **编写 frontmatter**，包含 `name` 与 `description`。description 需说明该 skill
   做什么**以及**何时应被激活 —— agent 依据这段文字决定是否加载。
4. **保持自包含**：流程、命令与预期输出写入 `SKILL.md`，辅助文件放在同一目录。
5. **提 PR 前先校验**：

   ```bash
   yarn test
   ```

   校验器会检查 frontmatter、name/目录一致性与失效的交叉引用。
6. **提交 PR**，标题遵循 conventional commit（如 `feat: add <skill-name> skill`），
   并说明触发条件与该 skill 依赖的工具。

Agent、hook、command 与文档类改动请参考 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 许可

MIT —— 见 [LICENSE](LICENSE)；第三方署名见 [NOTICE](NOTICE)。

致谢：本项目源自 Affaan Mustafa 的 **ECC**（https://github.com/affaan-m/ecc），
并整合了 Claude-BugHunter、security-audit-skill 与 Anthropic-Cybersecurity-Skills
三个安全 skill 包。
