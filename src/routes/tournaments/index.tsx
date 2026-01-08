import { createFileRoute } from '@tanstack/react-router'
import { TournamentsPage } from '@/pages/tournaments.page'

const Route = createFileRoute('/tournaments/')({
	component: TournamentsPage,
})

export { Route }
