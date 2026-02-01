import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Info } from 'lucide-react'

interface SavedStory {
  id: string
  storyId: string
  title: string
  storyText: string
  formValues: Record<string, string>
  createdAt: number
}

export const Route = createFileRoute('/my-stories')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const [stories, setStories] = useState<SavedStory[]>([])

  useEffect(() => {
    const saved = sessionStorage.getItem('storyMixer:createdStories')
    if (saved) {
      setStories(JSON.parse(saved))
    }
  }, [])

  const handleViewStory = (story: SavedStory) => {
    navigate({
      to: '/results',
      search: {
        storyId: story.storyId,
        formValues: story.formValues,
        isNewStory: false,
      },
    })
  }

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
      <div className="flex items-start gap-2 mb-6">
        <Info className="w-5 h-5 text-storymixer-accent-dark" />
        <p className="text-storymixer-accent-dark text-sm">
          Stories are saved to your session storage only. They will be cleared
          when you close your browser.
        </p>
      </div>

      {stories.length === 0 ? (
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">My Stories</h1>
          <p className="text-storymixer-grey-alt">No stories created yet.</p>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-6">My Stories</h1>
          <div className="space-y-3">
            {stories
              .slice()
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((story) => (
                <div
                  key={story.id}
                  className="p-4 border border-storymixer-grey rounded-lg flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1 text-storymixer-black">
                      {story.title}
                    </h3>
                    <p className="text-storymixer-grey-alt text-sm line-clamp-2 mb-2">
                      {story.storyText}
                    </p>
                    <p className="text-xs text-storymixer-grey">
                      {new Date(story.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleViewStory(story)}
                    className="ml-4 shrink-0"
                  >
                    View Story
                  </Button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
