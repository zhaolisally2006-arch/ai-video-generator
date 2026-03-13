'use client'

import { useState, useEffect } from 'react'
import { getConfig, saveConfig } from '@/lib/config'
import { AIModels, AIProvider } from '@/types'

const providers: AIProvider[] = ['openai', 'anthropic', 'replicate', 'runway', 'pika', 'custom']

export default function SettingsPage() {
  const [config, setConfig] = useState<AIModels>(getConfig())
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    saveConfig(config)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">AI模型设置</h1>

        <div className="space-y-6">
          {/* 脚本生成模型 */}
          <ModelConfigSection
            title="脚本生成模型"
            config={config.scriptGenerator}
            onChange={(c) => setConfig({ ...config, scriptGenerator: c })}
          />

          {/* 图片生成模型 */}
          <ModelConfigSection
            title="图片生成模型"
            config={config.imageGenerator}
            onChange={(c) => setConfig({ ...config, imageGenerator: c })}
          />

          {/* 视频生成模型 */}
          <ModelConfigSection
            title="视频生成模型"
            config={config.videoGenerator}
            onChange={(c) => setConfig({ ...config, videoGenerator: c })}
          />
        </div>

        <button
          onClick={handleSave}
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {saved ? '✓ 已保存' : '保存设置'}
        </button>
      </div>
    </div>
  )
}

function ModelConfigSection({ title, config, onChange }: any) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">API提供商</label>
          <select
            value={config.provider}
            onChange={(e) => onChange({ ...config, provider: e.target.value })}
            className="w-full p-2 border rounded"
          >
            {providers.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">模型名称</label>
          <input
            type="text"
            value={config.model}
            onChange={(e) => onChange({ ...config, model: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="例如: claude-opus-4-6"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">API Key</label>
          <input
            type="password"
            value={config.apiKey}
            onChange={(e) => onChange({ ...config, apiKey: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="输入API密钥"
          />
        </div>

        {config.provider === 'custom' && (
          <div>
            <label className="block text-sm font-medium mb-2">Base URL</label>
            <input
              type="text"
              value={config.baseUrl || ''}
              onChange={(e) => onChange({ ...config, baseUrl: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="https://api.example.com"
            />
          </div>
        )}
      </div>
    </div>
  )
}
