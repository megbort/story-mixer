import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { CardButton } from '../components/ui/card-button'
import { STORIES } from '@/data/stories'

export const Route = createFileRoute('/')({
  component: () => {
    const stories = STORIES
    const navigate = useNavigate()

    return (
      <div>
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to StoryMixer!</h1>
          <p className="text-lg">
            Pick a story, fill in the blanks, and watch a silly story come to
            life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-fit">
          {stories.map((story) => (
            <CardButton
              key={story.id}
              image={story.image ?? ''}
              title={story.title}
              description={story.description}
              onClick={() =>
                navigate({
                  to: '/editor/$storyId',
                  params: { storyId: story.id },
                })
              }
            />
          ))}
        </div>
      </div>
    )
  },
})
