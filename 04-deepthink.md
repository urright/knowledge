# 深度思考模式（Sequential Thinking）

来源：[龙虾学习社 - 只用一招：让Hermes学会深度思考](https://mp.weixin.qq.com/s?__biz=MzY4ODE3MTM5Nw==&mid=2247484403&idx=1&sn=19ec558c514cd1f1e147f4b58a9ba763)

## 问题背景

普通 AI 的思考模式是一条"单行道"——前面的内容生成后就改不了，后面推理被前面方向绑架。容易出现前后矛盾、漏掉关键步骤等问题。

## Sequential Thinking 核心思想

给 AI 装一张"草稿纸"，让思考过程变成一系列可以编号、追踪、修正的步骤。

就像人类做复杂决策：掏出草稿纸列提纲 → 想到一半发现前面不对 → 划掉重来 → 换条路走。

## 安装步骤

### 第一步：找到文件

```bash
open -t ~/.hermes/hermes-agent/agent/prompt_builder.py
```

### 第二步：添加 Deep Think Guidance

搜索 `SKILLS_GUIDANCE`，在后面添加：

```python
DEEP_THINK_GUIDANCE = (
    "# Deep Thinking — Sequential Thinking discipline\n"
    "When facing complex decisions, policy analysis, multi-step coding tasks, "
    "or questions requiring factual grounding:\n"
    "1. **List your reasoning steps** before acting\n"
    "2. **Think for a minimum of 4 iterations** before giving a final answer\n"
    "3. **Verify facts with web_search** — if your reasoning contains a factual claim, "
    "search it before proceeding\n"
    "4. **Revise when new information contradicts your assumption**\n"
    "5. **Do not let early errors compound**\n"
)
```

### 第三步：加载到运行时代码

打开同一目录下的 `run_agent.py`：

1. 找到：
   ```python
   from agent.prompt_builder import (...SKILLS_GUIDANCE...)
   ```
   在 `SKILLS_GUIDANCE` 后面加逗号，写上 `DEEP_THINK_GUIDANCE`

2. 在 `_build_system_prompt` 方法中，找到：
   ```python
   if "skill_manage" in self.valid_tool_names: tool_guidance.append(SKILLS_GUIDANCE)
   ```
   在后面加上：
   ```python
   if "web_search" in self.valid_tool_names: tool_guidance.append(DEEP_THINK_GUIDANCE)
   ```

## 五条规定解读

| 规则 | 说明 |
|------|------|
| ① 行动前先列提纲 | 不要搜到什么算什么，先把"我要做什么、查什么"想清楚 |
| ② 至少想四轮再给答案 | 前两轮试错，后两轮验证 |
| ③ 事实判断必须验证 | 数字、日期、事件，先用搜索查一下 |
| ④ 发现错了要承认 | 新的证据面前，修正判断，不叫认输，叫实事求是 |
| ⑤ 错误越积越难改 | 第一时间发现、第一时间修正 |

## 触发条件

✅ **会触发**：政策分析类、多步骤操作类、事实论证类、方案设计类、代码编写类

❌ **不会触发**：简单问答（如"今天天气怎么样"、"成都有一个叫什么名字的机场"）

## 验证方式

**必须是新对话**（旧对话不会加载新规则），问一个复杂问题：

```
请分析一下2026年AI Agent的发展趋势，给我列清楚思考步骤
```

如果它开始一步一步列思考过程，即配置成功。

## 原理

AI 本身的能力没有变，变的，是它的**行为模式**。

就像同一个人，在嘈杂的咖啡厅和安静的图书馆，工作状态完全不同。规则是在告诉它："面对这种类型的问题，你要慢一点，想清楚再开口。"

核心就一句话：**错误越早发现，成本越低。**
