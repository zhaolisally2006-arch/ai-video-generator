import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'
import { ModelConfig } from '@/types'

export async function callTextAPI(config: ModelConfig, prompt: string) {
  const { apiType, apiKey, baseUrl, model } = config

  if (apiType === 'anthropic') {
    const client = new Anthropic({ apiKey, baseURL: baseUrl })
    const response = await client.messages.create({
      model,
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }]
    })
    const content = response.content[0]
    return content.type === 'text' ? content.text : ''
  }

  if (apiType === 'openai' || apiType === 'openai-compatible') {
    const client = new OpenAI({ apiKey, baseURL: baseUrl })
    const response = await client.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }]
    })
    return response.choices[0].message.content || ''
  }

  throw new Error('不支持的API类型')
}

export async function callImageAPI(config: ModelConfig, prompt: string) {
  const { apiType, apiKey, baseUrl, model } = config

  if (apiType === 'openai' || apiType === 'openai-compatible') {
    const client = new OpenAI({ apiKey, baseURL: baseUrl })
    const response = await client.images.generate({
      model,
      prompt,
      n: 1,
      size: '1024x1024',
    })
    return response.data[0].url
  }

  throw new Error('不支持的API类型')
}
