import { AlarmClock } from 'lucide-react'
import type { FC } from 'react'
import { isToday } from '@/lib/date'
import type { MatchType } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { StatusBadge } from './status'

const { format } = Intl.DateTimeFormat(undefined, {
	timeStyle: 'short',
})

type MatchCardPropsType = Pick<
	MatchType,
	'status' | 'time' | 'scoreA' | 'scoreB'
> & {
	teamAName: string
	teamBName: string
}
const MatchCard: FC<MatchCardPropsType> = ({
	status,
	time,
	scoreA,
	scoreB,
	teamAName,
	teamBName,
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="flex justify-between items-center">
				<StatusBadge status={status} />
				{status !== 'completed' && isToday(time) ? (
					<span className="text-sm text-slate-600 flex gap-2 items-center">
						<AlarmClock className="size-6" />
						{format(new Date(time))}
					</span>
				) : null}
			</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="space-y-4">
				<div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
					<span className="font-semibold text-lg">{teamAName}</span>
					<span className="text-2xl font-bold text-slate-900">{scoreA}</span>
				</div>
				<div className="text-center text-slate-400 font-semibold">VS</div>
				<div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
					<span className="font-semibold text-lg">{teamBName}</span>
					<span className="text-2xl font-bold text-slate-900">{scoreB}</span>
				</div>
			</div>
		</CardContent>
	</Card>
)

export type { MatchCardPropsType }

export { MatchCard }
