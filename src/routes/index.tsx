import { createFileRoute, redirect } from '@tanstack/react-router'
import { HomePage } from '@/pages/home.page'
import { fetchTournaments } from './tournaments'

const Route = createFileRoute('/')({
	component: HomePage,
	loader: async ({ context }) => {
		const data = await context.queryClient.fetchQuery({
			queryKey: ['tournaments'],
			queryFn: () => fetchTournaments(false),
		})

		if (!data || !Array.isArray(data)) {
			console.error(data.error.message)

			throw redirect({
				href: '/',
			})
		}

		return data
	},
})

export { Route }
