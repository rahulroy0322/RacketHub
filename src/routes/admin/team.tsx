import { createFileRoute, redirect } from '@tanstack/react-router'
import { BASE_URL } from '@/constants/url'
import { TeamPage } from '@/pages/admin/team.page'
import type { PlayerType, ResType } from '@/types'

const fetchPlayers = async () => {
	const res = await fetch(`${BASE_URL}/players/`)

	const data = (await res.json()) as ResType<{
		players: PlayerType[]
	}>

	if (!data.success) {
		return data
	}

	return data.data.players
}

const Route = createFileRoute('/admin/team')({
	component: TeamPage,
	loader: async ({ context }) => {
		const data = await context.queryClient.fetchQuery({
			queryKey: ['tournaments'],
			queryFn: fetchPlayers,
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
