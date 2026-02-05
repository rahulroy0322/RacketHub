import { createFileRoute, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'
import { LogsDashBoardPage } from '@/pages/admin/logs.page'
import logs from '@/static/logs.json'
import type { LogType, ResType } from '@/types'

type LogsResType = {
	logs: LogType[]
	count: {
		caches: number
		main: number
	}
}
const fetchLogs = async () => {
	const data = await Promise.resolve({
		success: true,
		data: logs as LogsResType,
	} satisfies ResType<LogsResType> as ResType<LogsResType>)
	if (!data.success) {
		return data
	}

	return data.data
}

const Route = createFileRoute('/admin/logs')({
	component: LogsDashBoardPage,
	loader: async () => {
		// const data = await context.queryClient.fetchQuery({
		// 		queryKey: ['count'],
		// 		queryFn: fetchEveryThing,
		// 	})

		const data = await fetchLogs()

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
