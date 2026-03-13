import { AIModels } from '@/types'

const DEFAULT_CONFIG: AIModels = {
  scriptGenerator: {
    provider: 'anthropic',
    apiKey: '',
    model: 'claude-opus-4-6',
  },
  imageGenerator: {
    provider: 'openai',
    apiKey: '',
    model: 'gpt-image-1.5',
  },
  videoGenerator: {
    provider: 'openai',
    apiKey: '',
    model: 'sora-2',
  },
}

export const getConfig = (): AIModels => {
  if (typeof window === 'undefined') return DEFAULT_CONFIG
  const stored = localStorage.getItem('ai-models-config')
  return stored ? JSON.parse(stored) : DEFAULT_CONFIG
}

export const saveConfig = (config: AIModels) => {
  localStorage.setItem('ai-models-config', JSON.stringify(config))
}
