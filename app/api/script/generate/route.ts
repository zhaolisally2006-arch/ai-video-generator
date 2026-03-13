import { NextRequest, NextResponse } from 'next/server'
import { callTextAPI } from '@/lib/api-adapter'
import { ModelConfig } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const prompt = formData.get('prompt') as string
    const configStr = req.headers.get('x-model-config')

    if (!configStr) {
      return NextResponse.json({ error: '未配置模型' }, { status: 400 })
    }

    const config: ModelConfig = JSON.parse(configStr)

    const fullPrompt = `生成一个短视频分镜脚本，基于以下创意：${prompt}

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

    const response = await callTextAPI(config, fullPrompt)
    const scriptData = JSON.parse(response)

    return NextResponse.json({ success: true, script: scriptData })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
