#!/usr/bin/env node

/**
 * Counts the repository's shipped assets so the numbers quoted in README and
 * AGENTS.md can be refreshed without guessing.
 *
 * Usage:
 *   node scripts/asset-counts.js          human-readable summary
 *   node scripts/asset-counts.js --json   machine-readable counts
 */

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');

function countSkillDirs() {
  const skillsDir = path.join(ROOT, 'skills');
  return fs
    .readdirSync(skillsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => fs.existsSync(path.join(skillsDir, entry.name, 'SKILL.md'))).length;
}

function countMarkdownFiles(dir) {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return 0;
  return fs.readdirSync(full, { withFileTypes: true }).filter(
    (entry) => entry.isFile() && entry.name.endsWith('.md')
  ).length;
}

function countMcpServers() {
  const configPath = path.join(ROOT, 'mcp-configs', 'mcp-servers.json');
  if (!fs.existsSync(configPath)) return { configFiles: 0, servers: 0 };
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const servers = config.mcpServers ?? config;
  return {
    configFiles: fs.readdirSync(path.join(ROOT, 'mcp-configs')).filter((f) => f.endsWith('.json')).length,
    servers: Object.keys(servers).length,
  };
}

function collectCounts() {
  const mcp = countMcpServers();
  return {
    skills: countSkillDirs(),
    agents: countMarkdownFiles('agents'),
    commands: countMarkdownFiles('commands'),
    mcpConfigFiles: mcp.configFiles,
    mcpServers: mcp.servers,
  };
}

function main() {
  const counts = collectCounts();
  if (process.argv.includes('--json')) {
    process.stdout.write(`${JSON.stringify(counts, null, 2)}\n`);
    return;
  }
  console.log(`skills        ${counts.skills}`);
  console.log(`agents        ${counts.agents}`);
  console.log(`commands      ${counts.commands}`);
  console.log(`mcp servers   ${counts.mcpServers} (in ${counts.mcpConfigFiles} config file)`);
}

main();
