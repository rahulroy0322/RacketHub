import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import type { FC } from 'react'
import { Toaster } from 'sonner'
import { Header } from '@/components/app/Header'
import type { AuthContextType } from '@/context/auth'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

type MyRouterContext = {
	queryClient: QueryClient
	auth: AuthContextType
}

const RootLayOut: FC = () => {
	return (
		<div className="min-h-screen bg-linear-to-b from-slate-100 to-blue-200">
			<Header />
			<main className="p-4">
				<Outlet />
			</main>
			<Toaster
				closeButton
				richColors
				swipeDirections={['bottom', 'right']}
			/>
			{import.meta.env.DEV ? (
				<TanStackDevtools
					config={{
						position: 'bottom-right',
					}}
					plugins={[
						{
							name: 'Tanstack Router',
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
			) : null}
		</div>
	)
}

const Route = createRootRouteWithContext<MyRouterContext>()({
	component: RootLayOut,
	// notFoundComponent: ()=> <div>sanxcsankj</div>
})

export { Route }
