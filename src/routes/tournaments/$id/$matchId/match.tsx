import { createFileRoute } from '@tanstack/react-router'
import { MatchPage } from '@/pages/matche.page'

const Route = createFileRoute('/tournaments/$id/$matchId/match')({
	component: MatchPage,
})

export { Route }
