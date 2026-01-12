import { useMutation } from '@tanstack/react-query'
import { type FC, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import type { CommentaryTypesType } from '@/constants/type'
import { typeToMsgMap, typeToTitleMap } from '@/constants/type-map'
import { saveToDb, updateMatchStatus } from '@/data/main'
import { send } from '@/io/main'
import useLive from '@/stores/live.store'
import type { CommentaryType } from '@/types'

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
	const { isPending, mutate } = useMutation({
		mutationKey: ['match', matchId],
		mutationFn: () => {
			const data = {
				id: Math.random().toString(),
				teamId: useLive.getState().teamId || '',
				timestamp: new Date().toTimeString(),
				type: 'compleate',
				text: 'Match Compleated',
			} satisfies CommentaryType

			bordCust('compleate' as unknown as CommentaryTypesType, data)

			return Promise.all([
				saveToDb(matchId, data),
				updateMatchStatus(matchId, 'completed'),
			])
		},
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
