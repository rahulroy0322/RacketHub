import { createFileRoute } from '@tanstack/react-router'
import { TeamPage } from '@/pages/admin/team.page'

const Route = createFileRoute('/admin/team')({
	component: TeamPage,
})

export { Route }
