import { createFileRoute, redirect } from '@tanstack/react-router'
import { HomePage } from '@/pages/home.page'
import { fetchTournaments } from './tournaments'

const Route = createFileRoute('/')({
	component: HomePage,
	loader: async ({ context }) => {
		const data = await context.queryClient.fetchQuery({
			queryKey: ['tournaments'],
			queryFn: fetchTournaments,
		})

		if (!data || !Array.isArray(data)) {
			console.error(data.error.message)

			return redirect({
				href: '/',
			}) as never
		}

		return data
	},
})

export { Route }
