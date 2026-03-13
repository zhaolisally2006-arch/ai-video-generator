import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req: NextRequest) {
  try {
    const { scenes } = await req.json()
    const apiKey = req.headers.get('x-api-key')

    if (!apiKey) {
      return NextResponse.json({ error: '未配置API密钥' }, { status: 400 })
    }

    const openai = new OpenAI({ apiKey })
    const results = []

    for (const scene of scenes) {
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: scene.description,
        n: 1,
        size: '1024x1024',
      })

      results.push({
        sceneIndex: scene.index,
        imageUrl: response.data[0].url,
      })
    }

    return NextResponse.json({ success: true, images: results })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
