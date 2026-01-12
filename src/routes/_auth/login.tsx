import { createFileRoute } from '@tanstack/react-router'
import { LoginPage } from '@/pages/auth/login.page'

const Route = createFileRoute('/_auth/login')({
	component: LoginPage,
})

export { Route }
