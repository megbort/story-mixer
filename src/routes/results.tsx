import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/results')({
  validateSearch: (search) => ({
    storyId: z.string().parse(search.storyId),
    formValues: z.record(z.string(), z.string()).parse(search.formValues),
  }),
  component: ResultsComponent,
})

function ResultsComponent() {
  const { storyId, formValues } = Route.useSearch()

  return (
    <div>
      <h1>Results for Story ID: {storyId}</h1>
      <pre>{JSON.stringify(formValues, null, 2)}</pre>
    </div>
  )
}
