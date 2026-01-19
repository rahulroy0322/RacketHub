import { createFileRoute } from '@tanstack/react-router'
import { Loading } from '@/components/app/loading'
import { PlayerPage } from '@/pages/admin/player.page'

const Route = createFileRoute('/admin/player')({
	component: PlayerPage,
	pendingComponent: Loading,
})

export { Route }
