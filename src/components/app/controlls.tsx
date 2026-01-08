import type { FC, ReactNode } from 'react'
import { pointTypes, ralyTypes, serviceTypes } from '@/constants/type'
import { mockTeams } from '@/data/team'
import type { TeamType } from '@/types'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card'
import { ControllButton } from './controllButton'

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

type TeamControlsPropsType = {
	teamId: TeamType['_id']
}

const TeamControls: FC<TeamControlsPropsType> = ({ teamId }) => {
	const team = mockTeams.find((t) => t._id === teamId)

	if (!team) {
		return null
	}

	const { name, location = undefined } = team

	return (
		<Card>
			<CardHeader>
				<CardTitle>{name}</CardTitle>
				{location ? <CardDescription>{location}</CardDescription> : null}
			</CardHeader>
			<CardContent className="space-y-2">
				<ControlsSection title="Point">
					{pointTypes.map((point) => (
						<ControllButton
							key={point}
							point={point}
						/>
					))}
				</ControlsSection>

				<ControlsSection title="Rally">
					{ralyTypes.map((point) => (
						<ControllButton
							key={point}
							point={point}
						/>
					))}
				</ControlsSection>

				<ControlsSection title="Service">
					{serviceTypes.map((point) => (
						<ControllButton
							key={point}
							point={point}
						/>
					))}
				</ControlsSection>
			</CardContent>
		</Card>
	)
}

export { TeamControls }
