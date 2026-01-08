import type { FC } from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { MatchStatusType, TournamentStatusType } from '@/types'

const colors = {
	upcoming: 'bg-blue-500',
	live: 'bg-green-500',
	completed: 'bg-gray-500',
	scheduled: 'bg-blue-500',
}

type StatusBadgePropsType = { status: TournamentStatusType | MatchStatusType }

const StatusBadge: FC<StatusBadgePropsType> = ({ status }) => (
	<Badge className={cn('text-white uppercase', colors[status])}>{status}</Badge>
)
export { StatusBadge }
