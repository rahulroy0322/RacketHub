import { createFileRoute, redirect } from '@tanstack/react-router'
import type { FC } from 'react'
import { Live } from '@/components/app/live/main'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { fetchMatch } from './route'

import '@/io/main'

const Scheduled: FC = () => {
	return (
		<div className="max-w-md mx-auto space-y-4">
			<Card>
				<CardContent className="py-12 text-center space-y-4">
					<p className="text-slate-500">
						Matches Is Not Live. Events controls will appear when a match is
						live.
					</p>
					<Button
						className="border-current shadow shadow-current"
						variant={'outline'}
					>
						Go Live
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}

const EventsPage: FC = () => {
	const { status } = useLoaderData()

	switch (status) {
		case 'scheduled':
			return <Scheduled />
		case 'live':
			return <Live />
		case 'completed':
			return

		default:
			throw new Error(`"${status satisfies never}" not handled yet`)
	}
}

const Route = createFileRoute('/tournaments/$id/$matchId/events')({
	component: EventsPage,
	loader: async ({ context, params: { matchId } }) => {
		const data = await context.queryClient.fetchQuery({
			queryKey: ['match', matchId],
			queryFn: () => fetchMatch(matchId),
		})

		if (!data || 'error' in data) {
			console.error(data.error.message)

			return redirect({
				to: '/',
				replace: true,
			}) as never
		}

		return data
	},
})

const { useLoaderData } = Route

export { Route }
