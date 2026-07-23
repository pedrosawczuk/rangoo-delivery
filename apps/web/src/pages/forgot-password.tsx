import { Button, Input } from '@rangoo/ui'
import { ArrowLeft, Mail, UtensilsCrossed } from 'lucide-react'
import { Link } from 'react-router-dom'

export function ForgotPassword() {
	return (
		<div className="flex min-h-screen w-full flex-col md:flex-row bg-white text-slate-900 font-sans selection:bg-primary-light selection:text-primary">
			<div className="flex flex-col justify-between bg-primary p-8 md:w-[45%] md:p-16 lg:p-24 relative overflow-hidden shrink-0">
				<div className="absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-white opacity-5 mix-blend-overlay blur-3xl" />
				<div className="absolute -top-48 -right-48 h-150 w-150 rounded-full bg-orange-950 opacity-10 mix-blend-overlay blur-3xl" />

				<div className="relative z-10 flex flex-col h-full">
					<div className="flex items-center space-x-2 text-white opacity-90 mb-16 md:mb-0">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
							<UtensilsCrossed className="h-5 w-5" />
						</div>
						<span className="font-semibold tracking-wide">RANGOO</span>
					</div>

					<div className="mt-8 md:mt-auto md:mb-12">
						<h1 className="font-serif text-[3.5rem] leading-none tracking-tight text-white sm:text-7xl lg:text-[5.5rem]">
							Lost
							<br />
							your
							<br />
							way?
						</h1>
						<p className="mt-6 max-w-sm text-lg text-primary-light leading-relaxed">
							Don't worry, happens to the best of us. We'll help you get back to
							your orders in no time.
						</p>
					</div>
				</div>
			</div>

			<div className="flex flex-1 items-center justify-center p-8 sm:p-12 md:p-16 relative">
				<div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
					<div className="md:hidden flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-sm mb-8">
						<UtensilsCrossed className="h-6 w-6 text-white" />
					</div>

					<Link
						to="/login"
						className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-8 transition-colors"
					>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to login
					</Link>

					<div className="mb-10">
						<h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
							Reset password
						</h2>
						<p className="mt-2 text-slate-500">
							Enter your email address and we'll send you a link to reset your
							password.
						</p>
					</div>

					<form className="flex flex-col gap-6">
						<div className="flex flex-col gap-2">
							<label htmlFor="email" className="text-sm font-semibold text-slate-900">
								Email address
							</label>
							<Input
								id="email"
								type="email"
								placeholder="name@example.com"
								startIcon={Mail}
								required
								className="h-12 bg-white"
							/>
						</div>

						<Button
							type="submit"
							className="w-full h-14 mt-2 text-base font-semibold shadow-lg shadow-orange-600/20"
						>
							Send reset link
						</Button>
					</form>
				</div>
			</div>
		</div>
	)
}
