import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { useEffect, useRef } from 'react'
import { STORIES } from '../data/stories'
import { Button } from '@/components/ui'
import { ArrowLeft, BookOpen } from 'lucide-react'

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
      <div className="flex justify-between items-center mb-8">
        <Button onClick={() => navigate({ to: '/' })} variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          More stories
        </Button>
        <Button
          onClick={() => navigate({ to: '/my-stories' })}
          variant="ghost"
          size="sm"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          My stories
        </Button>
      </div>
      <h2 className="text-lg font-semibold mb-4">{story.title}</h2>
      <p className="mb-12 text-lg">{storyText}</p>

      <div className="border-t border-gray-200 pt-8 mt-16">
        <p className="text-xs text-storymixer-grey mb-4 uppercase tracking-wide">
          Your inputs
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {story.inputs.map((input) => (
            <div key={input.id} className="text-xs">
              <p className="font-semibold text-storymixer-grey mb-1">
                {input.label}
              </p>
              <p className="text-storymixer-black text-sm">
                {formValues[input.id]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
