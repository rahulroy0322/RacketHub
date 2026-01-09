import type { FC } from 'react'
import { TeamCard } from '@/components/app/team'
import { Route } from '@/routes/tournaments/$id/teams'
import type { TeamType } from '@/types'

const { useLoaderData } = Route

const TeamsPage: FC = () => {
	const { teams } = useLoaderData()

	return (
		<div className="max-w-md mx-auto space-y-4">
			<h1 className="text-3xl font-bold">Teams</h1>
			{(teams as unknown as TeamType[]).map((t) => (
				<TeamCard
					{...t}
					key={t._id}
				/>
			))}
		</div>
	)
}

export { TeamsPage }
