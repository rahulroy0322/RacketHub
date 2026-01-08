import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

interface MyRouterContext {
	queryClient: QueryClient
}

const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => (
		<div className="min-h-screen bg-linear-to-b from-slate-100 to-blue-200 p-4">
			<Outlet />
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
	),
})

export { Route }
