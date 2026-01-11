import { useQuery } from '@tanstack/react-query'
import { createContext, type FC, type ReactNode, use, useEffect } from 'react'
import { toast } from 'sonner'
import { AUTH_KEY } from '@/constants/auth'
import { BASE_URL } from '@/constants/url'
import type { ResType, UserType } from '@/types'

type AuthContextType = {
	user: UserType | null
	isLoading: boolean
	// login: (username: string, password: string) => Promise<void>
	// logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const useAuth = () => {
	const context = use(AuthContext)
	if (context === undefined) {
		throw new Error('"useAuth" must be used within an "AuthProvider"')
	}
	return context
}

type AuthContextProviderPropsType = {
	children: ReactNode
}

const AUTH_URL = `${BASE_URL}/auth`

const fetchUser = async () => {
	const token = localStorage.getItem(AUTH_KEY)

	if (!token) {
		return null
	}

	const res = await fetch(`${AUTH_URL}/me/`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})

	const data = (await res.json()) as ResType<{
		user: UserType | null
	}>

	if (!data.success) {
		return null
	}

	return data.data.user
}

const AuthContextProvider: FC<AuthContextProviderPropsType> = ({
	children,
}) => {
	const {
		data: user,
		error,
		isFetching,
		isLoading,
	} = useQuery({
		initialData: null,

		queryKey: ['auth'],

		queryFn: fetchUser,
	})

	useEffect(() => {
		if (error?.message) {
			toast.error(error?.message)
		}
	}, [error?.message])

	return (
		<AuthContext
			value={{
				user,
				isLoading: isFetching || isLoading,
			}}
		>
			{children}
		</AuthContext>
	)
}

// export function AuthProvider({ children }: { children: React.ReactNode }) {
// 	const [user, setUser] = useState<User | null>(null)
// 	const [isAuthenticated, setIsAuthenticated] = useState(false)
// 	const [isLoading, setIsLoading] = useState(true)

// 	// Restore auth state on app load
// 	useEffect(() => {
// 		const token = localStorage.getItem('auth-token')
// 		if (token) {
// 			// Validate token with your API
// 			fetch('/api/validate-token', {
// 				headers: { Authorization: `Bearer ${token}` },
// 			})
// 				.then((response) => response.json())
// 				.then((userData) => {
// 					if (userData.valid) {
// 						setUser(userData.user)
// 						setIsAuthenticated(true)
// 					} else {
// 						localStorage.removeItem('auth-token')
// 					}
// 				})
// 				.catch(() => {
// 					localStorage.removeItem('auth-token')
// 				})
// 				.finally(() => {
// 					setIsLoading(false)
// 				})
// 		} else {
// 			setIsLoading(false)
// 		}
// 	}, [])

// 	// Show loading state while checking auth
// 	if (isLoading) {
// 		return (
// 			<div className="flex items-center justify-center min-h-screen">
// 				Loading...
// 			</div>
// 		)
// 	}

// 	const login = async (username: string, password: string) => {
// 		// Replace with your authentication logic
// 		const response = await fetch('/api/login', {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify({ username, password }),
// 		})

// 		if (response.ok) {
// 			const userData = await response.json()
// 			setUser(userData)
// 			setIsAuthenticated(true)
// 			// Store token for persistence
// 			localStorage.setItem('auth-token', userData.token)
// 		} else {
// 			throw new Error('Authentication failed')
// 		}
// 	}

// 	const logout = () => {
// 		setUser(null)
// 		setIsAuthenticated(false)
// 		localStorage.removeItem('auth-token')
// 	}

// 	return (
// 		<AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
// 			{children}
// 		</AuthContext.Provider>
// 	)
// }

// export function useAuth() {
// 	const context = useContext(AuthContext)
// 	if (context === undefined) {
// 		throw new Error('useAuth must be used within an AuthProvider')
// 	}
// 	return context
// }

export { useAuth, AuthContextProvider }

export default useAuth
