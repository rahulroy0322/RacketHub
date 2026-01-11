import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import type { FC } from 'react'
import { Toaster } from 'sonner'
import { Header } from '@/components/app/Header'
import { AuthContextProvider } from '@/context/auth'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

interface MyRouterContext {
	queryClient: QueryClient
}

const RootLayOut: FC = () => {
	return (
		<AuthContextProvider>
			<div className="min-h-screen bg-linear-to-b from-slate-100 to-blue-200 p-4">
				<Header />
				<Outlet />
				<Toaster
					closeButton
					richColors
					swipeDirections={['bottom', 'right']}
				/>
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
			</div>
		</AuthContextProvider>
	)
}

const Route = createRootRouteWithContext<MyRouterContext>()({
	component: RootLayOut,
	// notFoundComponent: ()=> <div>sanxcsankj</div>
})

export { Route }
