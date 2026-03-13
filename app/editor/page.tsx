'use client'

import { useState, useEffect } from 'react'

interface GeneratedVideo {
  sceneIndex: number
  videoUrl: string
}

export default function EditorPage() {
  const [videos, setVideos] = useState<GeneratedVideo[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('generated-videos')
    if (stored) {
      setVideos(JSON.parse(stored))
    }
  }, [])

  const handleExport = () => {
    alert('导出功能开发中')
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">视频编辑器</h1>

        {videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">暂无视频</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {videos.map((video, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                  <div className="text-lg font-semibold">分镜 {video.sceneIndex + 1}</div>
                  <video src={video.videoUrl} controls className="w-64 h-auto rounded" />
                </div>
              ))}
            </div>

            <button
              onClick={handleExport}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              导出视频
            </button>
          </>
        )}
      </div>
    </div>
  )
}
