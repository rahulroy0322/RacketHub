import {
	createFileRoute,
	Outlet,
	useLocation,
	useNavigate,
} from '@tanstack/react-router'
import { LoaderIcon } from 'lucide-react'
import type { FC } from 'react'
import { toast } from 'sonner'
import useAuth from '@/context/auth'
import type { UserType } from '@/types'

const Route = createFileRoute('/admin')({
	component: RouteComponent,
})

const Loader: FC = () => {
	return (
		<div className="bg-muted flex items-center justify-center fixed inset-0">
			<LoaderIcon className="size-16 animate-spin animation-duration-[2.5s]" />
		</div>
	)
}

const adminRoles: UserType['role'][] = ['admin', 'super']

function RouteComponent() {
	const navigate = useNavigate()
	const location = useLocation()
	const { user, isLoading } = useAuth()

	if (isLoading) {
		return <Loader />
	}

	if (!user) {
		toast.error('You Are Not logged in')

		return navigate({
			to: '/login',
		})
	}

	if (!adminRoles.includes(user.role)) {
		toast.error('You Dont Have Access')

		return navigate({
			to: '/',
		})
	}

	if (location.href === '/admin' || location.href === '/admin/') {
		return navigate({
			to: '/admin/dashboard',
		})
	}

	return <Outlet />
}

export { Route, adminRoles }
