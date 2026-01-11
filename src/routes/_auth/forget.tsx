import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/forget')({
	component: RouteComponent,
})

function RouteComponent() {
	return <div>Hello "/_auth/forget"!</div>
}
