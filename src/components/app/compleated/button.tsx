import { useNavigate } from '@tanstack/react-router'
import type { FC } from 'react'
import { Button } from '@/components/ui/button'
import { Route } from '@/routes/tournaments/$id/$matchId/events'

const { useParams } = Route

const GoBack: FC = () => {
	const navigate = useNavigate()
	const { id } = useParams()

	return (
		<Button
			className="border-current shadow shadow-current"
			onClick={() => {
				navigate({
					to: '/tournaments/$id/matches',
					params: {
						id,
					},
				})
			}}
			variant={'outline'}
		>
			Go Back
		</Button>
	)
}

export { GoBack }
