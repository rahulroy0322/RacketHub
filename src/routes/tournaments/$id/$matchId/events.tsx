import { createFileRoute, redirect } from '@tanstack/react-router'
import { fetchMatch } from './route'

import '@/io/main'
import { Loading } from '@/components/app/loading'
import { EventsPage } from '@/pages/event.page'

const Route = createFileRoute('/tournaments/$id/$matchId/events')({
	component: EventsPage,
	pendingComponent: Loading,
	loader: async ({ context, params: { matchId } }) => {
		const data = await context.queryClient.fetchQuery({
			queryKey: ['match', matchId],
			queryFn: () => fetchMatch(matchId),
		})

		if (!data || 'error' in data) {
			console.error(data.error.message)

			throw redirect({
				to: '/',
				replace: true,
			})
		}

		return data
	},
})

export { Route }
