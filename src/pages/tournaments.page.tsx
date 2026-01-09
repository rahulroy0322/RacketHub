import type { FC } from 'react'
import { TournamentCart } from '@/components/app/tournament'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Route } from '@/routes/tournaments'

const { useLoaderData } = Route

const TournamentsPage: FC = () => {
	const tournaments = useLoaderData()

	return (
		<div className="max-w-md mx-auto flex flex-col gap-6">
			<h1 className="text-3xl font-bold text-slate-900">Tournaments</h1>

			{!tournaments || !tournaments.length ? (
				<Card>
					<CardHeader>
						<CardTitle>No Tournaments Were Found</CardTitle>
					</CardHeader>
				</Card>
			) : (
				tournaments.map((t) => (
					<TournamentCart
						{...t}
						key={t._id}
					/>
				))
			)}
		</div>
	)
}

export { TournamentsPage }
