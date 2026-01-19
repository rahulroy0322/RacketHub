import { createFileRoute, redirect } from '@tanstack/react-router'
import { Loading } from '@/components/app/loading'
import { BASE_URL } from '@/constants/url'
import { TournamentPage } from '@/pages/tournament.page'
import type { ResType, TournamentType } from '@/types'

const fetchTournament = async (id: string) => {
	const res = await fetch(`${BASE_URL}/tournaments/${id}`)

	const data = (await res.json()) as ResType<{
		tournament: TournamentType
	}>

	if (!data.success) {
		return data
	}

	return data.data.tournament
}

const Route = createFileRoute('/tournaments/$id/')({
	component: TournamentPage,
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

export { Route, fetchTournament }
