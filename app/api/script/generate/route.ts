import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const prompt = formData.get('prompt') as string
    const apiKey = req.headers.get('x-api-key') || process.env.ANTHROPIC_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: '未配置API密钥' }, { status: 400 })
    }

    const anthropic = new Anthropic({ apiKey })

    const message = await anthropic.messages.create({
      model: config.scriptGenerator.model,
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: `生成一个短视频分镜脚本，基于以下创意：${prompt}

要求：
- 生成5个分镜
- 每个分镜包含：场景描述、时长(秒)、运镜方式、转场效果
- 返回JSON格式

格式示例：
{
  "scenes": [
    {
      "description": "场景描述",
      "duration": 5,
      "cameraMovement": "push",
      "transition": "fade"
    }
  ]
}`
      }]
    })

    const content = message.content[0]
    const scriptData = content.type === 'text' ? JSON.parse(content.text) : null

    return NextResponse.json({
      success: true,
      script: scriptData
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: '生成失败' }, { status: 500 })
  }
}
