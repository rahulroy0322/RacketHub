import type { FC } from 'react'
import { LoginForm } from '@/components/app/auth/login'
import { Route } from '@/routes/_auth/login'

const { useRouteContext } = Route

const LoginPage: FC = () => {
	const { queryClient } = useRouteContext()

	return <LoginForm client={queryClient} />
}

export { LoginPage }
