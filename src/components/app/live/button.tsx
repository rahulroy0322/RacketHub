import { useMutation } from '@tanstack/react-query'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { type FC, useCallback } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import type { CommentaryTypesType } from '@/constants/type'
import { typeToMsgMap, typeToTitleMap } from '@/constants/type-map'
import { saveToDb } from '@/data/main'
import { sendComment } from '@/io/main'
import useLive from '@/stores/live.store'
import type { CommentaryType } from '@/types'
import {
	checkMatchWin,
	commentToIoComment,
	getScore,
	makeComment,
	matchCompleate,
} from './utils'

type ControllButtonPropsType = {
	point: CommentaryTypesType
	matchId: string
} & Parameters<typeof Button>[0]

const ControllButton: FC<ControllButtonPropsType> = ({ point, matchId }) => {
	const router = useRouter()

	const handleClick = useCallback(() => {
		const { scoreA, scoreB, teamId, teamA, teamB, lastPoint } =
			useLive.getState()

		if (!teamA || !teamB || !teamId) {
			return
		}

		const data: CommentaryType = makeComment({
			scoreA,
			scoreB,
			teamId,
			type: point,
			text: typeToMsgMap[point],
		})

		if (point === 'p:fair') {
			data.scoreA = getScore(
				{
					score: scoreA,
					team: teamA,
					teamId,
				},
				true
			)
			data.scoreB = getScore(
				{
					score: scoreB,
					team: teamB,
					teamId,
				},
				true
			)

			useLive.setState({
				lastPoint: teamId,
			})
		} else {
			data.scoreB = getScore({
				score: scoreB,
				team: teamA,
				teamId,
			})
			data.scoreA = getScore({
				score: scoreA,
				team: teamB,
				teamId,
			})

			useLive.setState({
				lastPoint: teamId === teamA._id ? teamB._id : teamA._id,
			})
		}

		const hasWin = checkMatchWin(
			lastPoint === teamA._id
				? {
						score: scoreA,
						team: teamA,
					}
				: {
						score: scoreB,
						team: teamB,
					},
			point === 'p:fair'
		)

		useLive.setState(data)

		if (hasWin) {
			toast.success(
				`Team "${
					lastPoint === teamA._id ? teamA.name : teamB.name
				}" had won the match.`
			)

			return matchCompleate({
				matchId,
			})
				.then(() => {
					router.invalidate({
						sync: true,
					})
				})
				.catch((e) => {
					throw e
				})
		}

		const _data = commentToIoComment(data)

		saveToDb(matchId, data)

		switch (point) {
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
				return sendComment({
					type: point,
					matchId,
					data: _data,
				})

			default:
				console.error(`"${point satisfies never}" does not handled`)
		}
	}, [point, matchId, router])

	return (
		<Button
			onClick={handleClick}
			variant={point === 'p:fair' ? 'default' : 'destructive'}
		>
			{typeToTitleMap[point]}
		</Button>
	)
}

type CompleateButtonPropsType = {
	matchId: string
	tournamentId: string
} & Parameters<typeof Button>[0]

const CompleateButton: FC<CompleateButtonPropsType> = ({
	matchId,
	tournamentId,
}) => {
	const navigate = useNavigate()
	const router = useRouter()
	const { isPending, mutate } = useMutation({
		mutationKey: ['match', matchId],
		mutationFn: async () =>
			toast.promise(
				async () => {
					await matchCompleate({
						matchId,
					})
				},
				{
					loading: 'Ending Match',
					success: () => {
						router.invalidate({
							sync: true,
						})
						navigate({
							to: '/tournaments/$id/matches',
							params: {
								id: tournamentId,
							},
						})
						return 'The Match Is end Now'
					},
					error: (e: Error) => {
						console.error(e)
						const { message } = e || {}

						return (
							<div>
								<b>Error Ending Match</b>
								<p>{message}</p>
							</div>
						)
					},
				}
			),
	})

	return (
		<Button
			className="absolute top-2 shadow shadow-current right-2"
			disabled={isPending}
			onClick={mutate as unknown as () => void}
			size={'sm'}
			variant={'outline'}
		>
			Match Compleate
		</Button>
	)
}

export { ControllButton, CompleateButton }
