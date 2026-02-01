import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { useEffect, useRef } from 'react'
import { STORIES } from '../data/stories'
import { Button } from '@/components/ui'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/results')({
  validateSearch: (search) => ({
    storyId: z.string().parse(search.storyId),
    formValues: z.record(z.string(), z.string()).parse(search.formValues),
    isNewStory: z.boolean().optional().parse(search.isNewStory) ?? false,
  }),
  component: ResultsComponent,
})

function ResultsComponent() {
  const { storyId, formValues, isNewStory } = Route.useSearch()
  const story = STORIES.find((story) => story.id === storyId)
  const hasSaved = useRef(false)
  const navigate = useNavigate()

  const saveNewStoryToSession = () => {
    if (!isNewStory || !story || hasSaved.current) return

    const createdStories = JSON.parse(
      sessionStorage.getItem('storyMixer:createdStories') || '[]',
    )

    const storyText = story.template
      .map((part) =>
        typeof part === 'string'
          ? part
          : (formValues?.[part.inputId] ?? `[${part.inputId}]`),
      )
      .join('')

    const newStory = {
      id: crypto.randomUUID(),
      storyId,
      title: story.title,
      storyText,
      formValues,
      createdAt: Date.now(),
    }

    createdStories.push(newStory)
    sessionStorage.setItem(
      'storyMixer:createdStories',
      JSON.stringify(createdStories),
    )
    hasSaved.current = true
  }

  useEffect(() => {
    saveNewStoryToSession()
  }, [isNewStory])

  if (!story) {
    return <div>Story not found</div>
  }

  const storyText = story.template
    .map((part) =>
      typeof part === 'string'
        ? part
        : (formValues?.[part.inputId] ?? `[${part.inputId}]`),
    )
    .join('')

  return (
    <div>
      <Button
        onClick={() => navigate({ to: '/' })}
        variant="ghost"
        size="sm"
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>
      <h1 className="text-3xl font-bold mb-4">{story.title}</h1>
      <p className="mb-6 text-lg">{storyText}</p>

      <h2 className="text-lg font-semibold mb-2">Your inputs</h2>
      <pre className="bg-gray-100 p-4 rounded text-sm">
        {JSON.stringify(formValues, null, 2)}
      </pre>
    </div>
  )
}
