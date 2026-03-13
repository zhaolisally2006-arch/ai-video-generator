'use client'

import { useState } from 'react'
import { getConfig, saveConfig } from '@/lib/config'
import { AIModels, AIProvider, APIType } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'

const providers: AIProvider[] = ['openai', 'anthropic', 'replicate', 'runway', 'pika', 'custom']
const apiTypes: APIType[] = ['openai', 'anthropic', 'openai-compatible', 'custom']

export default function SettingsPage() {
  const [config, setConfig] = useState<AIModels>(getConfig())
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    saveConfig(config)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI模型设置
            </h1>
            <p className="text-gray-600 mt-2">配置你的AI服务提供商</p>
          </div>
          <Link href="/">
            <Button variant="outline">← 返回</Button>
          </Link>
        </div>

        <div className="space-y-6">
          <ModelConfigSection
            title="📝 脚本生成模型"
            description="用于生成视频分镜脚本"
            config={config.scriptGenerator}
            onChange={(c) => setConfig({ ...config, scriptGenerator: c })}
          />

          <ModelConfigSection
            title="🎨 图片生成模型"
            description="根据脚本生成分镜图片"
            config={config.imageGenerator}
            onChange={(c) => setConfig({ ...config, imageGenerator: c })}
          />

          <ModelConfigSection
            title="🎬 视频生成模型"
            description="将图片转换为视频片段"
            config={config.videoGenerator}
            onChange={(c) => setConfig({ ...config, videoGenerator: c })}
          />
        </div>

        <Button onClick={handleSave} size="lg" className="mt-8 w-full">
          {saved ? '✓ 已保存' : '保存设置'}
        </Button>
        >
          {saved ? '✓ 已保存' : '保存设置'}
        </button>
      </div>
    </div>
  )
}

function ModelConfigSection({ title, description, config, onChange }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>API提供商</Label>
            <Select value={config.provider} onValueChange={(v) => onChange({ ...config, provider: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {providers.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>API类型</Label>
            <Select value={config.apiType} onValueChange={(v) => onChange({ ...config, apiType: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {apiTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>模型名称</Label>
          <Input
            value={config.model}
            onChange={(e) => onChange({ ...config, model: e.target.value })}
            placeholder="例如: claude-opus-4-6"
          />
        </div>

        <div className="space-y-2">
          <Label>API Key</Label>
          <Input
            type="password"
            value={config.apiKey}
            onChange={(e) => onChange({ ...config, apiKey: e.target.value })}
            placeholder="输入API密钥"
          />
        </div>

        {(config.provider === 'custom' || config.apiType === 'openai-compatible') && (
          <div className="space-y-2">
            <Label>Base URL</Label>
            <Input
              value={config.baseUrl || ''}
              onChange={(e) => onChange({ ...config, baseUrl: e.target.value })}
              placeholder="https://api.example.com"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
