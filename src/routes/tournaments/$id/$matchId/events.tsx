import { createFileRoute } from '@tanstack/react-router'
import type { FC } from 'react'
import { TeamControls } from '@/components/app/controlls'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

const EventsPage: FC = () => {
	// const { matches, addPoint, addFoul, undoLastAction } = useApp();
	// const liveMatch = matches.find(m => m.tournamentId === tournamentId && m.status === 'live');

	const liveMatch = true

	if (!liveMatch) {
		return (
			<div className="max-w-md mx-auto space-y-4">
				<Card>
					<CardContent className="py-12 text-center">
						<p className="text-slate-500">
							Matches Is Not Live. Events controls will appear when a match is
							live.
						</p>
					</CardContent>
				</Card>
			</div>
		)
	}

	return (
		<div className="max-w-md mx-auto space-y-4">
			<Card>
				<CardHeader>
					<CardTitle>Live Match</CardTitle>
					<CardDescription>Control panel for active match</CardDescription>
				</CardHeader>
				<CardContent>
					<h3 className="text-3xl font-bold text-center">10 - 15</h3>
				</CardContent>
			</Card>

			<div className="grid-cols-2 grid gap-2">
				<TeamControls teamId={'1'} />
				<TeamControls teamId="2" />
			</div>
		</div>
	)
}

const Route = createFileRoute('/tournaments/$id/$matchId/events')({
	component: EventsPage,
})

export { Route }
