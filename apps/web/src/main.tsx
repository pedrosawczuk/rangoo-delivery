import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import './index.css'

import { ToastProvider } from '@rangoo/ui'
import { router } from './routes'

const queryClient = new QueryClient()

const rootElement = document.getElementById('root')
if (!rootElement) {
	throw new Error('Root element not found')
}

createRoot(rootElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<HelmetProvider>
				<ToastProvider>
					<RouterProvider router={router} />
				</ToastProvider>
			</HelmetProvider>
		</QueryClientProvider>
	</StrictMode>,
)
