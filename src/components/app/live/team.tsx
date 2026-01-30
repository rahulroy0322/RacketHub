import type { FC } from 'react'
import { CardHeader, CardTitle } from '@/components/ui/card'
import useLive from '@/stores/live.store'

const TeamName: FC = () => {
	const team = useLive(({ teamId, teamA, teamB }) => {
		if (!teamId || !teamA || !teamB) {
			return null
		}

		if (teamA._id === teamId) {
			return teamA
		}

		if (teamB._id === teamId) {
			return teamB
		}
	})

	if (!team) {
		return null
	}

	const { name } = team

	return (
		<CardHeader>
			<CardTitle>{name}</CardTitle>
			{/* {location ? <CardDescription>{location}</CardDescription> : null} */}
		</CardHeader>
	)
}

export { TeamName }
