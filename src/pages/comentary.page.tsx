import { type FC, useEffect, useRef } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

import { cn } from '@/lib/utils'
import { Route } from '@/routes/tournaments/$id/$matchId/comentary'
import useComments from '@/stores/comments.store'
import useLive from '@/stores/live.store'
import type { CommentaryType, TeamType } from '@/types'

const { useLoaderData } = Route

const getTeamName = (teamId: TeamType['_id']): null | string => {
	const { teamA, teamB } = useLive.getState()

	if (teamA?._id === teamId) {
		return teamA.name
	}

	if (teamB?._id === teamId) {
		return teamB.name
	}

	return null
}

const Name: FC<Pick<CommentaryType, 'teamId'>> = ({ teamId }) => {
	const name = getTeamName(teamId)
	if (!name) {
		return null
	}
	return <code className="bg-primary p-0.5 px-1.5 rounded">{name}</code>
}

const Commentary: FC<CommentaryType> = ({ text, type, teamId }) => (
	<div
		className={cn(
			'p-3 bg-slate-50 rounded-lg border border-l-4 border-current',
			{
				'text-primary': type === 'toss',
				'text-teal-700': type === 'compleate',
				'text-blue-500': type === 'p:fair',
				'text-destructive': type === 'p:out',
				'text-red-500': type.startsWith('ir:'),
				// 'text-yellow-500 bg-yellow-100': playerId,
			}
		)}
	>
		<div className="text-[10px] text-slate-500 mb-1">{'11:11 Am'}</div>
		<div
			className={cn('text-inherit text-sm', {
				// 'grid grid-cols-5': playerId,
			})}
		>
			{/* {playerId && <span className="font-semibold">{playerId.name}</span>}
			<p className="col-span-4">{text}</p> */}
			<p className="col-span-4 flex items-center gap-2">
				{type === 'toss' || type === 'compleate' ? null : (
					<Name teamId={teamId} />
				)}
				<span>{text}</span>
			</p>
		</div>
	</div>
)

const Comments: FC = () => {
	const comments = useComments((state) => state.comments)

	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		comments // just for lint
		ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}, [comments])

	return (
		<ScrollArea className="h-125">
			<div ref={ref} />
			{comments.length === 0 ? (
				<p className="text-center text-slate-500 py-8">
					No Events yet. Events will appear here.
				</p>
			) : (
				<div className="flex flex-col gap-2">
					{comments.map((c) => (
						<Commentary
							{...c}
							key={c.id}
						/>
					))}
				</div>
			)}
		</ScrollArea>
	)
}

const CommentaryPage: FC = () => {
	const { comments } = useLoaderData()

	useEffect(() => {
		useComments.setState({
			comments: [...(comments || [])].reverse(),
		})
	}, [comments])

	return (
		<div className="max-w-md mx-auto space-y-4">
			<h1 className="text-3xl font-bold">Commentary</h1>

			<Card>
				<CardHeader>
					<CardTitle>Live Feed</CardTitle>
					<CardDescription>Real-time match updates</CardDescription>
				</CardHeader>
				<CardContent>
					<Comments />
				</CardContent>
			</Card>
		</div>
	)
}

export { CommentaryPage }
