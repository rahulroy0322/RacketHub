import { Link } from '@tanstack/react-router'
import type { FC } from 'react'
import { MatchCard } from '@/components/app/match'
import { Route } from '@/routes/tournaments/$id/matches'
import type { TeamType } from '@/types'

const { useParams, useLoaderData } = Route

const MatchesPage: FC = () => {
	const { id } = useParams()

	const matches = useLoaderData()

	return (
		<div className="max-w-md mx-auto flex flex-col gap-4">
			<h1 className="text-3xl font-bold">Matches</h1>

			{matches.map((match) => (
				<Link
					key={match._id}
					params={{
						id,
						matchId: match._id,
					}}
					to="/tournaments/$id/$matchId/match"
				>
					<MatchCard
						{...match}
						teamAName={(match.teamAId as unknown as TeamType).name}
						teamBName={(match.teamBId as unknown as TeamType).name}
					/>
				</Link>
			))}
		</div>
	)
}

export { MatchesPage }
