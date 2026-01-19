import { useMutation } from '@tanstack/react-query'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { type FC, useCallback } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import type { CommentaryTypesType } from '@/constants/type'
import { typeToMsgMap, typeToTitleMap } from '@/constants/type-map'
import { updateMatch } from '@/data/admin'
import { saveToDb } from '@/data/main'
import { send } from '@/io/main'
import useLive from '@/stores/live.store'
import type { CommentaryType, IOCommentaryType } from '@/types'

const makeComment = (
	props: Pick<CommentaryType, 'type' | 'text' | 'teamId' | 'scoreA' | 'scoreB'>
): CommentaryType => ({
	id: Math.random().toString(),
	timestamp: new Date().toTimeString(),
	...props,
})

const commentToIoComment = ({
	id,
	scoreA,
	scoreB,
	timestamp,
	text,
	type,
}: CommentaryType): IOCommentaryType => {
	const { teamA, teamB } = useLive.getState()

	if (!teamA || !teamB) {
		throw new Error('something went wrong!')
	}

	return {
		id,
		timestamp,
		text,
		type,

		scores: {
			[teamA._id]: scoreA,
			[teamB._id]: scoreB,
		},
	}
}

type ControllButtonPropsType = {
	point: CommentaryTypesType
	matchId: string
} & Parameters<typeof Button>[0]

const ControllButton: FC<ControllButtonPropsType> = ({ point, matchId }) => {
	const handleClick = useCallback(() => {
		const { scoreA, scoreB, teamId, teamA, teamB } = useLive.getState()

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
			if (teamA._id === teamId) {
				data.scoreA = scoreA + 1
			} else {
				data.scoreB = scoreB + 1
			}
		} else {
			if (teamA._id !== teamId) {
				data.scoreA = scoreA + 1
			} else {
				data.scoreB = scoreB + 1
			}
		}

		const _data: IOCommentaryType = commentToIoComment(data)

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
				return bordCust(point, _data)

			default:
				console.error(`"${point satisfies never}" does not handled`)
		}
	}, [point, matchId])

	return (
		<Button
			onClick={handleClick}
			variant={point === 'p:fair' ? 'default' : 'destructive'}
		>
			{typeToTitleMap[point]}
		</Button>
	)
}

const bordCust = (type: CommentaryTypesType, data: IOCommentaryType) => {
	send({
		type,
		data,
	})
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
					const { scoreA, scoreB } = useLive.getState()
					const comment = makeComment({
						type: 'compleate',
						text: 'Match Compleated',
						teamId: '',
						scoreA,
						scoreB,
					})
					bordCust(
						'compleate' as unknown as CommentaryTypesType,
						commentToIoComment(comment)
					)

					const [_comment, match] = await Promise.all([
						saveToDb(matchId, comment),
						updateMatch(matchId, { status: 'completed' }),
					])

					if (!comment || !match) {
						throw new Error('some thing went wrong')
					}

					if ('error' in _comment) {
						if ('message' in _comment.error) {
							throw _comment.error
						}
						throw new Error(_comment.error)
					}

					if ('error' in match) {
						if ('message' in match.error) {
							throw match.error
						}
						throw new Error(match.error)
					}
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
