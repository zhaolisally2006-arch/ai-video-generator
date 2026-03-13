# AI短视频生成器

一键生成短视频的Web应用，支持自定义AI模型配置。

## 功能特性

- 📝 AI生成分镜脚本
- 🎨 根据脚本生成图片
- 🎬 生成视频片段
- ✂️ 在线视频剪辑
- ⚙️ 自定义AI模型API提供商

## 技术栈

- Next.js 16 + Turbopack
- React 19 + TypeScript
- Tailwind CSS
- 支持多种AI模型：Claude Opus 4.6、Sora 2、Midjourney v7等

## 快速开始

```bash
npm install
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 配置

1. 访问 `/settings` 页面
2. 配置各个AI模型的API提供商和密钥
3. 支持的提供商：OpenAI、Anthropic、Replicate、Runway、Pika、自定义

## 项目结构

```
├── app/              # Next.js页面
├── lib/              # 工具函数
├── types/            # TypeScript类型定义
└── public/           # 静态资源
```
