import type { FC } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Route } from '@/routes/tournaments/$id/$matchId/events'
import type { CommentaryType, TeamType } from '@/types'
import { GoBack } from './button'

const { useLoaderData, useParams } = Route

const getWonTeam = ({
	comments,
	teamA,
	teamB,
}: {
	comments: CommentaryType[]
	teamA: TeamType
	teamB: TeamType
}) => {
	const lastComment = comments.at(0)

	if (!lastComment) {
		// This should not called
		return null
	}

	const wonTeamId = lastComment.teamId

	if (teamA._id === wonTeamId) {
		return teamA
	}

	if (teamB._id === wonTeamId) {
		return teamB
	}

	return null
}

const Compleated: FC = () => {
	const { id, matchId } = useParams()
	const { comments, teamAId, teamBId } = useLoaderData()

	const wonTeam = getWonTeam({
		comments,
		teamA: teamAId as unknown as TeamType,
		teamB: teamBId as unknown as TeamType,
	})

	if (!wonTeam) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Something went wrong</CardTitle>
					<CardDescription>
						please let the developer know that is happened
					</CardDescription>
				</CardHeader>
				<CardContent>
					<h3>
						shear Tournament Id: {id}
						<br /> and Match Id: {matchId}
					</h3>
				</CardContent>
			</Card>
		)
	}

	return (
		<div className="max-w-md mx-auto space-y-4">
			<Card>
				<CardContent className="py-12 text-center space-y-4">
					<p className="text-slate-500">
						Matches Is Over and The{' '}
						<code className="text-primary-foreground bg-primary px-1 py-0.5 rounded">{wonTeam.name}</code> team had own
						the match.
					</p>
					<GoBack />
				</CardContent>
			</Card>
		</div>
	)
}

export { Compleated }
