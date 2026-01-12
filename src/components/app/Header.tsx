import { Link } from '@tanstack/react-router'
import { Loader, UserRound } from 'lucide-react'
import type { FC } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { adminRoles } from '@/constants/role'
import useAuth from '@/context/auth'

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
	<header className=" border-b border-ring p-4 sticky top-0 left-0 bg-background shadow-md z-99999">
		<div className="container m-auto flex items-center justify-between">
			<Link to="/">
				<h2 className="text-md font-bold text-slate-900">🎾 RacketHub</h2>
			</Link>
			<Nav />
		</div>
	</header>
)

export { Header }
