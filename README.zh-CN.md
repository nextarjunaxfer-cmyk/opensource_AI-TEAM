# opensource_AI-TEAM

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

## 许可

MIT —— 见 [LICENSE](LICENSE)；第三方署名见 [NOTICE](NOTICE)。

致谢：本项目源自 Affaan Mustafa 的 **ECC**（https://github.com/affaan-m/ecc），
并整合了 Claude-BugHunter、security-audit-skill 与 Anthropic-Cybersecurity-Skills
三个安全 skill 包。
