import type { FC } from 'react'
import { AdminForm } from '@/components/app/form/admin'
import { CreateMatchForm } from '@/components/app/forms/match'

const MatchPage: FC = () => (
	<AdminForm
		description="Schedule a match between teams"
		title="Create New Match"
	>
		<CreateMatchForm />
	</AdminForm>
)

export { MatchPage }
