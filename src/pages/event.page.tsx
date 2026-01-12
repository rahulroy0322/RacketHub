import { useNavigate } from '@tanstack/react-router'
import type { FC } from 'react'
import { Live } from '@/components/app/live/main'
import { Loading } from '@/components/app/loading'
import { Scheduled } from '@/components/app/scheduled/main'
import { adminRoles } from '@/constants/role'
import { useAuth } from '@/context/auth'
import { Route } from '@/routes/tournaments/$id/$matchId/events'

const { useLoaderData } = Route

const EventsPage: FC = () => {
	const { user, isLoading } = useAuth()
	const { status } = useLoaderData()
	const navigate = useNavigate()

	if (isLoading) {
		return <Loading />
	}

	if (!user || !adminRoles.includes(user.role)) {
		throw navigate({
			to: '/',
		})
	}

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
