import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { type FC, useCallback } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import type { CommentaryTypesType } from '@/constants/type'
import { typeToMsgMap, typeToTitleMap } from '@/constants/type-map'
import { updateMatch } from '@/data/admin'
import { saveToDb } from '@/data/main'
import { send } from '@/io/main'
import useLive from '@/stores/live.store'
import type { CommentaryType } from '@/types'

const makeComment = (
	props: Pick<CommentaryType, 'type' | 'text' | 'teamId'>
): CommentaryType => ({
	id: Math.random().toString(),
	timestamp: new Date().toTimeString(),
	...props,
})
type ControllButtonPropsType = {
	point: CommentaryTypesType
	matchId: string
} & Parameters<typeof Button>[0]

const ControllButton: FC<ControllButtonPropsType> = ({ point, matchId }) => {
	const handleClick = useCallback(() => {
		const data: CommentaryType = {
			id: Math.random().toString(),
			teamId: useLive.getState().teamId || '',
			timestamp: new Date().toTimeString(),
			type: point,
			// player,
			text: typeToMsgMap[point],
		}

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
				return bordCust(point, data)

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

const bordCust = (type: CommentaryTypesType, data: CommentaryType) => {
	send({
		type,
		data,
	})
}

const CompleateButton: FC<Omit<ControllButtonPropsType, 'point'>> = ({
	matchId,
}) => {
	const router = useRouter()
	const { isPending, mutate } = useMutation({
		mutationKey: ['match', matchId],
		mutationFn: async () =>
			toast.promise(
				async () => {
					const comment = makeComment({
						type: 'compleate',
						text: 'Match Compleated',
						teamId: '',
					})
					bordCust('compleate' as unknown as CommentaryTypesType, comment)

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
						return 'The Match Is end Now'
					},
					error: (e: Error) => {
						console.error(e)
						const { message } = e

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
