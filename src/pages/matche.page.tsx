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
import { Route } from '@/routes/tournaments/$id/$matchId/match'
import useLive from '@/stores/live.store'
import type { MatchType, TeamType } from '@/types'

const { useLoaderData, useParams } = Route

type TeamScorePropsType = Pick<TeamType, 'name' | 'players'> & {
	score: number
}

const TeamScore: FC<TeamScorePropsType> = ({ name, players, score }) => (
	<Card>
		<CardHeader>
			<CardTitle>{name}</CardTitle>
			<CardDescription className="space-y-2">
				{players.map(({ _id, name }) => (
					<Badge
						className="text-xs"
						key={_id}
						variant={'outline'}
					>
						{name}
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

const TeamScores: FC = () => {
	const teamA = useLive((state) => state.teamA)
	const teamB = useLive((state) => state.teamB)
	const scoreA = useLive((state) => state.scoreA)
	const scoreB = useLive((state) => state.scoreB)

	if (!teamA || !teamB) {
		return null
	}

	return (
		<div className="grid grid-cols-2 gap-2">
			<TeamScore
				{...teamA}
				score={scoreA}
			/>
			<TeamScore
				{...teamB}
				score={scoreB}
			/>
		</div>
	)
}

const MatchPage: FC = () => {
	const { id, matchId } = useParams()

	const {
		teamAId: { name: teamAName },
		teamBId: { name: teamBName },
		status,
		time,
		location,
	} = useLoaderData() as unknown as Omit<MatchType, 'teamAId' | 'teamBId'> & {
		teamAId: TeamType
		teamBId: TeamType
	}

	return (
		<div className="max-w-md mx-auto space-y-4">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center justify-between">
						<span>
							{teamAName} VS {teamBName}
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

			{(status === 'live' || status === 'completed') && <TeamScores />}

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
