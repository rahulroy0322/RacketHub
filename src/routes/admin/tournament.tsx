import { createFileRoute } from '@tanstack/react-router'
import { TournamentPage } from '@/pages/admin/tournament.page'

const Route = createFileRoute('/admin/tournament')({
	component: TournamentPage,
})

export { Route }
