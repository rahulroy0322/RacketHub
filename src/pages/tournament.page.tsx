import { Link } from '@tanstack/react-router'
import { Calendar, LocateFixed, Trophy, UsersRound } from 'lucide-react'
import type { FC } from 'react'
import { StatusBadge } from '@/components/app/status'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Route } from '@/routes/tournaments/$id/index'

const { useLoaderData } = Route

const TournamentPage: FC = () => {
	const { _id, name, status, location, startDate, description } =
		useLoaderData()

	return (
		<div className="max-w-md mx-auto space-y-4">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center justify-between">
						<span>{name}</span>
						<StatusBadge status={status} />
					</CardTitle>
					<CardDescription className="space-y-2 text-base">
						<p className="flex items-center gap-2">
							<span>
								<Calendar />
							</span>
							<span>{new Date(startDate).toLocaleDateString()}</span>
						</p>
						<p className="flex items-center gap-2">
							<span>
								<LocateFixed />
							</span>
							<span>{location}</span>
						</p>
					</CardDescription>
				</CardHeader>
			</Card>

			<div className="grid grid-cols-2 gap-3">
				<Button
					asChild
					className="h-24 flex flex-col gap-2"
					variant="outline"
				>
					<Link
						params={{
							id: _id,
						}}
						to="/tournaments/$id/teams"
					>
						<UsersRound className="size-6" />
						<span>Teams</span>
					</Link>
				</Button>
				<Button
					asChild
					className="h-24 flex flex-col gap-2"
					variant="outline"
				>
					<Link
						params={{
							id: _id,
						}}
						to="/tournaments/$id/matches"
					>
						<Trophy className="size-6" />
						<span>Matches</span>
					</Link>
				</Button>
			</div>

			<div>{description || 'No description'}</div>
		</div>
	)
}

export { TournamentPage }
