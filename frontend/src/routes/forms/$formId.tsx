import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/forms/$formId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/forms/$formId"!</div>
}
