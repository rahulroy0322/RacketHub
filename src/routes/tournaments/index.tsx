import { createFileRoute, redirect } from '@tanstack/react-router'
import { BASE_URL } from '@/constants/url'
import { TournamentsPage } from '@/pages/tournaments.page'
import type { ResType, TournamentType } from '@/types'

const fetchTournaments = async (all = false) => {
	const res = await fetch(`${BASE_URL}/tournaments/${all ? '?all=true' : ''}`)

	const data = (await res.json()) as ResType<{
		tournaments: TournamentType[]
	}>

	if (!data.success) {
		return data
	}

	return data.data.tournaments
}

const Route = createFileRoute('/tournaments/')({
	component: TournamentsPage,
	loader: async ({ context }) => {
		const data = await context.queryClient.fetchQuery({
			queryKey: ['tournaments'],
			queryFn: () => fetchTournaments(false),
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

export { Route, fetchTournaments }
