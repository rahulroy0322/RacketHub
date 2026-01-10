import type { FC } from 'react'
import { AdminForm } from '@/components/app/form/admin'
import { CreatePlayerForm } from '@/components/app/forms/player'

const PlayerPage: FC = () => (
	<AdminForm
		description="Enter player information"
		title="Add New Player"
	>
		<CreatePlayerForm />
	</AdminForm>
)

export { PlayerPage }
