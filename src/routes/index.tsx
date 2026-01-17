import { createFileRoute } from '@tanstack/react-router'
import { CardButton } from '../components/ui/card-button'

export const Route = createFileRoute('/')({
  component: () => {
    const stories = [
      { id: 1, title: 'Story 1', description: 'Description for story 1' },
      { id: 2, title: 'Story 2', description: 'Description for story 2' },
      { id: 3, title: 'Story 3', description: 'Description for story 3' },
      { id: 4, title: 'Story 4', description: 'Description for story 4' },
      { id: 5, title: 'Story 5', description: 'Description for story 5' },
      { id: 6, title: 'Story 6', description: 'Description for story 6' },
    ]

    return (
      <div className="relative h-full p-4">
        <div className="absolute top-6 left-6">
          <h1 className="text-2xl font-bold">Welcome to StoryMixer!</h1>
          <p className="text-xl">
            Pick a story, fill in the blanks, and watch a silly story come to
            life.
          </p>
        </div>
        <div className="flex justify-center items-center h-full">
          <div className="grid grid-cols-3 gap-8 max-w-4xl">
            {stories.map((story) => (
              <CardButton
                key={story.id}
                image="https://placehold.co/400x225"
                title={story.title}
                description={story.description}
                onClick={() => alert(`${story.title} clicked`)}
              />
            ))}
          </div>
        </div>
      </div>
    )
  },
})
