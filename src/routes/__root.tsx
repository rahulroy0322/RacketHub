import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import type { FC } from 'react'
import { Toaster } from 'sonner'
import { Header } from '@/components/app/Header'
import { Loading } from '@/components/app/loading'
import type { AuthContextType } from '@/context/auth'
import { ErrorPage } from '@/pages/error.page'
import { NotFoundPage } from '@/pages/not-found.page'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

type MyRouterContext = {
	queryClient: QueryClient
	auth: AuthContextType
}

const RootLayOut: FC = () => (
	<div className="h-screen bg-linear-to-b from-slate-100 to-blue-200 flex flex-col">
		<Header />
		<main className="p-4 grow overflow-auto relative">
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

const Route = createRootRouteWithContext<MyRouterContext>()({
	component: RootLayOut,
	pendingComponent: Loading,
	errorComponent: ErrorPage,
	notFoundComponent: NotFoundPage,
})

export { Route }
