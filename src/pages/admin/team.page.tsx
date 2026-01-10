import type { FC } from 'react'
import { AdminForm } from '@/components/app/form/admin'
import { CreateTeamForm } from '@/components/app/forms/team'

const TeamPage: FC = () => (
	<AdminForm
		description="Set up your team with players"
		title="Create New Team"
	>
		<CreateTeamForm />
	</AdminForm>
)

export { TeamPage }
