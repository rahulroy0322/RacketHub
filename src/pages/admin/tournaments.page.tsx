import { Link } from '@tanstack/react-router'
import { Edit, Link2, PlusCircle, Trash2 } from 'lucide-react'
import type { FC } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Route } from '@/routes/admin/tournaments'

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
				<Table className="text-center">
					<TableHeader>
						<TableRow>
							<TableHead className="text-center">Name</TableHead>
							<TableHead className="text-center">Status</TableHead>
							<TableHead className="text-center">Start Date</TableHead>

							<TableHead className="text-center">Go</TableHead>
							<TableHead className="text-center">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{tournaments.map(({ _id, name, status, startDate }) => (
							<TableRow key={_id}>
								<TableCell>
									<Link
										params={{
											id: _id,
										}}
										to="/admin/$id/match"
									>
										{name}
									</Link>
								</TableCell>
								<TableCell>
									<Badge
										variant={
											status === 'live'
												? 'outline'
												: status === 'completed'
													? 'default'
													: 'secondary'
										}
									>
										{status}
									</Badge>
								</TableCell>
								<TableCell>
									{Intl.DateTimeFormat(undefined, {
										dateStyle: 'medium',
									}).format(new Date(startDate))}
								</TableCell>

								<TableCell>
									<div className="flex items-center justify-center">
										<Link
											params={{
												id: _id,
											}}
											to="/tournaments/$id"
										>
											<Link2 size={15} />
										</Link>
									</div>
								</TableCell>
								<TableCell>
									<div className="flex gap-1 justify-center items-center">
										<Link to="/">
											<Edit size={15} />
										</Link>

										<Link
											params={{
												id: _id,
											}}
											to="/admin/$id/match"
										>
											<PlusCircle size={15} />
										</Link>
										{/* 
<Link to='/admin/$id/match' params={{
	id: _id
}}> */}
										<Trash2
											className="text-destructive"
											size={15}
										/>
										{/* </Link> */}
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</div>
	)
}

export { TournamentsPage }
