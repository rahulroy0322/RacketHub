import { Link } from '@tanstack/react-router'
import type { FC } from 'react'
import { TournamentCart } from '@/components/app/tournament'
import { mockTournaments } from '@/data/tournament'

const TournamentsPage: FC = () => (
	<div className="max-w-md mx-auto flex flex-col gap-6">
		<h1 className="text-3xl font-bold text-slate-900">Tournaments</h1>

		{mockTournaments.map((t) => (
			<Link
				key={t._id}
				params={{
					id: t._id,
				}}
				to="/tournaments/$id"
			>
				<TournamentCart
					{...t}
					key={t._id}
				/>
			</Link>
		))}
	</div>
)

export { TournamentsPage }
