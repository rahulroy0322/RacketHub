import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@/components/app/auth/login'

const Route = createFileRoute('/_auth/login')({
	component: LoginForm,
})

export { Route }
