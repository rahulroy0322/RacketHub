import type { FC } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Route } from '@/routes/tournaments/$id/$matchId/events'
import { CompleateButton } from './button'
import { LiveControls, TeamControls } from './controlls'
import { LiveScore } from './score'

const { useParams } = Route

const Live: FC = () => {
	const { matchId, id } = useParams()
	return (
		<div className="max-w-md mx-auto space-y-4">
			<Card className="relative">
				<CardHeader>
					<CardTitle>Live Match</CardTitle>
					<CardDescription>Control panel for active match</CardDescription>
				</CardHeader>
				<CardContent>
					<CompleateButton
						matchId={matchId}
						tournamentId={id}
					/>
					<LiveScore />
				</CardContent>
			</Card>

			<TeamControls />

			<LiveControls matchId={matchId} />
		</div>
	)
}

export { Live }
