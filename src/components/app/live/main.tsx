import {
	type FC,
	type FormEvent,
	useCallback,
	useId,
} from 'react'
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
import { Route } from '@/routes/tournaments/$id/$matchId/events'
import useLive from '@/stores/live.store'
import { CompleateButton } from './button'
import { LiveControls, TeamControls } from './controlls'
import { LastPoint, LiveScore } from './score'

const { useParams } = Route

const defaultPoints = [3, 5, 7, 14, 21, 29] as const

const pointToMsg = {
	'3': 'Three',
	'5': 'Five',
	7: 'Seven',
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
				placeholder="points to win the match"
				list={id}
				required
				name="points"
				defaultValue={defaultPoint}
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

const StartGame: FC = () => {
	const teamA = useLive((state) => state.teamA)
	const teamB = useLive((state) => state.teamB)

	const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.target as HTMLFormElement)

		const select = formData.get('select')
		const points = Number(formData.get('points') || '0')

		if (!select || !points) {
			toast.error('Please fill every thing')
			return
		}

		useLive.setState({
			lastPoint: select as string,
			maxPoints: points,
		})
	}, [])

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
					className="space-y-3"
					onSubmit={handleSubmit}
				>
					<Select
						required
						name="select"
					>
						<SelectTrigger>
							<SelectValue placeholder="Select Team?" />
						</SelectTrigger>
						<SelectContent>
							{[teamA, teamB].map((team) => (
								<SelectItem
									value={team?._id ?? ''}
									key={team?._id || ''}
								>
									{team?.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<GamePoint />

					<Button>Start Game</Button>
				</form>
			</CardContent>
		</Card>
	)
}

const Content: FC = () => {
	const { matchId } = useParams()
	const notInit = useLive((state) => state.lastPoint === null)

	if (notInit) {
		return <StartGame />
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
