import { createFileRoute, redirect } from '@tanstack/react-router'
import { Loading } from '@/components/app/loading'
import { TeamsPage } from '@/pages/teams.page'
import { fetchTournament } from '.'

const Route = createFileRoute('/tournaments/$id/teams')({
	component: TeamsPage,
	pendingComponent: Loading,
	loader: async ({ context, params: { id } }) => {
		const data = await context.queryClient.fetchQuery({
			queryKey: ['tournament', id],
			queryFn: () => fetchTournament(id),
		})

		if (!data || 'error' in data) {
			console.error(data.error.message)

			throw redirect({
				href: '/',
			})
		}

		return data
	},
})

export { Route }
