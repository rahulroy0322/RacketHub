import type { FC } from 'react'
import { AdminForm } from '@/components/app/form/admin'
import { CreateTournamentForm } from '@/components/app/forms/tournament'

const TournamentPage: FC = () => (
	<AdminForm
		description="Configure tournament details"
		title="Create New Tournament"
	>
		<CreateTournamentForm />
	</AdminForm>
)

export { TournamentPage }
