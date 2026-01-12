import { createFileRoute, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'
import { AUTH_KEY } from '@/constants/auth'
import { BASE_URL } from '@/constants/url'
import { DashBoardPage } from '@/pages/admin/dashboard.page'
import type { ResType } from '@/types'

const fetchEveryThing = async () => {
	const token = localStorage.getItem(AUTH_KEY) as string
	const res = await fetch(`${BASE_URL}/admin/count/`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
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
			if ('message' in data.error) {
				toast.error(data.error.message)
			}
			throw redirect({
				to: '/',
			})
		}

		return data
	},
})

export { Route }
