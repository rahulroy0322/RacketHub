import { createFileRoute } from '@tanstack/react-router'
import { BASE_URL } from '@/constants/url'
import { DashBoardPage } from '@/pages/admin/dashboard.page'
import type { ResType } from '@/types'

const fetchEveryThing = async () => {
	const res = await fetch(`${BASE_URL}/admin/count/`)
	const data = (await res.json()) as ResType<{
		tournaments: number
		teams: number
		matchs: number
		players: number
	}>

	if (!data.success) {
		return data
	}

	return data.data
}

const Route = createFileRoute('/admin/dashboard')({
	component: DashBoardPage,

	loader: async ({ context }) => {
		const data = await context.queryClient.fetchQuery({
			queryKey: ['count'],
			queryFn: fetchEveryThing,
		})

		if (!data || 'error' in data) {
			console.error(data.error)
			return window.location.reload() as never
		}

		return data
	},
})

export { Route }
