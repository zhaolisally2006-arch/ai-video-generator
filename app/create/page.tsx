'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function CreatePage() {
  const router = useRouter()
  const [prompt, setPrompt] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const config = JSON.parse(localStorage.getItem('ai-models-config') || '{}')
      const modelConfig = config.scriptGenerator

      if (!modelConfig?.apiKey) {
        alert('请先在设置页面配置API密钥')
        router.push('/settings')
        return
      }

      const formData = new FormData()
      formData.append('prompt', prompt)
      if (image) formData.append('image', image)

      const res = await fetch('/api/script/generate', {
        method: 'POST',
        headers: {
          'x-model-config': JSON.stringify(modelConfig),
        },
        body: formData,
      })

      const data = await res.json()

      if (data.error) {
        alert(data.error)
        return
      }

      localStorage.setItem('current-script', JSON.stringify(data.script))
      router.push('/script')
    } catch (error) {
      console.error(error)
      alert('生成失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-slate-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              创建视频项目
            </h1>
            <p className="text-gray-600 mt-2">输入你的创意，让AI帮你生成脚本</p>
          </div>
          <Link href="/">
            <Button variant="outline">← 返回</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>✨ 开始创作</CardTitle>
            <CardDescription>描述你想要的视频内容，AI将为你生成专业的分镜脚本</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>参考图片（可选）</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </div>

              <div className="space-y-2">
                <Label>视频创意描述 *</Label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="例如：一个关于咖啡制作过程的短视频，温馨的早晨氛围，展示从研磨咖啡豆到倒入杯中的全过程..."
                  className="h-32"
                  required
                />
              </div>

              <Button type="submit" disabled={loading} size="lg" className="w-full">
                {loading ? '⏳ 生成中...' : '🚀 生成分镜脚本'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
