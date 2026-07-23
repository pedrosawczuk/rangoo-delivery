import { createBrowserRouter } from 'react-router-dom'
import { ForgotPassword } from './pages/forgot-password'
import { Home } from './pages/home'
import { NotFound } from './pages/not-found'
import { Privacy } from './pages/privacy'
import { Register } from './pages/register'
import { SignIn } from './pages/sign-in'
import { Terms } from './pages/terms'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/login',
		element: <SignIn />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/forgot-password',
		element: <ForgotPassword />,
	},
	{
		path: '/terms',
		element: <Terms />,
	},
	{
		path: '/privacy',
		element: <Privacy />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
])
