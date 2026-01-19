import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import type { FC } from 'react'
import { Loading } from '@/components/app/loading'
import { adminRoles } from '@/constants/role'

const AdminLayout: FC = () => {
	return <Outlet />
}

const Route = createFileRoute('/admin')({
	component: AdminLayout,
	pendingComponent: Loading,
	beforeLoad: ({ context: { auth }, location }) => {
		if (!auth.user || !adminRoles.includes(auth.user.role)) {
			throw redirect({
				to: '/',
			})
		}

		if (location.href === '/admin' || location.href === '/admin/') {
			throw redirect({
				to: '/admin/dashboard',
			})
		}
	},
})

export { Route }
