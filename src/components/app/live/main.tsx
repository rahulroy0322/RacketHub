import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { type FC, type FormEvent, useCallback, useId } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { startMatch } from '@/data/main'
import { sendComment } from '@/io/main'
import { Route } from '@/routes/tournaments/$id/$matchId/events'
import useLive from '@/stores/live.store'
import type { TeamType } from '@/types'
import { CompleateButton } from './button'
import { LiveControls, TeamControls } from './controlls'
import { LastPoint, LiveScore } from './score'
import { commentToIoComment, makeComment } from './utils'

const { useParams } = Route

const defaultPoints = [3, 5, 7, 14, 21, 29] as const

const pointToMsg = {
	'3': 'Three',
	'5': 'Five',
	'7': 'Seven',
	'14': 'FourTeen',
	'21': 'Twenty One',
	'29': 'Twenty Nine',
} satisfies Record<(typeof defaultPoints)[number], string>

const defaultPoint = 21

const GamePoint: FC = () => {
	const id = useId()

	return (
		<div>
			<Input
				defaultValue={defaultPoint}
				list={id}
				name="points"
				placeholder="points to win the match"
				required
			/>

			<datalist id={id}>
				{defaultPoints.map((value) => (
					<option
						key={value}
						value={value}
					>
						{pointToMsg[value]}
					</option>
				))}
			</datalist>
		</div>
	)
}

const StartGame: FC<{
	matchId: string
}> = ({ matchId }) => {
	const router = useRouter()
	const teamA = useLive((state) => state.teamA)
	const teamB = useLive((state) => state.teamB)

	const { isPending, mutate } = useMutation({
		mutationKey: ['match', teamA?._id, teamB?._id],
		mutationFn: async ({
			servisTeamId,
			maxPoint,
		}: {
			servisTeamId: TeamType['_id']
			maxPoint: number
		}) =>
			toast.promise(
				async () => {
					const data = makeComment({
						scoreA: 0,
						scoreB: 0,
						teamId: servisTeamId,
						type: 'toss',
						text: `Team "${teamA?._id === servisTeamId ? teamA.name : teamB?.name}" had got service`,
					})

					const res = await startMatch(matchId, {
						data,
						maxPoint,
					})

					if (!res) {
						throw new Error('some thing went wrong')
					}

					if ('error' in res) {
						throw new Error(res.error.message)
					}

					return data
				},
				{
					loading: 'Starting Match',
					success: (data) => {
						router.invalidate({
							sync: true,
						})
						sendComment({
							type: data.type,
							matchId,
							data: commentToIoComment(data),
						})
						return 'Now The Match Started'
					},
					error: (e: Error) => {
						console.error(e)
						const { message } = e

						return (
							<div>
								<b>Error Starting Match</b>
								<p>{message}</p>
							</div>
						)
					},
				}
			),
	})

	const handleSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault()

			const formData = new FormData(e.target as HTMLFormElement)

			const select = formData.get('select')
			const maxPoint = Number(formData.get('points') || '0')

			if (!select || !maxPoint) {
				toast.error('Please fill every thing')
				return
			}

			mutate({
				maxPoint,
				servisTeamId: select as string,
			})
		},
		[mutate]
	)

	if (useLive.getState().scoreA || useLive.getState().scoreB) {
		return (
			<Card className="text-destructive border-destructive bg-transparent">
				<CardHeader>
					<CardTitle>Some thing went wrong</CardTitle>
					<CardDescription className="text-inherit">
						if this existes after refresh then let the developer know
					</CardDescription>
				</CardHeader>
				<CardContent>Please Refresh to resolve this isshue</CardContent>
			</Card>
		)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Which one team won serve?</CardTitle>
				<CardDescription>Select the team which one took serve?</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					aria-disabled={isPending}
					className="space-y-3"
					onSubmit={handleSubmit}
				>
					<Select
						name="select"
						required
					>
						<SelectTrigger>
							<SelectValue placeholder="Select Team?" />
						</SelectTrigger>
						<SelectContent>
							{[teamA, teamB].map((team) => (
								<SelectItem
									key={team?._id || ''}
									value={team?._id ?? ''}
								>
									{team?.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<GamePoint />

					<Button
						aria-disabled={isPending}
						disabled={isPending}
						type="submit"
					>
						Start Game
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}

const Content: FC = () => {
	const { matchId } = useParams()
	const notInit = useLive((state) => state.lastPoint === null)

	if (notInit) {
		return <StartGame matchId={matchId} />
	}

	return (
		<>
			<TeamControls />

			<LiveControls matchId={matchId} />
		</>
	)
}

const Live: FC = () => {
	const { matchId, id } = useParams()

	return (
		<div className="max-w-md mx-auto space-y-4">
			<Card className="relative">
				<CardHeader>
					<CardTitle>Live Match</CardTitle>
					<CardDescription>Control panel for active match</CardDescription>
				</CardHeader>
				<CardContent>
					<CompleateButton
						matchId={matchId}
						tournamentId={id}
					/>
					<LiveScore />
					<LastPoint />
				</CardContent>
			</Card>

			<Content />
		</div>
	)
}

export { Live }
