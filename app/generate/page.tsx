'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface SelectedImage {
  sceneIndex: number
  imageUrl: string
}

export default function GeneratePage() {
  const router = useRouter()
  const [images, setImages] = useState<SelectedImage[]>([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem('selected-images')
    if (stored) {
      setImages(JSON.parse(stored))
    }
  }, [])

  const handleGenerate = async () => {
    setLoading(true)
    setProgress(0)

    try {
      const config = JSON.parse(localStorage.getItem('ai-models-config') || '{}')
      const modelConfig = config.videoGenerator

      if (!modelConfig?.apiKey) {
        alert('请先在设置页面配置视频生成API密钥')
        router.push('/settings')
        return
      }

      const res = await fetch('/api/video/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-model-config': JSON.stringify(modelConfig),
        },
        body: JSON.stringify({ images }),
      })

      const data = await res.json()

      if (data.error) {
        alert(data.error)
        return
      }

      setProgress(100)
      localStorage.setItem('generated-videos', JSON.stringify(data.videos))
      alert('视频生成完成！')
      router.push('/editor')
    } catch (error) {
      console.error(error)
      alert('生成失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">生成视频</h1>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {images.map((img, i) => (
            <div key={i} className="relative">
              <Image
                src={img.imageUrl}
                alt={`Scene ${img.sceneIndex + 1}`}
                width={300}
                height={300}
                className="w-full rounded-lg"
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                分镜 {img.sceneIndex + 1}
              </div>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="mb-2 flex justify-between">
              <span>生成进度</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <button
            onClick={handleGenerate}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            开始生成视频
          </button>
        )}
      </div>
    </div>
  )
}
