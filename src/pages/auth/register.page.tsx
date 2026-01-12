import type { FC } from 'react'
import { RegisterForm } from '@/components/app/auth/register'
import { Route } from '@/routes/_auth/register'

const { useRouteContext } = Route

const RegisterPage: FC = () => {
	const { queryClient } = useRouteContext()

	return <RegisterForm client={queryClient} />
}

export { RegisterPage }
