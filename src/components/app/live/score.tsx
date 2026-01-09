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

export { LiveScore }
