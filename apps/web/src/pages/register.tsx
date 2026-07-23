import { ArrowRight, UtensilsCrossed } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SignUpForm } from '@/features/auth/sign-up-form'

export function Register() {
	return (
		<div className="flex min-h-screen w-full flex-col md:flex-row-reverse bg-white text-slate-900 font-sans selection:bg-primary-light selection:text-primary">
			<div className="flex flex-col justify-between bg-primary p-8 md:w-[45%] md:p-16 lg:p-24 relative overflow-hidden shrink-0">
				<div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white opacity-5 mix-blend-overlay blur-3xl" />
				<div className="absolute -bottom-48 -left-48 h-150 w-150 rounded-full bg-orange-950 opacity-10 mix-blend-overlay blur-3xl" />

				<div className="relative z-10 flex flex-col h-full">
					<div className="flex items-center space-x-2 text-white opacity-90 mb-16 md:mb-0 justify-end md:justify-start">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
							<UtensilsCrossed className="h-5 w-5" />
						</div>
						<span className="font-semibold tracking-wide">RANGOO</span>
					</div>

					<div className="mt-8 md:mt-auto md:mb-12">
						<h1 className="font-serif text-[3.5rem] leading-none tracking-tight text-white sm:text-7xl lg:text-[5.5rem]">
							Join
							<br />
							the
							<br />
							feast.
						</h1>
						<p className="mt-6 max-w-sm text-lg text-primary-light leading-relaxed">
							Create your account in seconds and unlock exclusive deals from the
							best kitchens in town.
						</p>
					</div>
				</div>
			</div>

			<div className="flex flex-1 items-center justify-center p-8 sm:p-12 md:p-16 relative">
				<div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
					<div className="md:hidden flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-sm mb-8">
						<UtensilsCrossed className="h-6 w-6 text-white" />
					</div>

					<div className="mb-10">
						<h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
							Create an account
						</h2>
						<p className="mt-2 text-slate-500">
							Enter your details below to get started.
						</p>
					</div>

					<SignUpForm />

					<p className="px-8 text-center text-sm text-slate-500 mt-8">
						By clicking continue, you agree to our{' '}
						<Link to="/terms" className="underline underline-offset-4 hover:text-primary">
							Terms of Service
						</Link>{' '}
						and{' '}
						<Link to="/privacy" className="underline underline-offset-4 hover:text-primary">
							Privacy Policy
						</Link>
						.
					</p>

					<div className="mt-8 text-center text-sm text-slate-600">
						Already have an account?{' '}
						<Link
							to="/login"
							className="font-semibold text-primary hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm transition-colors inline-flex items-center"
						>
							Sign in <ArrowRight className="ml-1 h-3 w-3" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
