import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/editor')({
  component: () => <h1>Story Editor</h1>,
})
