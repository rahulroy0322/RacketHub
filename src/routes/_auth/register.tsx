import { createFileRoute } from '@tanstack/react-router'
import { RegisterPage } from '@/pages/auth/register.page'

const Route = createFileRoute('/_auth/register')({
	component: RegisterPage,
})

export { Route }
