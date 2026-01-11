import { AUTH_KEY } from '@/constants/auth'
import { BASE_URL } from '@/constants/url'
import type { ResType, UserType } from '@/types'

const post = async <T extends Record<string, unknown>>(
	route: string,
	data: unknown
) => {
	const res = await fetch(`${BASE_URL}/auth/${route}/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})

	return (await res.json()) as ResType<{
		[Key in keyof T]: T[Key] | null
	}>
}

const register = async (user: Omit<UserType, '_id' | 'role'>) => {
	const data = await post<{
		user: UserType
		token: string
	}>('register', user)

	if (!data.success) {
		console.error(data.error.message)
		throw data.error
	}
	if (!data.data.user) {
		throw new Error('SomeThing went wrong')
	}

	// biome-ignore lint/style/noNonNullAssertion: trust me
	saveToken(data.data.token!)

	return data.data.user
}

const login = async (user: Omit<UserType, '_id' | 'role' | 'name'>) => {
	const data = await post<{
		user: UserType
		token: string
	}>('login', user)

	if (!data.success) {
		console.error(data.error.message)
		throw data.error
	}
	if (!data.data.user) {
		throw new Error('SomeThing went wrong')
	}

	// biome-ignore lint/style/noNonNullAssertion: trust me
	saveToken(data.data.token!)

	return data.data.user
}

const saveToken = (token: string) => {
	localStorage.setItem(AUTH_KEY, token)
}

export { register, login }
