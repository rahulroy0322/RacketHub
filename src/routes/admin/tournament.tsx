import { createFileRoute, redirect } from '@tanstack/react-router'
import { BASE_URL } from '@/constants/url'
import { TournamentPage } from '@/pages/admin/tournament.page'
import type { ResType, TeamType } from '@/types'

const fetchTeams = async () => {
	const res = await fetch(`${BASE_URL}/teams/`)

	const data = (await res.json()) as ResType<{
		teams: TeamType[]
	}>

	if (!data.success) {
		return data
	}

	return data.data.teams
}

const Route = createFileRoute('/admin/tournament')({
	component: TournamentPage,

	loader: async ({ context }) => {
		const data = await context.queryClient.fetchQuery({
			queryKey: ['tournaments'],
			queryFn: fetchTeams,
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
