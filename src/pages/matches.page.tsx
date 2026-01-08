import { Link } from '@tanstack/react-router'
import type { FC } from 'react'
import { MatchCard, type MatchCardPropsType } from '@/components/app/match'
import { mockMatches } from '@/data/match'
import { mockTeams } from '@/data/team'
import { Route } from '@/routes/tournaments/$id/matches'

const { useParams } = Route

const MatchesPage: FC = () => {
	const { id } = useParams()

	const tournamentMatches = mockMatches
		.filter((m) => m.tournamentId === id)
		.map(({ _id, time, status, scoreA, scoreB, teamAId, teamBId }) => {
			const teamAName = mockTeams.find((t) => t._id === teamAId)?.name || ''
			const teamBName = mockTeams.find((t) => t._id === teamBId)?.name || ''
			return {
				_id,
				time,
				status,
				scoreA,
				scoreB,
				teamAName,
				teamBName,
			} satisfies MatchCardPropsType & {
				_id: string
			}
		})

	return (
		<div className="max-w-md mx-auto flex flex-col gap-4">
			<h1 className="text-3xl font-bold">Matches</h1>

			{tournamentMatches.map((m) => (
				<Link
					key={m._id}
					params={{
						id,
						matchId: m._id,
					}}
					to="/tournaments/$id/$matchId/match"
				>
					<MatchCard {...m} />
				</Link>
			))}
		</div>
	)
}

export { MatchesPage }
