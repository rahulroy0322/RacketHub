import { createFileRoute } from '@tanstack/react-router'
import { TournamentPage } from '@/pages/tournament.page'

const Route = createFileRoute('/tournaments/$id/')({
	component: TournamentPage,
})

export { Route }
