import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '@/pages/home.page'

const Route = createFileRoute('/')({
	component: HomePage,
})

export { Route }
