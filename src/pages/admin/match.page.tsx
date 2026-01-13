import type { FC } from 'react'
import { AdminForm } from '@/components/app/forms/admin'
import { CreateMatchForm } from '@/components/app/forms/match'
import { Route } from '@/routes/admin/$id/match'

const { useLoaderData } = Route

const MatchPage: FC = () => {
	const tournament = useLoaderData()

	return (
		<AdminForm
			description="Schedule a match between teams"
			title="Create New Match"
		>
			<CreateMatchForm tournament={tournament} />
		</AdminForm>
	)
}

export { MatchPage }
