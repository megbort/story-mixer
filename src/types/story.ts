export interface Story {
  id: string
  title: string
  description: string
  image?: string
  inputs: StoryInput[]
  template: StoryTemplatePart[]
}

export interface StoryInput {
  id: string
  label: string
  type: 'noun' | 'verb' | 'adjective' | 'adverb' | 'custom'
  placeholder?: string
}

export type StoryTemplatePart = string | { inputId: string }
