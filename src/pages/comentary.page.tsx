import { type FC, useEffect } from 'react'
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
import type { CommentaryType } from '@/types'

const { useLoaderData } = Route

const Commentary: FC<CommentaryType> = ({ text, type }) => (
	<div
		className={cn(
			'p-3 bg-slate-50 rounded-lg border border-l-4 border-yellow-400',
			{
				'border-blue-500': type === 'p:fair',
				'border-destructive': type === 'p:out',
				'border-rose-500': type.startsWith('ir:'),
			}
		)}
	>
		<div className="text-[10px] text-slate-500 mb-1">{'11:11 Am'}</div>
		<div className="grid grid-cols-5 text-slate-700 text-sm">
			<span className="font-semibold">Jhon Do</span>
			<p className="col-span-4">{text}</p>
		</div>
	</div>
)

const Comments: FC = () => {
	const comments = useComments((state) => state.comments)

	return (
		<ScrollArea className="h-125">
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
			comments: comments || [],
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
