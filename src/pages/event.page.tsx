import type { FC } from 'react'
import { Live } from '@/components/app/live/main'
import { Scheduled } from '@/components/app/scheduled/main'
import { Route } from '@/routes/tournaments/$id/$matchId/events'

const { useLoaderData } = Route

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

export { EventsPage }
