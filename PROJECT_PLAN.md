# AI短视频生成器 - 项目计划书

## 项目概述

一键生成短视频的Web应用，用户上传图片和提示词，AI自动生成分镜脚本、图片、视频，并提供在线剪辑功能。

## 技术架构

### 前端
- Next.js 16 + Turbopack
- React 19 + TypeScript
- Tailwind CSS + shadcn/ui
- Zustand (状态管理)
- FFmpeg.wasm (视频处理)

### 后端
- Next.js API Routes
- Prisma + PostgreSQL
- Redis (缓存+队列)
- BullMQ (任务队列)

### AI模型
- 脚本生成：Claude Opus 4.6
- 图片生成：GPT Image 1.5 / Midjourney v7 / FLUX 2
- 视频生成：Sora 2 / Runway Gen-4.5 / Kling 2.6 / Pika 2.5

## 开发阶段

### Phase 1: 基础设施 (Week 1-2)
- [x] 项目初始化
- [x] 设置页面
- [ ] 数据库设计
- [ ] 用户认证系统
- [ ] 文件上传功能

### Phase 2: 脚本生成 (Week 3)
- [ ] 创意输入界面
- [ ] Claude API集成
- [ ] 分镜脚本生成
- [ ] 脚本编辑器
- [ ] 脚本版本管理

### Phase 3: 图片生成 (Week 4)
- [ ] 图片生成API集成
- [ ] 快速预览功能
- [ ] 高清图片生成
- [ ] 图片选择界面
- [ ] 风格迁移

### Phase 4: 视频生成 (Week 5-6)
- [ ] 视频生成API集成
- [ ] 运镜效果应用
- [ ] 配音生成
- [ ] 背景音乐生成
- [ ] 任务队列系统

### Phase 5: 视频剪辑 (Week 7-8)
- [ ] 时间轴编辑器
- [ ] 拖拽排序
- [ ] 转场效果
- [ ] 字幕编辑
- [ ] 实时预览

### Phase 6: 优化与发布 (Week 9-10)
- [ ] 性能优化
- [ ] 成本优化
- [ ] 用户测试
- [ ] 文档完善
- [ ] 部署上线

## 核心功能清单

### 1. 用户管理
- [ ] 注册/登录
- [ ] 个人资料
- [ ] 项目管理
- [ ] 使用配额

### 2. 创作流程
- [ ] 上传参考图片
- [ ] 输入创意描述
- [ ] 选择视频参数
- [ ] 生成分镜脚本
- [ ] 编辑脚本
- [ ] 生成图片预览
- [ ] 选择满意分镜
- [ ] 生成高清图片
- [ ] 生成视频片段
- [ ] 在线剪辑
- [ ] 导出视频

### 3. 设置与配置
- [x] AI模型配置
- [ ] 默认参数设置
- [ ] 导出设置
- [ ] 快捷键配置

## 数据模型

### User
- id, email, name, avatar
- apiKeys (加密存储)
- quota, usage

### Project
- id, userId, title, status
- referenceImage, prompt
- createdAt, updatedAt

### Storyboard
- id, projectId, version
- scenes (JSON)

### Scene
- id, storyboardId, order
- description, duration
- cameraMovement, transition
- imageUrl, videoUrl

### Asset
- id, projectId, type
- url, metadata

## API设计

### 脚本生成
- POST /api/script/generate
- POST /api/script/regenerate
- PUT /api/script/:id

### 图片生成
- POST /api/image/preview
- POST /api/image/generate
- POST /api/image/regenerate

### 视频生成
- POST /api/video/generate
- GET /api/video/status/:id

### 项目管理
- GET /api/projects
- POST /api/projects
- GET /api/projects/:id
- PUT /api/projects/:id
- DELETE /api/projects/:id

## 性能指标

- 脚本生成：< 10秒
- 图片预览：< 5秒/张
- 高清图片：< 30秒/张
- 视频生成：< 5分钟/片段
- 页面加载：< 2秒

## 成本估算

### 单个30秒视频成本
- 脚本生成：$0.05
- 图片生成（5张）：$0.25
- 视频生成（5片段）：$2.50
- 总计：约 $2.80

## 风险与挑战

1. AI模型API稳定性
2. 视频生成时间较长
3. 成本控制
4. 用户体验优化
5. 浏览器性能限制

## 下一步行动

1. 设计数据库schema
2. 实现用户认证
3. 开发脚本生成功能
4. 集成第一个AI模型
