import { createFileRoute, redirect } from '@tanstack/react-router'
import { MatchPage } from '@/pages/matche.page'
import { fetchMatch } from './route'

const Route = createFileRoute('/tournaments/$id/$matchId/match')({
	component: MatchPage,

	loader: async ({ context, params: { matchId } }) => {
		const data = await context.queryClient.fetchQuery({
			queryKey: ['match', matchId],
			queryFn: () => fetchMatch(matchId),
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
