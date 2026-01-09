import { type FC, type ReactNode, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { pointTypes, ralyTypes, serviceTypes } from '@/constants/type'
import useLive, { setTeamId } from '@/stores/live.store'
import { ControllButton } from './button'
import { TeamName } from './team'

type ControlsSectionPropsType = {
	children: ReactNode
	title: string
}

const ControlsSection: FC<ControlsSectionPropsType> = ({ children, title }) => (
	<div className="flex flex-col gap-1">
		<strong>{title} :</strong>
		<div className="grid gap-1 grid-cols-2">{children}</div>
	</div>
)

type LiveControlsPropsType = {
	matchId: string
}
const LiveControls: FC<LiveControlsPropsType> = ({ matchId }) => {
	return (
		<Card>
			<TeamName />
			<CardContent className="space-y-2">
				<ControlsSection title="Point">
					{pointTypes.map((point) => (
						<ControllButton
							key={point}
							matchId={matchId}
							point={point}
						/>
					))}
				</ControlsSection>

				<ControlsSection title="Rally">
					{ralyTypes.map((point) => (
						<ControllButton
							key={point}
							matchId={matchId}
							point={point}
						/>
					))}
				</ControlsSection>

				<ControlsSection title="Service">
					{serviceTypes.map((point) => (
						<ControllButton
							key={point}
							matchId={matchId}
							point={point}
						/>
					))}
				</ControlsSection>
			</CardContent>
		</Card>
	)
}

const TeamControls: FC = () => {
	const { teamA, teamB, teamId } = useLive()

	const setTeamA = useCallback(() => {
		setTeamId(teamA?._id || null)
	}, [teamA?._id])

	const setTeamB = useCallback(() => {
		setTeamId(teamB?._id || null)
	}, [teamB?._id])

	if (!teamA || !teamB) {
		return null
	}

	return (
		<div className="grid-cols-2 grid gap-1 bg-secondary-foreground/20 p-1 rounded-md">
			<Button
				onClick={setTeamA}
				variant={teamId && teamId === teamA._id ? 'outline' : 'default'}
			>
				{teamA.name}
			</Button>
			<Button
				onClick={setTeamB}
				variant={teamId && teamId === teamB._id ? 'outline' : 'default'}
			>
				{teamB.name}
			</Button>
		</div>
	)
}

export { LiveControls, TeamControls }
