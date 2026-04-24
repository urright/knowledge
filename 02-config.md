# 满配版配置指南

来源：[编译硅基 - 装完 Hermes 一定要配置这五套系统](https://mp.weixin.qq.com/s?__biz=MzUzMzM5MjkyOA==&mid=2247484410&idx=1&sn=dabc58ba1304dd20b94215e32ddab605)

## 模块总览

| 模块 | 内容 |
|------|------|
| 身份与记忆 | SOUL.md、角色库、记忆后端 |
| 感知能力 | 内容抓取、网页搜索、浏览器自动化、文档处理 |
| 表达能力 | 语音、图片生成 |
| 效率与成本 | Token 监控、自我进化、Skill 库 |
| 生态导航 | Hermes 资源入口 |

## 身份与记忆

### SOUL.md 角色库（agency-agents-zh）

211 个中文角色模板，覆盖小红书、抖音、微信、飞书、钉钉、B站、跨境电商、政务 ToG、医疗合规等垂直领域。

```bash
# 安装
git clone https://github.com/jnMetaCode/agency-agents-zh

# 激活模式示例
激活小红书内容写作模式
```

### Hindsight 替换原生 MEMORY

| 对比项 | 内置 MEMORY | Hindsight |
|--------|------------|-----------|
| 写入机制 | 只有 Hermes 认为重要时才写入 | 自动从每轮对话提取实体、事实、关系、时间戳 |
| 容量上限 | ≈ 2200 字符（硬上限） | 无硬上限 |
| 知识组织 | 线性文本 | 知识图谱 |

```bash
# 安装步骤
hermes memory setup
# 选择 hindsight，向导自动安装依赖、配置一切

# 获取 API Key：https://ui.hindsight.vectorize.io/connect

# 验证
hermes memory status
```

## 感知能力

### 内容抓取工具

| 工具 | 用途 |
|------|------|
| **Jina Reader** | 单页抓取，URL 前加 `r.jina.ai/` 输出干净 Markdown |
| **Crawl4AI** | 批量深度抓取，开源本地运行，基于 Playwright |
| **Scrapling** | 反爬绕过（Hermes 自带 optional-skill） |
| **CamoFox** | 隐身浏览器 |

### 网页搜索

| 工具 | 说明 |
|------|------|
| **Tavily** | AI 专用搜索，1000 次/月免费 |
| **DuckDuckGo** | 零成本兜底搜索（内置） |

```bash
# 1. 去 https://app.tavily.com/sign-in 注册
# 2. 写入环境变量
echo 'TAVILY_API_KEY=tvly-你的key' >> ~/.hermes/.env

# 3. 设置搜索后端
hermes config set web.backend tavily      # 主力
hermes config set web.backend duckduckgo # 兜底
```

### 文档处理

| 工具 | 说明 |
|------|------|
| **Pandoc** | 万能格式转换器 |
| **Marker** | PDF 转 Markdown 增强 |

## 表达能力

### 语音

| 工具 | 说明 |
|------|------|
| **Whisper** | 语音识别，支持 99+ 语言，本地零成本 |
| **Edge TTS** | 语音合成（微软免费，Hermes 默认） |

### 图片生成

| 工具 | 说明 |
|------|------|
| **Fal.ai** | 注册拿 key，有免费额度 |
| **FLUX Skill** | Black Forest Labs 官方高质量出图 |

```bash
hermes skills install black-forest-labs/skills
echo 'FAL_KEY=你的key' >> ~/.hermes/.env
```

## 效率与成本

### Tokscale — Token 监控

```bash
# 快速启动
npx tokscale@latest

# 使用
tokscale --hermes                 # Hermes 全局消耗
tokscale --hermes --week          # 过去7天趋势
```

### hermes-hudui — 成本面板

```bash
git clone https://github.com/joeynyc/hermes-hudui.git
cd hermes-hudui && ./install.sh
hermes-hudui
# 浏览器访问 http://localhost:3001
```

### RTK — Token 消耗压减 60-90%

```bash
brew install rtk
rtk init -g  # 安装全局 Hook
```

### Hermes-agent-self-evolution — 自我进化

用遗传算法自动优化提示词（建议系统稳定两周后再开启）。

```bash
git clone https://github.com/NousResearch/hermes-agent-self-evolution.git
cd hermes-agent-self-evolution && pip install -e ".[dev]"
```

### Skill 扩展

```bash
# 380+ 跨平台 Skill：https://github.com/wondelai/skills
```

## 生态资源

| 资源 | 地址 |
|------|------|
| **awesome-hermes-agent** | https://github.com/0xNyk/awesome-hermes-agent |
| **hermes-ecosystem** | https://hermes-ecosystem.vercel.app |
