import { createFileRoute, redirect } from '@tanstack/react-router'
import { Loading } from '@/components/app/loading'
import { TournamentsPage } from '@/pages/admin/tournaments.page'
import { fetchTournaments } from '../tournaments'

const Route = createFileRoute('/admin/tournaments')({
	component: TournamentsPage,
	pendingComponent: Loading,
	loader: async ({ context }) => {
		const data = await context.queryClient.fetchQuery({
			queryKey: ['tournaments'],
			queryFn: () => fetchTournaments(true),
		})

		if (!data || !Array.isArray(data)) {
			console.error(data.error.message)

			throw redirect({
				href: '/',
			})
		}

		return data
	},
})

export { Route }
