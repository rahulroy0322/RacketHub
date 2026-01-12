import { useMutation } from '@tanstack/react-query'
import { Link, useRouter } from '@tanstack/react-router'
import { Edit, Link2, PlusCircle, Trash2 } from 'lucide-react'
import type { FC } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { destroyTournament } from '@/data/main'
import { Route } from '@/routes/admin/tournaments'

const { useLoaderData } = Route

type DestroyButtonPropsType = {
	id: string
	name: string
}

const DestroyButton: FC<DestroyButtonPropsType> = ({ name, id }) => {
	const router = useRouter()
	const { isPending, mutate } = useMutation({
		mutationKey: ['tournament', id],
		mutationFn: async () => {
			toast.promise(
				async () => {
					const data = await destroyTournament(id)

					if (!data) {
						throw new Error('some thing went wrong')
					}

					if ('error' in data) {
						if ('message' in data.error) {
							throw data.error
						}
						throw new Error(data.error)
					}
				},
				{
					loading: `Deleting ${name}...`,
					success: () => {
						router.invalidate({
							sync: true,
						})

						return `Tournament "${name}" Deleted.`
					},
					error: ({ message }: Error) => (
						<div>
							<b>Error :</b>
							<span>{message}</span>
						</div>
					),
				}
			)
		},
	})

	return (
		<Button
			disabled={isPending}
			onClick={mutate as unknown as () => void}
			size={'icon-sm'}
			variant={'destructive'}
		>
			<Trash2 size={15} />
		</Button>
	)
}

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
										<DestroyButton
											id={_id}
											name={name}
										/>
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
