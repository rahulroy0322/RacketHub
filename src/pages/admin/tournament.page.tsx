import type { FC } from 'react'
import { AdminForm } from '@/components/app/forms/admin'
import { CreateTournamentForm } from '@/components/app/forms/tournament'
import { Route } from '@/routes/admin/tournament'

const { useLoaderData } = Route

const TournamentPage: FC = () => {
	const teams = useLoaderData()

	return (
		<AdminForm
			description="Configure tournament details"
			title="Create New Tournament"
		>
			<CreateTournamentForm teams={teams} />
		</AdminForm>
	)
}

export { TournamentPage }
