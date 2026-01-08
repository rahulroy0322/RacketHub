import { Link } from '@tanstack/react-router'
import { Antenna, Calendar, LocateFixed, MessageCircleMore } from 'lucide-react'
import type { FC } from 'react'
import { StatusBadge } from '@/components/app/status'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { mockMatches } from '@/data/match'
import { mockTeams } from '@/data/team'
import { mockTournaments } from '@/data/tournament'
import { Route } from '@/routes/tournaments/$id/$matchId/match'
import type { TeamType } from '@/types'

const { useParams } = Route

type TeamScorePropsType = Pick<TeamType, 'name' | 'players'> & {
	score: number
}

const TeamScore: FC<TeamScorePropsType> = ({ name, players, score }) => (
	<Card>
		<CardHeader>
			<CardTitle>{name}</CardTitle>
			<CardDescription className="space-y-2">
				{players.map((p) => (
					<Badge
						className="text-xs"
						key={p}
						variant={'outline'}
					>
						{p}
					</Badge>
				))}
			</CardDescription>
		</CardHeader>
		<CardContent>
			<p className="flex items-center gap-2">
				<b>Point:</b>
				<span>{score}</span>
			</p>
		</CardContent>
	</Card>
)

type TeamScoresPropsType = {
	aId: TeamType['_id']
	bId: TeamType['_id']
}

const TeamScores: FC<TeamScoresPropsType> = ({ aId, bId }) => {
	const [teamA, teamB] = [
		// biome-ignore lint/style/noNonNullAssertion: checked
		mockTeams.find((t) => t._id === aId)!,
		// biome-ignore lint/style/noNonNullAssertion: checked
		mockTeams.find((t) => t._id === bId)!,
	]

	return (
		<div className="grid grid-cols-2 gap-2">
			<TeamScore
				{...teamA}
				score={0}
			/>
			<TeamScore
				{...teamB}
				score={0}
			/>
		</div>
	)
}

const MatchPage: FC = () => {
	const { id, matchId } = useParams()
	const tournament = mockTournaments.find((t) => t._id === id)
	const match = mockMatches.find((m) => m._id === matchId)

	if (!match || !tournament) {
		return null
	}

	const { status, teamAId, teamBId, time } = match
	const { location } = tournament

	const [teamA, teamB] = [
		mockTeams.find((t) => t._id === teamAId),
		mockTeams.find((t) => t._id === teamBId),
	]

	if (!teamA || !teamB) {
		return null
	}

	return (
		<div className="max-w-md mx-auto space-y-4">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center justify-between">
						<span>
							{teamA.name} VS {teamB.name}
						</span>
						<StatusBadge status={status} />
					</CardTitle>
					<CardDescription className="space-y-2 text-base">
						<p className="flex items-center gap-2">
							<span>
								<Calendar />
							</span>
							<span>{new Date(time).toLocaleTimeString()}</span>
						</p>
						<p className="flex items-center gap-2">
							<span>
								<LocateFixed />
							</span>
							<span>{location}</span>
						</p>
					</CardDescription>
				</CardHeader>
			</Card>

			{(status === 'live' || status === 'completed') && (
				<TeamScores
					aId={teamAId}
					bId={teamBId}
				/>
			)}

			<div className="flex items-center gap-2">
				<Button
					asChild
					className="h-24 flex flex-col gap-2 flex-1"
					variant="outline"
				>
					<Link
						params={{
							id,
							matchId,
						}}
						to="/tournaments/$id/$matchId/comentary"
					>
						<MessageCircleMore className="size-6" />
						<span>Commentary</span>
					</Link>
				</Button>

				<Button
					asChild
					className="h-24 flex flex-col gap-2 flex-1"
					variant="outline"
				>
					<Link
						params={{
							id,
							matchId,
						}}
						to="/tournaments/$id/$matchId/events"
					>
						<Antenna className="size-6" />
						<span>Event</span>
					</Link>
				</Button>
			</div>
		</div>
	)
}

export { MatchPage }
