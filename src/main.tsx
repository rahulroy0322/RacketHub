import {
	createHashHistory,
	createRouter,
	RouterProvider,
} from '@tanstack/react-router'
import { type FC, StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import * as TanStackQueryProvider from './integrations/tanstack-query/root-provider.tsx'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

import './styles.css'
import useAuth, { AuthContextProvider } from './context/auth.tsx'

// Create a new router instance

const TanStackQueryProviderContext = TanStackQueryProvider.getContext()
const router = createRouter({
	routeTree,
	context: {
		...TanStackQueryProviderContext,
		// biome-ignore lint/style/noNonNullAssertion: Trust me
		auth: undefined!,
	},
	defaultPreload: 'intent',
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
	history: createHashHistory({
		window,
	}),
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

const App: FC = () => {
	const auth = useAuth()
	return (
		<RouterProvider
			context={{
				auth,
			}}
			router={router}
		/>
	)
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement)
	root.render(
		<StrictMode>
			<TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
				<AuthContextProvider>
					<App />
				</AuthContextProvider>
			</TanStackQueryProvider.Provider>
		</StrictMode>
	)
}
