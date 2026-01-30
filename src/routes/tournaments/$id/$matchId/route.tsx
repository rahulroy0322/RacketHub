import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { type FC, useEffect } from 'react'
import { Loading } from '@/components/app/loading'
import { BASE_URL } from '@/constants/url'
import { joinRoom, type MSGType, socket } from '@/io/main'
import { addComment } from '@/stores/comments.store'
import useLive, { setLastPoint, setTeam, setTeamId } from '@/stores/live.store'
import type {
	CommentaryType,
	IOCommentaryType,
	MatchType,
	ResType,
	TeamType,
} from '@/types'

const fetchMatch = async (id: string) => {
	const res = await fetch(`${BASE_URL}/matches/${id}`)

	const data = (await res.json()) as ResType<{
		match: MatchType & {
			comments: CommentaryType[]
		}
	}>

	if (!data.success) {
		return data
	}

	return data.data.match
}

const score = (scores: IOCommentaryType['scores']) => {
	const { teamA, teamB } = useLive.getState()

	if (!teamA || !teamB) {
		return
	}

	if (!(teamA._id in scores) || !(teamB._id in scores)) {
		return
	}

	useLive.setState({
		scoreA: scores[teamA._id],
		scoreB: scores[teamB._id],
	})
}

const MatchLayout: FC = () => {
	const { matchId } = useParams()
	const { teamAId, teamBId, scoreA, scoreB, comments, maxPoints } =
		useLoaderData()

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

	useEffect(() => {
		setLastPoint(comments.at(0)?.teamId || null)
	}, [comments])
	useEffect(() => {
		useLive.setState({
			maxPoints,
		})
	}, [maxPoints])

	useEffect(() => {
		joinRoom(matchId)
	}, [matchId])

	useEffect(() => {
		if (socket.disconnected) {
			socket.connect()
		}

		const handleMsg = ({ type, data }: MSGType) => {
			switch (type) {
				case 'p:fair':
				case 'p:out':
				case 'ir:net':
				case 'ir:touch':
				case 'ir:double':
				case 'ir:over-net':
				case 'ir:under-net':
				case 's:hight':
				case 's:foot-line':
				case 's:foot-ground':
				case 's:contact':
				case 's:court':
				case 's:flick':
				case 'compleate':
				case 'toss':
					// biome-ignore lint/suspicious/noConsole: dev only
					import.meta.env.DEV && console.log(data)

					score(data.scores)
					addComment(data as unknown as CommentaryType)
					return

				default:
					console.error(
						{
							type,
							data,
						},
						`"${type satisfies never}" not implimented yet!` as string
					)
			}
		}

		socket.on('MSG', handleMsg)

		return () => {
			socket.off('MSG', handleMsg)
			socket.disconnect()
		}
	}, [])

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
