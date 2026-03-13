'use client'

import { useState, useEffect } from 'react'
import { StoryboardScene } from '@/types'

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [scenes, setScenes] = useState<StoryboardScene[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: 从API加载项目数据
    setLoading(false)
  }, [params.id])

  if (loading) return <div className="p-8">加载中...</div>

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">分镜脚本</h1>

        <div className="space-y-4">
          {scenes.map((scene, i) => (
            <div key={scene.id} className="bg-white p-6 rounded-lg shadow">
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

        <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          生成图片
        </button>
      </div>
    </div>
  )
}
