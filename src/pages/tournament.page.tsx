import { useMutation } from '@tanstack/react-query'
import { Link, useRouter } from '@tanstack/react-router'
import { Calendar, LocateFixed, Trophy, UsersRound } from 'lucide-react'
import type { FC, ReactNode } from 'react'
import { toast } from 'sonner'
import { StatusBadge } from '@/components/app/status'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { updateTournament } from '@/data/main'
import { cn } from '@/lib/utils'
import { Route } from '@/routes/tournaments/$id/index'
import type { TournamentStatusType } from '@/types'

const { useLoaderData } = Route

type TournamentStatusButtonPropsType = {
	status: Exclude<TournamentStatusType, 'upcoming'>
	children: ReactNode
	loading: ReactNode
	success: ReactNode
	error: (e: Error) => ReactNode
	touranmentId: string
} & Parameters<typeof Button>[0]

const TournamentStatusButton: FC<TournamentStatusButtonPropsType> = ({
	status,
	children,
	className,
	success,
	loading,
	error,
	touranmentId,
	...props
}) => {
	const router = useRouter()
	const { isPending, mutate } = useMutation({
		mutationKey: ['tournament', touranmentId],
		mutationFn: async () => {
			toast.promise(
				async () => {
					const data = await updateTournament(touranmentId, {
						status,
					})

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
					loading,
					success: () => {
						router.invalidate({
							sync: true,
						})

						return success
					},
					error,
				}
			)
		},
	})

	return (
		<Button
			className={cn('border-current shadow shadow-current', className)}
			disabled={isPending}
			onClick={mutate as unknown as () => void}
			{...props}
		>
			{children}
		</Button>
	)
}

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
					<CardDescription className="justify-between flex items-end">
						<div className="space-y-2 text-base">
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
						</div>
						{!!(status === 'upcoming') && (
							<TournamentStatusButton
								error={({ message }) => (
									<div>
										<p>Error :</p>
										<span>{message}</span>
									</div>
								)}
								loading={'Making Touranment Live'}
								status="live"
								success={'Now Tournament Live'}
								touranmentId={_id}
							>
								Go Live
							</TournamentStatusButton>
						)}
						{!!(status === 'live') && (
							<TournamentStatusButton
								error={({ message }) => (
									<div>
										<p>Error :</p>
										<span>{message}</span>
									</div>
								)}
								loading={'Making Touranment Compleat'}
								status="completed"
								success={'Tournament Ended'}
								touranmentId={_id}
							>
								Compleated
							</TournamentStatusButton>
						)}
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
				{status === 'upcoming' ? null : (
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
				)}
			</div>

			<div>{description || 'No description'}</div>
		</div>
	)
}

export { TournamentPage }
