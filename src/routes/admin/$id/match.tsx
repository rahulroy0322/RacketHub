import { createFileRoute } from '@tanstack/react-router'
import { MatchPage } from '@/pages/admin/match.page'

const Route = createFileRoute('/admin/$id/match')({
	component: MatchPage,
})

export { Route }
