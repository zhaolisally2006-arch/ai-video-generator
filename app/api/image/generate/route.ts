import { NextRequest, NextResponse } from 'next/server'
import { callImageAPI } from '@/lib/api-adapter'
import { ModelConfig } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const { scenes } = await req.json()
    const configStr = req.headers.get('x-model-config')

    if (!configStr) {
      return NextResponse.json({ error: '未配置模型' }, { status: 400 })
    }

    const config: ModelConfig = JSON.parse(configStr)
    const results = []

    for (const scene of scenes) {
      const imageUrl = await callImageAPI(config, scene.description)
      results.push({
        sceneIndex: scene.index,
        imageUrl,
      })
    }

    return NextResponse.json({ success: true, images: results })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
