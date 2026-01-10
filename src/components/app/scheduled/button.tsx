import { useMutation } from '@tanstack/react-query'
import { redirect } from '@tanstack/react-router'
import type { FC } from 'react'
import { Button } from '@/components/ui/button'
import { updateStatus } from '@/data/main'
import { Route } from '@/routes/tournaments/$id/$matchId/events'

const { useParams } = Route

const GoLiveButton: FC = () => {
	const { matchId, id } = useParams()

	const { data, isPending, mutate } = useMutation({
		mutationKey: ['match', matchId],
		mutationFn: () => updateStatus(matchId, 'live'),
	})

	if (!data === null) {
		return redirect({
			to: '/tournaments/$id/$matchId',
			params: {
				id,
				matchId,
			},
		}) as never
	}

	if (data?._id) {
		window.location.reload()
		return
	}

	return (
		<Button
			className="border-current shadow shadow-current"
			disabled={isPending}
			onClick={mutate as unknown as () => void}
			variant={'outline'}
		>
			Go Live
		</Button>
	)
}

export { GoLiveButton }
