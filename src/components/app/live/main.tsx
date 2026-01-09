import type { FC } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Route } from '@/routes/tournaments/$id/$matchId/events'
import { LiveControls, TeamControls } from './controlls'
import { LiveScore } from './score'

const { useParams } = Route

const Live: FC = () => {
	const { matchId } = useParams()
	return (
		<div className="max-w-md mx-auto space-y-4">
			<Card>
				<CardHeader>
					<CardTitle>Live Match</CardTitle>
					<CardDescription>Control panel for active match</CardDescription>
				</CardHeader>
				<CardContent>
					<LiveScore />
				</CardContent>
			</Card>

			<TeamControls />

			<LiveControls matchId={matchId} />
		</div>
	)
}

export { Live }
