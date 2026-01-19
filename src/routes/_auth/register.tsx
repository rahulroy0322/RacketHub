import { createFileRoute } from '@tanstack/react-router'
import { Loading } from '@/components/app/loading'
import { RegisterPage } from '@/pages/auth/register.page'

const Route = createFileRoute('/_auth/register')({
	component: RegisterPage,
	pendingComponent: Loading,
})

export { Route }
