const BACKEND_URL: string = import.meta.env.VITE_APP_BACKEND_URL

if (!BACKEND_URL || BACKEND_URL.endsWith('/')) {
	throw new Error(`"BACKEND_URL" is not defined`)
}

const BASE_URL = `${BACKEND_URL}/api/v1`

export { BASE_URL, BACKEND_URL }
