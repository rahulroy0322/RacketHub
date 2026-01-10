import { createFileRoute } from '@tanstack/react-router'
import { PlayerPage } from '@/pages/admin/player.page'

const Route = createFileRoute('/admin/player')({
	component: PlayerPage,
})

export { Route }
