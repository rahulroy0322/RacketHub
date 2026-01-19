import { createFileRoute } from '@tanstack/react-router'
import { Loading } from '@/components/app/loading'
import { LoginPage } from '@/pages/auth/login.page'

const Route = createFileRoute('/_auth/login')({
	component: LoginPage,
	pendingComponent: Loading,
})

export { Route }
