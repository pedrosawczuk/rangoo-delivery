import { Button, Input } from '@rangoo/ui'
import { ArrowRight, Lock, Mail, User, UtensilsCrossed, Phone, IdCard } from 'lucide-react'
import { Link } from 'react-router-dom'
import * as React from 'react'

export function Register() {
	const [phone, setPhone] = React.useState('')
	const [document, setDocument] = React.useState('')

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value.replace(/\D/g, '')
		if (value.length > 11) value = value.slice(0, 11)
		value = value.replace(/^(\d{2})(\d)/g, '($1) $2')
		value = value.replace(/(\d)(\d{4})$/, '$1-$2')
		setPhone(value)
	}

	const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value.replace(/\D/g, '')
		if (value.length > 11) value = value.slice(0, 11)
		value = value.replace(/(\d{3})(\d)/, '$1.$2')
		value = value.replace(/(\d{3})(\d)/, '$1.$2')
		value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
		setDocument(value)
	}
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

					<form className="flex flex-col gap-5">
						<div className="flex flex-col sm:flex-row gap-5">
							<div className="flex flex-1 flex-col gap-2">
								<label
									htmlFor="firstName"
									className="text-sm font-semibold text-slate-900"
								>
									First Name
								</label>
								<Input
									id="firstName"
									type="text"
									placeholder="John"
									startIcon={User}
									required
									className="h-12 bg-white"
								/>
							</div>
							<div className="flex flex-1 flex-col gap-2">
								<label
									htmlFor="lastName"
									className="text-sm font-semibold text-slate-900"
								>
									Last Name
								</label>
								<Input
									id="lastName"
									type="text"
									placeholder="Doe"
									startIcon={User}
									required
									className="h-12 bg-white"
								/>
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<label
								htmlFor="email"
								className="text-sm font-semibold text-slate-900"
							>
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

						<div className="flex flex-col sm:flex-row gap-5">
							<div className="flex flex-1 flex-col gap-2">
								<label htmlFor="phone" className="text-sm font-semibold text-slate-900">
									Phone Number
								</label>
								<Input
									id="phone"
									type="tel"
									placeholder="(55) 55555-5555"
									startIcon={Phone}
									required
									className="h-12 bg-white"
									value={phone}
									onChange={handlePhoneChange}
								/>
							</div>
							<div className="flex flex-1 flex-col gap-2">
								<label htmlFor="document" className="text-sm font-semibold text-slate-900">
									Document
								</label>
								<Input
									id="document"
									type="text"
									placeholder="000.000.000-00"
									startIcon={IdCard}
									required
									className="h-12 bg-white"
									value={document}
									onChange={handleDocumentChange}
								/>
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<label
								htmlFor="password"
								className="text-sm font-semibold text-slate-900"
							>
								Password
							</label>
							<Input
								id="password"
								type="password"
								placeholder="Create a strong password"
								startIcon={Lock}
								required
								className="h-12 bg-white"
							/>
							<p className="text-xs text-slate-500 mt-1">
								Must be at least 8 characters long.
							</p>
						</div>

						<Button
							type="submit"
							className="w-full h-14 mt-4 text-base font-semibold shadow-lg shadow-orange-600/20"
						>
							Create Account
						</Button>
					</form>

					<p className="px-8 text-center text-sm text-slate-500 mt-8">
						By clicking continue, you agree to our{' '}
						<Link
							to="/terms"
							className="underline underline-offset-4 hover:text-primary"
						>
							Terms of Service
						</Link>{' '}
						and{' '}
						<Link
							to="/privacy"
							className="underline underline-offset-4 hover:text-primary"
						>
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
