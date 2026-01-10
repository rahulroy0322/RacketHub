import type { FC } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { GoLiveButton } from './button'

const Scheduled: FC = () => (
	<div className="max-w-md mx-auto space-y-4">
		<Card>
			<CardContent className="py-12 text-center space-y-4">
				<p className="text-slate-500">
					Matches Is Not Live. Events controls will appear when a match is live.
				</p>
				<GoLiveButton />
			</CardContent>
		</Card>
	</div>
)

export { Scheduled }
