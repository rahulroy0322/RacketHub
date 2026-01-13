import { type ErrorRouteComponent, useNavigate } from '@tanstack/react-router'
import { BadgeInfo, Home, RefreshCw, Repeat } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

const ErrorPage: ErrorRouteComponent = ({ error, reset }) => {
	const navigate = useNavigate()

	return (
		<div className="max-w-md mx-auto space-y-6 p-2 min-h-screen flex flex-col items-center justify-center">
			<Card className="border-destructive/50">
				<CardHeader>
					<CardTitle>
						<div className="flex flex-col items-center justify-center text-center gap-2">
							<BadgeInfo className="size-12 text-yellow-500" />
							<span className="text-balance text-3xl text-destructive">
								Oops! Something unexpected happened
							</span>
						</div>
					</CardTitle>
					<CardDescription className="text-balance text-xl">
						We encountered an unexpected error
					</CardDescription>
				</CardHeader>

				<CardContent>
					<div className="border border-destructive/50 p-2 px-4 rounded-md flex flex-col gap-1">
						<b className="text-red-900 font-semibold text-base">Why?</b>
						<p className="text-destructive font-mono font-medium text-sm">
							{error.message}
						</p>
					</div>

					<p className="text-sm text-slate-600 mt-2">
						Don't worry! Your data is safe. Try one of the options below to
						continue.
					</p>

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
						{reset ? (
							<Button
								onClick={reset}
								size="lg"
								variant={'destructive'}
							>
								<Repeat className="size-4" /> Try Again
							</Button>
						) : null}

						<Button
							onClick={() => {
								navigate({
									to: '/',
								})
							}}
						>
							<Home className="size-4" /> Go to Home
						</Button>
						<Button
							onClick={() => window.location.reload()}
							variant="outline"
						>
							<RefreshCw className="size-4" /> Refresh Page
						</Button>
					</div>
				</CardContent>
			</Card>

			<div className="pt-4 space-y-2">
				<p className="text-md text-muted-foreground">
					If this problem persists, please contact support.
				</p>
				<div className="flex justify-center gap-4 text-xs text-slate-500">
					<Button
						// TODO!
						onClick={() => console.error('Error logged:', error)}
						variant={'link'}
					>
						Inform Team
					</Button>
				</div>
			</div>
		</div>
	)
}

export { ErrorPage }
