# Claude Code 实战手册

> 整合自微信公众号文章 + GitHub 高星项目

## 核心原则：Karpathy 四戒律

来自 Andrej Karpathy (OpenAI 联合创始人)。

### 原则一：先想后写 (Think Before Coding)

- 不确定时必须停下来问，禁止猜测
- 存在多种理解时列出选项让用户选
- 发现更简单的方案时主动说出来

### 原则二：能简就简 (Simplicity First)

- 没被要求的功能不加
- 只用一次的代码不建抽象层
- 不可能发生的异常场景不做错误处理

**判断标准：** 一个资深工程师看了，会不会说"太复杂了"？会的话，直接砍。

### 原则三：只改该改的 (Surgical Changes)

- 只改被要求改动的部分
- 匹配项目已有的代码风格
- 自己改动造成的无用代码要清理，但原有的问题不动

### 原则四：目标驱动 (Goal-Driven Execution)

- 不要说"加一个输入验证" → 说"写一组测试覆盖非法输入的情况"
- 不要说"修这个 bug" → 说"写一个能复现这个 bug 的测试，然后让它通过"

---

## 上下文管理

### 五岔路口决策

| 方向 | 命令 | 适用场景 |
|------|------|----------|
| 继续 | Enter | 任务进展顺利 |
| 回退 | Esc Esc → rewind | AI 跑偏了 |
| 清空 | /clear | 切换完全无关任务 |
| 压缩 | /compact | 上下文快满了 |
| 子代理 | Subagent | 只需结论不要过程 |

### /clear vs /compact

| 命令 | 效果 | 适用 |
|------|------|------|
| /clear | 清空整个对话上下文 | 切换到完全无关的新任务 |
| /compact | 压缩历史成摘要，保留记忆 | 任务进行中，需要释放空间 |

### Rewind — 最重要的习惯

Esc Esc 可以回到对话的某个检查点，只回退代码或只回退对话。

**超过 70% 上下文使用率就要警惕，提前 /compact。**

---

## 记忆系统

### 三层记忆架构

| 层级 | 内容 | 持久性 |
|------|------|--------|
| 活跃内存 | 当前会话的工具调用、代码修改 | 会话结束丢失 |
| 语义检索 | 关键信息向量存储 | 跨会话保留 |
| 长期总结 | 项目结构、编码规范、历史 Bug | 永久保留 |

### CLAUDE.md 层级

| 位置 | 作用范围 | 是否提交 Git |
|------|----------|--------------|
| `~/.claude/CLAUDE.md` | 用户全局，所有项目生效 | 不提交 |
| `./CLAUDE.md` | 项目级，团队共享 | 提交 |
| `./CLAUDE.local.md` | 个人项目级，覆盖上层 | 不提交 |
| `./.claude/rules/*.md` | 按路径规则按需加载 | 按需 |

### CLAUDE.md 写作原则

- 自动生成的内容砍一半：偏臃肿
- 每行过检验："没这行 Claude 会出错吗？"不会就删
- 出错后说"更新 CLAUDE.md 避免再犯"：Claude 自写规则，形成活文档
- 用 `@imports` 按需引用，不膨胀主文件

---

## 子代理策略

### 何时用 Subagent

| 用 Subagent | 不用 Subagent |
|-------------|---------------|
| 只需要结论，不需要原始工具输出 | 需要看到 AI 怎么工作的 |

### 专业子代理分工

| 子代理 | 职责 |
|--------|------|
| planner | 规划任务拆解 |
| architect | 架构设计 |
| tdd-guide | TDD 引导 |
| code-reviewer | 代码审查 |
| security-reviewer | 安全审查 |
| frontend-dev | 前端开发 |
| backend-dev | 后端开发 |
| devops | 运维部署 |
| tester | 测试 |
| docs-writer | 文档 |

### 并行策略

- `--worktree <name>`：创建隔离 git 工作区，同时跑 3-5 个 Claude 会话
- `/branch` / `/fork`：复制当前对话试另一条路，原对话不受影响

**/branch 是后悔药。--worktree 是平行宇宙。**

---

## 插件系统

### everything-claude-code（必装，100k Stars）

**6 大核心模块：**
1. Memory Persistence - Hooks 自动保存/加载会话上下文
2. Continuous Learning - /learn + Instincts 置信度评分
3. Verification Loops - Checkpoint + pass@k 验证
4. Token Optimization - 模型选择 + 战略压缩
5. Parallelization - Git Worktrees + Cascade Method
6. Subagent Orchestration - 13 个专业子代理

```bash
# 安装
/plugin marketplace add https://github.com/affaan-m/everything-claude-code
/plugin install everything-claude-code@everything-claude-code
```

### 六大必装 Skill

| Skill | 用途 |
|-------|------|
| Frontend Design | AI 前端审美优化 |
| 办公四件套 (docx/xlsx/pdf/pptx) | 办公文档读写 |
| Web Access | 爬虫搜索 |
| PUA | 鞭策 AI 解决摆烂问题 |
| claude-mem | 跨会话长期记忆 |
| Skill-Creator | 创建专属 Skill |

---

## 高效 Prompt 技巧

### 反向引导：让 Claude 先问你

不说"开发一个登录功能"，而是说：

```
"Interview me about [功能]"
```

Claude 会追问细节/边界/取舍，最后生成完整的 spec。

### 给 Claude 自检手段

提示中附上测试命令/lint 检查，让它自己跑、自己修。**质量提升 2-3 倍。**

### 贴原始数据，别解释 bug

- 直接粘贴错误日志 + "fix"
- 管道输入：`cat error.log | claude -p "fix this"`

### @ 指定文件

`@src/auth/middleware.ts` 直接定位，省去搜索开销。

---

## 命令速查

### 核心命令

| 命令 | 作用 |
|------|------|
| `/init` | 初始化项目，生成 CLAUDE.md |
| `/clear` | 清空上下文 |
| `/compact` | 压缩上下文 |
| `/plan` | 生成开发计划 |
| `/review` | 代码审查 |
| `/btw` | 快速问题，不污染主上下文 |
| `/memory` | 管理记忆，开启 Auto Dream |
| `/insights` | AI 分析使用习惯 |
| `/export` | 导出对话为 Markdown |
| `/model` | 切换模型 |
| `/effort` | 设置思考深度 |

### 隐藏命令

| 命令 | 作用 |
|------|------|
| `/model opusplan` | Plan 用 Opus，执行用 Sonnet |
| Esc Esc | 进入 rewind |
| `!` 前缀 | 直接执行 bash |
| Ctrl+S | 暂存提示词 |
| Ctrl+B | 后台运行长任务 |

---

## 工作流模式

### 模式一：简单任务（5 分钟内）

用户 → Claude → 完成 → /export

### 模式二：复杂任务（需要规划）

用户 → /plan → 确认计划 → Claude 执行 → Review → /compact → 完成

### 模式三：并行探索

用户 → `--worktree A` + `--worktree B` → 两个方案并行 → 对比 → 合并

### 模式四：子代理调查

用户 → Subagent 调查 → 返回摘要 → 主会话基于结论继续

### 模式五：TDD 循环

写测试 → 运行 FAIL → 写实现 → 运行 PASS → 重构 → /compact

---

## 安全铁律

**这三类决策必须人审：**
1. Auth / 权限变更
2. 支付 / 财务数据变更
3. 生产环境数据变更

---

## 安装速查

```bash
# 安装
curl -fsSL https://claude.ai/install.sh | bash

# 认证
claude auth login --console

# 别名
echo "alias cc='claude --dangerously-skip-permissions'" >> ~/.zshrc
```

## 常见坑

1. `--dangerously-skip-permissions` 默认选"No"：必须 Down + Enter
2. 上下文超过 70% 就开始变慢：提前 /compact
3. 连续 2 次纠正失败就 /clear：死胡同上下文会污染
4. Session 必须在同目录恢复：--continue 找的是当前目录的最近会话
