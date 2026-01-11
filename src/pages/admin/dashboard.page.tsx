import { Link } from '@tanstack/react-router'
import type { FC, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Route } from '@/routes/admin/dashboard'

const { useLoaderData } = Route

const DashBoardPage: FC = () => {
	const { tournaments, teams, matchs, players } = useLoaderData()

	return (
		<div>
			<div className="grid grid-cols-2 gap-1.5">
				<AdminCard
					description="Total Tournaments"
					title="Tournaments"
				>
					{tournaments}
				</AdminCard>

				<AdminCard
					description="Total Matches"
					title="Matches"
				>
					{matchs}
				</AdminCard>
				<AdminCard
					description="Total Teams"
					title="Teams"
				>
					{teams}
				</AdminCard>

				<AdminCard
					description="Total Players"
					title="Players"
				>
					{players}
				</AdminCard>
			</div>

			<div className="grid grid-cols-2 gap-2">
				<Button
					asChild
					variant="link"
				>
					<Link to="/admin/tournament">Create New Tournament</Link>
				</Button>
				<Button
					asChild
					variant="link"
				>
					<Link to="/admin/team">Create New Team</Link>
				</Button>

				<Button
					asChild
					variant="link"
				>
					<Link to="/admin/player">Create New Player</Link>
				</Button>
				<Button
					asChild
					variant="link"
				>
					<Link to="/admin/tournaments">Go To Tournaments Page</Link>
				</Button>
			</div>
		</div>
	)
}

type AdminCardPropsType = {
	title: string
	description: string
	children: ReactNode
}

const AdminCard: FC<AdminCardPropsType> = ({
	description,
	title,
	children,
}) => {
	return (
		<div>
			<div>
				<Card>
					<CardHeader>
						<CardTitle>{title}</CardTitle>
						<CardDescription>{description}</CardDescription>
						<CardContent>
							<strong>{children}</strong>
						</CardContent>
					</CardHeader>
				</Card>
			</div>
		</div>
	)
}

export { DashBoardPage }
