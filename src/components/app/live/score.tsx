import type { FC } from 'react'
import useLive from '@/stores/live.store'

const LiveScore: FC = () => {
	const scoreA = useLive((state) => state.scoreA)
	const scoreB = useLive((state) => state.scoreB)

	return (
		<h3 className="text-3xl font-bold text-center">
			{scoreA.toString().padStart(2, '0')} -{' '}
			{scoreB.toString().padStart(2, '0')}
		</h3>
	)
}

const LastPoint: FC = () => {
	const team = useLive(({ teamA, lastPoint, teamB }) =>
		lastPoint ? (lastPoint === teamA?._id ? teamA : teamB) : null
	)

	return (
		<h3 className="text-base font-semibold text-start flex items-center gap-2">
			<b>Last point got:</b>
			<span>{team?.name}</span>
		</h3>
	)
}

export { LiveScore, LastPoint }
