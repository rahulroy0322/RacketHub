import type { FC } from 'react'
import { TeamCard } from '@/components/app/team'
import { mockTeams } from '@/data/team'
import { Route } from '@/routes/tournaments/$id/teams'

const { useParams } = Route

const TeamsPage: FC = () => {
	const { id } = useParams()

	const teams = mockTeams.filter((t) => t.tournamentId === id)

	return (
		<div className="max-w-md mx-auto space-y-4">
			<h1 className="text-3xl font-bold">Teams</h1>

			{teams.map((t) => (
				<TeamCard
					{...t}
					key={t._id}
				/>
			))}
		</div>
	)
}

export { TeamsPage }
