import { AUTH_KEY } from '@/constants/auth'
import { BASE_URL } from '@/constants/url'
import type { ResType, UserType } from '@/types'

const post = async (route: string, data: unknown) => {
	const res = await fetch(`${BASE_URL}/auth/${route}/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})

	const _data = (await res.json()) as ResType<{
		user: UserType | null
		token: string
	}>

	if (!_data.success) {
		console.error(_data.error.message)
		throw _data.error
	}

	// biome-ignore lint/style/noNonNullAssertion: trust me
	saveToken(_data.data.token!)

	return _data.data.user
}

const register = (user: Omit<UserType, '_id' | 'role'>) =>
	post('register', user)

const login = async (user: Omit<UserType, '_id' | 'role' | 'name'>) =>
	post('login', user)

const saveToken = (token: string) => {
	localStorage.setItem(AUTH_KEY, token)
}

export { register, login }
