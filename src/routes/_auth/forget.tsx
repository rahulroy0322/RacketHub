import { createFileRoute } from '@tanstack/react-router'
import { Loading } from '@/components/app/loading'

export const Route = createFileRoute('/_auth/forget')({
	component: RouteComponent,
	pendingComponent: Loading,
})

function RouteComponent() {
	return <div>Hello "/_auth/forget"!</div>
}
