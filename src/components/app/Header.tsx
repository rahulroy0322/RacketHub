import { Link } from '@tanstack/react-router'
import { Loader, UserRound } from 'lucide-react'
import type { FC } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import useAuth from '@/context/auth'
import { adminRoles } from '@/routes/admin/route'

const Nav: FC = () => {
	const { user, isLoading } = useAuth()

	return (
		<nav className="flex items-center gap-2">
			{isLoading ? (
				<Loader className="size-5 animate-spin" />
			) : !user ? (
				<>
					<Button
						asChild
						variant={'default'}
					>
						<Link to="/login">Login</Link>
					</Button>

					<Button
						className="border-primary"
						variant={'outline'}
					>
						<Link to="/register">Register</Link>
					</Button>
				</>
			) : (
				<>
					{adminRoles.includes(user.role) ? (
						<Button
							className="border-primary"
							variant={'outline'}
						>
							<Link to="/admin">Admin</Link>
						</Button>
					) : null}
					<Avatar>
						{/* <AvatarImage src="https://github.com/shadcn.png" /> */}
						<AvatarFallback>
							<UserRound />
						</AvatarFallback>
					</Avatar>
				</>
			)}
		</nav>
	)
}

const Header: FC = () => (
	<header className="flex items-center justify-between border-b border-ring pb-4">
		<Link to="/">
			<h2 className="text-md font-bold text-slate-900">🎾 RacketHub</h2>
		</Link>
		<Nav />
	</header>
)

export { Header }
