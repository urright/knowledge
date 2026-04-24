# 高阶配置全攻略

来源：[尼克的AI笔记 - 揭秘Hermes高阶配置全攻略](https://mp.weixin.qq.com/s?__biz=MzY5NjIwNDE2MA==&mid=2247486967&idx=1&sn=f4dcd97b97a55f9aa5075674c3dbf204)

## SOUL.md 迭代方式

每次对话结束后，提醒 Hermes 对 `soul.md` 文件进行修改和迭代，持续优化人格设定。

## Hindsight 部署（自建服务器）

```bash
# https://github.com/vectorize-io/hindsight
# 在服务器上部署 Hindsight，作为 hermes 的记忆系统
# 可导入第三方 API（此处使用 DeepSeek API）
```

## 搜索后端配置优先级

1. **主力**：Tavily（付费但高质量，1000次/月免费）
2. **兜底**：DuckDuckGo（免费零成本）

## 浏览器自动化

Hermes 已内置 Browser Use，只需安装 CamoFox：

```bash
# https://github.com/jo-inc/camofox-browser
```

## 工具链对比表

| 工具 | 类别 | 说明 |
|------|------|------|
| Jina Reader | 单页抓取 | `r.jina.ai/` 前缀 |
| Crawl4AI | 批量抓取 | Playwright + 本地模型结构化提取 |
| Scrapling | 反爬 | Hermes optional-skill 内置 |
| CamoFox | 隐身浏览器 | 需单独安装 |
| Tavily | AI搜索 | 主力 |
| DuckDuckGo | 搜索 | 兜底 |

## 文档处理

| 工具 | 说明 |
|------|------|
| **Pandoc** | 万能格式转换（PDF/DOCX/HTML/EPUB → Markdown 等） |
| **Marker** | PDF 转 Markdown 增强 |

## Token 成本拆解

**hermes-dashboard**：能按组件拆解 Token 消耗——系统提示占多少、工具定义占多少、消息历史占多少。

- https://github.com/Bichev/hermes-dashboard

## 自我进化注意事项

- 等系统稳定两周后再开启
- 建议搭配一个验证 cron，防止优化循环把还没调好的配置"优化"得更乱

## RTK 安装地址

- https://github.com/adityahimaone/hermes-agent
