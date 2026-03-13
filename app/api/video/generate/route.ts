import { NextRequest, NextResponse } from 'next/server'
import { callVideoAPI } from '@/lib/api-adapter'
import { ModelConfig } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const { images } = await req.json()
    const configStr = req.headers.get('x-model-config')

    if (!configStr) {
      return NextResponse.json({ error: '未配置模型' }, { status: 400 })
    }

    const config: ModelConfig = JSON.parse(configStr)
    const results = []

    for (const img of images) {
      const videoUrl = await callVideoAPI(config, img.description || '', img.imageUrl)
      results.push({
        sceneIndex: img.sceneIndex,
        videoUrl,
      })
    }

    return NextResponse.json({ success: true, videos: results })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
