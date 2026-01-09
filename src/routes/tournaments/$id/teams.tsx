import { createFileRoute, redirect } from '@tanstack/react-router'
import { TeamsPage } from '@/pages/teams.page'
import { fetchTournament } from '.'

const Route = createFileRoute('/tournaments/$id/teams')({
	component: TeamsPage,
	loader: async ({ context, params: { id } }) => {
		const data = await context.queryClient.fetchQuery({
			queryKey: ['tournament', id],
			queryFn: () => fetchTournament(id),
		})

		if (!data || 'error' in data) {
			console.error(data.error.message)

			return redirect({
				href: '/',
			}) as never
		}

		return data
	},
})

export { Route }
