import type { FC } from 'react'
import { AdminForm } from '@/components/app/form/admin'
import { CreateTeamForm } from '@/components/app/forms/team'
import { Route } from '@/routes/admin/team'

const { useLoaderData } = Route

const TeamPage: FC = () => {
	const players = useLoaderData()

	return (
		<AdminForm
			description="Set up your team with players"
			title="Create New Team"
		>
			<CreateTeamForm players={players} />
		</AdminForm>
	)
}

export { TeamPage }
