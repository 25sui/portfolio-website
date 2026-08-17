# GitHub 密钥安全复核报告（二次全量审计）

- **复核时间**：2026-07-01
- **审计对象**：GitHub 账号 `25sui` 名下全部 **10 个公开仓库**
- **审计目标**：确认是否存在任何**明文放置的 API Key / 密钥 / 敏感凭据**
- **审计方式**：逐仓库读取高风险源码文件（非依赖代码搜索）

---

## 一、总体结论

✅ **未发现任何明文 API Key / 密钥 / 敏感凭据被提交到任意仓库。**

所有云服务的密钥均通过以下安全方式处理：
- 读取环境变量（`.env` / `process.env` / `import.meta.env` / `os.getenv`）
- 提供 `.env.example` 模板（占位符，非真实密钥）
- 运行时由用户在前端/UI 输入（如密码框），从不写死在代码里
- 必要时在日志/接口中对密钥做脱敏处理

---

## 二、本次方法论改进（重要）

> 上一轮曾用 GitHub 代码搜索（`search_code`）做筛查，但本次验证发现**该搜索索引对本账号仓库不可靠**，不能作为依据。

验证证据：搜索 `AI_API_KEY`、`deepseek`、`openai`、`filename:.env` 均返回 **0 条结果**，但 `circuit-ai-studio/server/index.ts` 中明明存在 `const AI_API_KEY = process.env.AI_API_KEY`。

**根因**：GitHub 代码搜索对下划线做分词（`AI_API_KEY` 不会匹配 `API_KEY`），且本账号仓库未被正确索引。

**结论**：代码搜索"0 命中"**不等于**没有密钥。本次改为**逐仓库直接读取源码**，结果才可靠。

---

## 三、逐仓库明细

| 仓库 | 分支 | 密钥处理方式 | 结论 |
|---|---|---|---|
| **circuit-ai-studio** | main | `server/index.ts`：`AI_API_KEY = process.env.AI_API_KEY`；`/api/check-login` 对密钥脱敏（`slice(0,8)+'****'+slice(-4)`）；`.env.example` 为模板 | ✅ 安全 |
| **huiyan-traffic** | main | `backend/.env.example` 为模板（`DEEPSEEK_API_KEY=your_deepseek_api_key_here`）；密钥均读 env | ✅ 安全 |
| **Weather-Query-Application** | main | `src/api/config.ts`：`VITE_OPENWEATHER_API_KEY = import.meta.env...` | ✅ 安全（⚠️ 见下） |
| **FairMirror** | master | `roberta_provider.py`：`os.getenv("FAIRMIRROR_ROBERTA_MODEL")` 仅模型路径；`.env.example` 模板 | ✅ 安全 |
| **Pest-and-Disease-Monitoring-System** | master | `modules/ai_assistant.py`：密钥**仅**在 Streamlit 运行时通过 `st.text_input(..., type="password")` 进入 `session_state`，代码内无硬编码；`api_usage_examples.py` 用 `test_key`/`partner_key` 等本地演示假密钥 | ✅ 安全 |
| **bus-scheduling-optimization** | master | NSGA-II + LSTM 纯算法，无密钥、无 `.env` | ✅ 安全 |
| **portfolio-website** | main | 静态站点，无 `.env`、无密钥 | ✅ 安全 |
| **connect6** | main | C++ 五子棋，无密钥 | ✅ 安全 |
| **markdown-notes** | master | React 笔记应用，无密钥 | ✅ 安全 |
| **To_do-List-App** | master | TypeScript 待办，无密钥 | ✅ 安全 |

---

## 四、两个非密钥类遗留项（建议处理）

虽然都不是"明文密钥"，但属于可被关注的安全/规范点：

### 1. `huiyan-traffic/config.py` —— 硬编码演示登录
```python
DEFAULT_USER = {"username": "25岁", "password": "123456"}
```
- **性质**：本地演示用的假账号密码，**不是云 API 密钥**，泄露风险极低。
- **建议**：改为从环境变量读取（如 `os.getenv("DEMO_USER", "25岁")`），或直接删除该硬编码，避免被误判为凭据泄露。

### 2. `Weather-Query-Application` —— 前端环境变量暴露风险
```ts
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '';
```
- **性质**：Vite 的 `VITE_` 前缀变量在构建时会被**打包进浏览器前端代码**，若部署真实密钥，任何访客都能从网页源码中看到。
- **建议**：
  - 若仅个人学习使用、密钥已限制额度，风险可控；
  - 若对外发布，建议改为**后端代理**（前端请求自己的后端，后端持有密钥调用 OpenWeather），避免密钥进前端包。

---

## 五、结论与建议

1. **可放心**：10 个仓库均无明文 API Key / 密钥，密钥管理规范（env + 模板 + 运行时输入）。
2. **建议顺手修**：把 `huiyan-traffic/config.py` 的演示密码改为读环境变量，消除"硬编码凭据"的观感。
3. **前端密钥注意**：Weather 项目如要公开部署，避免把真实 OpenWeather Key 打进前端。
4. **长期习惯**：任何新仓库都坚持 `.env.example` + `process.env` 模式，GitHub 代码搜索不可作为密钥审计依据。

如需我直接帮你把 `huiyan-traffic/config.py` 的演示密码改为环境变量读取（Craft 模式改 1 行 + 补 `.env.example`），告诉我即可。
