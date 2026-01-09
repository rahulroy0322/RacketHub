import { Link } from '@tanstack/react-router'
import { Calendar, LocateFixed } from 'lucide-react'
import type { FC } from 'react'
import type { TournamentType } from '@/types'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card'
import { StatusBadge } from './status'

type TournamentCartPropsType = Pick<
	TournamentType,
	'name' | 'startDate' | 'status' | 'location' | 'description' | '_id'
>

const TournamentCart: FC<TournamentCartPropsType> = ({
	name,
	status,
	startDate,
	location,
	description,
	_id: id,
}) => (
	<Card className="cursor-pointer hover:bg-slate-100 transition-colors">
		<Link
			params={{
				id,
			}}
			to="/tournaments/$id"
		>
			<CardHeader>
				<CardTitle className="flex items-center justify-between">
					<span>{name}</span>
					<StatusBadge status={status} />
				</CardTitle>
				{/** biome-ignore lint/complexity/noExtraBooleanCast: "" */}
				{!!description ? (
					<CardDescription>{description}</CardDescription>
				) : null}
			</CardHeader>
			<CardContent className="text-sm text-muted-foreground space-y-1">
				<p className="flex gap-2 items-center">
					<span>
						<Calendar />
					</span>
					<span>{new Date(startDate).toLocaleDateString()}</span>
				</p>
				<p className="flex gap-2 items-center">
					<span>
						<LocateFixed />
					</span>
					<span>{location}</span>
				</p>
			</CardContent>
		</Link>
	</Card>
)

export { TournamentCart }
