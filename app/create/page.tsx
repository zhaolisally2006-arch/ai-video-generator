'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
      const apiKey = config.scriptGenerator?.apiKey

      if (!apiKey) {
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
          'x-api-key': apiKey,
        },
        body: formData,
      })

      const data = await res.json()

      if (data.error) {
        alert(data.error)
        return
      }

      // 暂存脚本到localStorage
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
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">创建视频项目</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">上传参考图片（可选）</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">视频创意描述</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="描述你想要的视频内容，例如：一个关于咖啡制作过程的短视频，温馨的早晨氛围..."
              className="w-full p-3 border rounded h-32"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? '生成中...' : '生成分镜脚本'}
          </button>
        </form>
      </div>
    </div>
  )
}
