import { useQuery } from '@tanstack/react-query'
import { createContext, type FC, type ReactNode, use, useEffect } from 'react'
import { toast } from 'sonner'
import { BASE_URL } from '@/constants/url'
import { getToken } from '@/lib/token'
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
	const token = getToken()

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

export type { AuthContextType }

export { useAuth, AuthContextProvider }

export default useAuth
