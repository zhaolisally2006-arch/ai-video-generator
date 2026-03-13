'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface GeneratedImage {
  sceneIndex: number
  imageUrl: string
}

export default function ImagesPage() {
  const router = useRouter()
  const [images, setImages] = useState<GeneratedImage[]>([])
  const [selected, setSelected] = useState<Set<number>>(new Set())

  useEffect(() => {
    const stored = localStorage.getItem('generated-images')
    if (stored) {
      const data = JSON.parse(stored)
      setImages(data)
      setSelected(new Set(data.map((_: any, i: number) => i)))
    }
  }, [])

  const toggleSelect = (index: number) => {
    const newSelected = new Set(selected)
    if (newSelected.has(index)) {
      newSelected.delete(index)
    } else {
      newSelected.add(index)
    }
    setSelected(newSelected)
  }

  const handleNext = () => {
    const selectedImages = images.filter((_, i) => selected.has(i))
    localStorage.setItem('selected-images', JSON.stringify(selectedImages))
    router.push('/generate')
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">生成的图片</h1>

        {images.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">暂无图片</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => toggleSelect(i)}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-4 ${
                    selected.has(i) ? 'border-blue-600' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={img.imageUrl}
                    alt={`Scene ${img.sceneIndex + 1}`}
                    width={400}
                    height={400}
                    className="w-full h-auto"
                  />
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                    分镜 {img.sceneIndex + 1}
                  </div>
                  {selected.has(i) && (
                    <div className="absolute top-2 left-2 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center">
                      ✓
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={selected.size === 0}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              生成视频 ({selected.size}个分镜)
            </button>
          </>
        )}
      </div>
    </div>
  )
}
