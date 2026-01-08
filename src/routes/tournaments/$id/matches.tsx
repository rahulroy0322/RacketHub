import { createFileRoute } from '@tanstack/react-router'
import { MatchesPage } from '@/pages/matches.page'

const Route = createFileRoute('/tournaments/$id/matches')({
	component: MatchesPage,
})

export { Route }
