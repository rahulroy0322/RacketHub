import { createFileRoute } from '@tanstack/react-router'
import { TeamsPage } from '@/pages/teams.page'

const Route = createFileRoute('/tournaments/$id/teams')({
	component: TeamsPage,
})

export { Route }
