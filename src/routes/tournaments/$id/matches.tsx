import { createFileRoute, redirect } from '@tanstack/react-router'
import { BASE_URL } from '@/constants/url'
import { MatchesPage } from '@/pages/matches.page'
import type { MatchType, ResType } from '@/types'

const fetchMatches = async (id: string) => {
	const res = await fetch(`${BASE_URL}/matches/${id}/matches`)

	const data = (await res.json()) as ResType<{
		matchs: MatchType[]
	}>

	if (!data.success) {
		return data
	}

	return data.data.matchs
}

const Route = createFileRoute('/tournaments/$id/matches')({
	component: MatchesPage,
	loader: async ({ context, params: { id } }) => {
		const data = await context.queryClient.fetchQuery({
			queryKey: ['tournament', id, 'matches'],
			queryFn: () => fetchMatches(id),
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
