# Claude 对话记忆

## 项目信息

**项目名称：** AI短视频生成器
**GitHub仓库：** https://github.com/zhaolisally2006-arch/ai-video-generator
**创建日期：** 2026-03-13
**技术栈：** Next.js 16, React 19, TypeScript, Tailwind CSS

## 项目目标

创建一个一键生成短视频的Web应用：
1. 用户上传图片+提示词
2. AI生成分镜脚本
3. 根据脚本生成图片
4. 生成视频片段
5. 在线剪辑合成

## 已完成功能

### 2026-03-13
- ✅ 项目初始化（Next.js 16 + Turbopack）
- ✅ 设置页面：可自定义AI模型API提供商
  - 支持配置：脚本生成、图片生成、视频生成三种模型
  - 支持提供商：OpenAI, Anthropic, Replicate, Runway, Pika, 自定义
  - 配置存储在localStorage
- ✅ 主页面：展示工作流程
- ✅ Git仓库初始化
- ✅ GitHub仓库创建并推送
- ✅ 项目计划书创建

## 技术决策

### AI模型选择（2026年最新）
- **脚本生成：** Claude Opus 4.6（最强推理能力）
- **图片生成：** GPT Image 1.5 / Midjourney v7 / FLUX 2 Max
- **视频生成：** Sora 2 / Runway Gen-4.5 / Kling 2.6 / Pika 2.5

### 架构决策
- 前端：Next.js 16 App Router + React Server Components
- 状态管理：Zustand（轻量级）
- 视频处理：FFmpeg.wasm（浏览器端）
- 任务队列：BullMQ + Redis

## 用户偏好

- 希望有设置界面自定义API提供商
- 项目文件在桌面生成
- 需要GitHub仓库
- 需要项目计划书和对话记忆
- 需要日志文件夹按日期命名

## 待开发功能

### Phase 1: 基础设施
- [ ] 数据库设计（Prisma + PostgreSQL）
- [ ] 用户认证系统
- [ ] 文件上传功能

### Phase 2: 核心功能
- [ ] 脚本生成页面
- [ ] 图片生成页面
- [ ] 视频生成功能
- [ ] 在线剪辑器

## 重要提醒

- 使用最小化代码实现
- 避免过度工程
- 优先实现核心功能
- 成本控制很重要（先预览再生成高清）

## 参考资源

- [Sora 2 文档](https://openai.com/sora)
- [Claude Opus 4.6 API](https://anthropic.com)
- [Runway Gen-4.5](https://runwayml.com)
- [MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo)
