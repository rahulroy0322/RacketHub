// TODO!
const AUTH_KEY = '-auth'

const getToken = () => localStorage.getItem(AUTH_KEY)
const saveToken = (token: string) => localStorage.setItem(AUTH_KEY, token)

export { getToken, saveToken }
