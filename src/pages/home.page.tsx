import { Link } from '@tanstack/react-router'
import type { FC } from 'react'
import { TournamentCart } from '@/components/app/tournament'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Route } from '@/routes/index'

const { useLoaderData } = Route

const HomePage: FC = () => {
	const tournaments = useLoaderData()

	return (
		<div className="max-w-md mx-auto space-y-6 py-8">
			<div className="text-center space-y-4">
				<h2 className="text-4xl font-bold text-slate-900">🎾 RacketHub</h2>
				<p className="text-lg text-slate-600">
					Your ultimate platform for hosting and following racket sports
					tournaments
				</p>
				<Button
					asChild
					className="w-full mt-6"
					size="lg"
				>
					<Link to="/tournaments">View Tournaments</Link>
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Upcoming Tournaments</CardTitle>
					<CardDescription>Don't miss out on the action</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3">
					{tournaments.map((t) => (
						<TournamentCart
							{...t}
							key={t._id}
						/>
					))}
				</CardContent>
			</Card>
		</div>
	)
}

export { HomePage }
