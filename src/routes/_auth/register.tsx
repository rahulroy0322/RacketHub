import { createFileRoute } from '@tanstack/react-router'
import { RegisterForm } from '@/components/app/auth/register'

const Route = createFileRoute('/_auth/register')({
	component: RegisterForm,
})

export { Route }
