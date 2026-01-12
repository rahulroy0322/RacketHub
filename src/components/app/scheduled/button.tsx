import { useMutation } from '@tanstack/react-query'
import { useNavigate, useRouter } from '@tanstack/react-router'
import type { FC } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { updateMatch } from '@/data/admin'
import { Route } from '@/routes/tournaments/$id/$matchId/events'

// TODO!
const { useParams } = Route

const GoLiveButton: FC = () => {
	const router = useRouter()
	const navigate = useNavigate()
	const { matchId, id } = useParams()
	const { isPending, mutate } = useMutation({
		mutationKey: ['match', matchId],
		mutationFn: async () =>
			toast.promise(
				async () => {
					const data = await updateMatch(matchId, {
						status: 'live',
					})

					if (!data) {
						navigate({
							to: '/tournaments/$id/$matchId',
							params: {
								id,
								matchId,
							},
						})
						throw new Error('some thing went wrong')
					}

					if ('error' in data) {
						if ('message' in data.error) {
							throw data.error
						}
						throw new Error(data.error)
					}
				},
				{
					loading: 'Going Live',
					success: () => {
						router.invalidate({
							sync: true,
						})
						return 'Now Your Match Is live'
					},
					error: (e: Error) => {
						console.error(e)
						const { message } = e

						return (
							<div>
								<b>Error Going Live</b>
								<p>{message}</p>
							</div>
						)
					},
				}
			),
	})

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
