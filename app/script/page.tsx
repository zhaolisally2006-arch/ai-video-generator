'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Scene {
  description: string
  duration: number
  cameraMovement: string
  transition: string
}

export default function ScriptPage() {
  const router = useRouter()
  const [scenes, setScenes] = useState<Scene[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('current-script')
    if (stored) {
      const data = JSON.parse(stored)
      setScenes(data.scenes || [])
    }
  }, [])

  const handleGenerateImages = async () => {
    setLoading(true)
    // TODO: 实现图片生成
    alert('图片生成功能开发中')
    setLoading(false)
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">分镜脚本</h1>

        {scenes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">暂无脚本</p>
            <button
              onClick={() => router.push('/create')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg"
            >
              创建新项目
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {scenes.map((scene, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">分镜 {i + 1}</h3>
                    <span className="text-sm text-gray-500">{scene.duration}秒</span>
                  </div>
                  <p className="text-gray-700 mb-4">{scene.description}</p>
                  <div className="flex gap-4 text-sm">
                    <span className="px-3 py-1 bg-blue-100 rounded">运镜: {scene.cameraMovement}</span>
                    <span className="px-3 py-1 bg-green-100 rounded">转场: {scene.transition}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleGenerateImages}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? '生成中...' : '生成图片'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
