# 快速上手

来源：[奇思妙想味道 - 封神！Hermes Agent新手到高手全教程](https://mp.weixin.qq.com/s?__biz=MzAxNDc4ODk0OQ==&mid=2247483768&idx=1&sn=81ea2bf87a6886d3de3e64ce9e99b519)

## 三个核心概念

| 概念 | 作用 |
|------|------|
| **记忆（Memory）** | 跨会话记住偏好、项目上下文，不用每次重复说明 |
| **技能（Skill）** | 完成任务后自动总结经验，生成可复用技能，省 token 又高效 |
| **网关系统（Gateway）** | 一个网关打通 15+ 通讯平台，随时随地调用 AI |

## 安装

```bash
# macOS/Linux/WSL2
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash

# Windows：先安装 WSL2，再执行上述命令
```

## 验证安装

```bash
source ~/.bashrc  # zsh 用户：source ~/.zshrc
hermes version     # 检查版本
hermes doctor      # 诊断运行环境
```

## 首次配置

1. 选择「Quick Setup」（新手推荐）
2. 选择模型供应商：优先选 DeepSeek、Kimi 等国产大模型（免费额度高）
3. 测试首次对话：

```bash
hermes chat -q "Hello! What tools do you have available?"
```

## 新手常用命令

| 命令 | 说明 |
|------|------|
| `hermes` | 开启交互式对话 |
| `hermes model` | 切换模型供应商/模型 |
| `hermes tools` | 配置启用的工具集 |
| `hermes gateway` | 启动消息网关 |
| `hermes update` | 更新 Hermes 到最新版本 |
| `hermes doctor` | 诊断问题 |

## 中级进阶

### 接 Telegram 机器人

1. Telegram 搜索 @BotFather，发送 `/newbot`，获取 Bot Token
2. 配置 Hermes：

```bash
# 方式1：命令配置
hermes config set TELEGRAM_BOT_TOKEN your-bot-token

# 方式2：手动编辑 ~/.hermes/config.yaml
# gateway:
#   adapters:
#     telegram:
#       enabled: true
```

3. 启动网关：`hermes gateway`
4. 在 Telegram 向机器人发送 `/start`

### 配置工具集

```bash
hermes tools
# 启用至少3个：filesystem、web_search、firecrawl
```

### 测试记忆功能

```bash
hermes
# 告诉它你的偏好（如"我叫XX，喜欢用中文交流"）
/exit
hermes chat
# 问它"你知道我是谁吗？"，能说出名字即正常
```

## 高级进阶

### MCP 扩展集成

```bash
# 1. 安装 MCP 扩展
uv pip install -e ".[mcp]"

# 2. 编辑 ~/.hermes/config.yaml
# mcp:
#   servers:
#     filesystem:
#       command: "npx"
#       args: ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"]
#     github:
#       command: "npx"
#       args: ["-y", "@modelcontextprotocol/server-github"]
```

### 定时自动化任务（Cron）

编辑 `~/.hermes/cron/tasks.yaml`：

```yaml
tasks:
  - name: daily_news
    schedule: "0 9 * * *"  # 每天早上9点
    command: "总结今日AI新闻"
    platform: telegram
    chat_id: "your-chat-id"
```

### 多 Agent 编排

```yaml
# 编辑 ~/.hermes/config.yaml
agents:
  researcher:
    role: "调研员"
    tools: [web_search, firecrawl]
  writer:
    role: "作家"
    tools: [filesystem]
  editor:
    role: "校对员"
    tools: [filesystem]
```

## 常见问题

| 问题 | 解决方案 |
|------|----------|
| `hermes: command not found` | 执行 `source ~/.bashrc`，检查 PATH |
| API 密钥未设置 | 执行 `hermes model` 重新配置 |
| Windows 无法安装 | 必须先安装 WSL2 |
| 机器人无响应 | 检查网关是否运行：`hermes gateway` |
| 更新后配置丢失 | 执行 `hermes config check` → `hermes config migrate` |

**遇到任何问题，先执行 `hermes doctor`！**

## 学习资源

- GitHub：https://github.com/nousresearch/hermes-agent
- 官网：https://hermes-agent.nousresearch.com/
- 官方文档：https://hermes-agent.nousresearch.com/docs/
