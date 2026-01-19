import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { type FC, useEffect } from 'react'
import '@/io/main'
import { Loading } from '@/components/app/loading'
import { BASE_URL } from '@/constants/url'
import { send } from '@/io/main'
import useLive, { setTeam, setTeamId } from '@/stores/live.store'
import type { MatchType, ResType, TeamType } from '@/types'

const fetchMatch = async (id: string) => {
	const res = await fetch(`${BASE_URL}/matches/${id}`)

	const data = (await res.json()) as ResType<{
		match: MatchType
	}>

	if (!data.success) {
		return data
	}

	return data.data.match
}

const MatchLayout: FC = () => {
	const { matchId } = useParams()
	const { teamAId, teamBId, scoreA, scoreB } = useLoaderData()
	useEffect(() => {
		send({
			type: 'join:room',
			data: matchId,
		})
	}, [matchId])

	useEffect(() => {
		setTeamId((teamAId as unknown as TeamType)._id)
		setTeam({
			teamA: teamAId as unknown as TeamType,
			teamB: teamBId as unknown as TeamType,
		})
	}, [teamAId, teamBId])

	useEffect(() => {
		useLive.setState({
			scoreA,
			scoreB,
		})
	}, [scoreA, scoreB])

	return <Outlet />
}

const Route = createFileRoute('/tournaments/$id/$matchId')({
	component: MatchLayout,
	pendingComponent: Loading,
	loader: async ({ context, params: { matchId } }) => {
		const data = await context.queryClient.fetchQuery({
			queryKey: ['match', matchId],
			queryFn: () => fetchMatch(matchId),
		})

		if (!data || 'error' in data) {
			console.error(data.error.message)

			throw redirect({
				to: '/',
				replace: true,
			})
		}

		return data
	},
})

const { useParams, useLoaderData } = Route

export { Route, fetchMatch }
