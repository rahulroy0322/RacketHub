import { UserRound } from 'lucide-react'
import type { FC } from 'react'
import type { TeamType } from '@/types'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card'

type TeamCardPropsType = Pick<TeamType, 'name' | 'players'>

const TeamCard: FC<TeamCardPropsType> = ({ name, players }) => (
	<Card>
		<CardHeader>
			<CardTitle>{name}</CardTitle>
			<CardDescription>Players</CardDescription>
		</CardHeader>
		<CardContent className="grid grid-cols-2 gap-4">
			{players.map(({ _id, name }) => (
				<div
					className="flex items-center gap-4 bg-blue-300/50 p-2 rounded-md"
					key={_id}
				>
					<UserRound className="size-6" />
					<span>{name}</span>
				</div>
			))}
		</CardContent>
	</Card>
)

export { TeamCard }
