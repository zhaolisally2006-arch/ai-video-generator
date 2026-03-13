export type AIProvider = 'openai' | 'anthropic' | 'replicate' | 'runway' | 'pika' | 'custom'
export type APIType = 'openai' | 'anthropic' | 'openai-compatible' | 'custom'

export interface ModelConfig {
  provider: AIProvider
  apiType: APIType
  apiKey: string
  baseUrl?: string
  model: string
}

export interface AIModels {
  scriptGenerator: ModelConfig
  imageGenerator: ModelConfig
  videoGenerator: ModelConfig
}

export interface StoryboardScene {
  id: string
  description: string
  duration: number
  cameraMovement: 'push' | 'pull' | 'pan' | 'tilt' | 'static'
  transition: 'cut' | 'fade' | 'dissolve' | 'wipe'
  imageUrl?: string
  videoUrl?: string
}
