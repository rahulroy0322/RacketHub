import { createFileRoute, redirect } from '@tanstack/react-router'
import { MatchPage } from '@/pages/admin/match.page'
import { fetchTournament } from '@/routes/tournaments/$id/index'

const Route = createFileRoute('/admin/$id/match')({
	component: MatchPage,
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
