import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@rangoo/ui'
import axios from 'axios'
import { IdCard, Lock, Mail, Phone, User } from 'lucide-react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { type SignUpFormData, signUpSchema } from './sign-up-schema'
import { useSignUp } from './use-sign-up'

export function SignUpForm() {
	const navigate = useNavigate()
	const { mutateAsync: signUp, isPending, error } = useSignUp()

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
	})

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value.replace(/\D/g, '')
		if (value.length > 11) value = value.slice(0, 11)
		value = value.replace(/^(\d{2})(\d)/g, '($1) $2')
		value = value.replace(/(\d)(\d{4})$/, '$1-$2')
		setValue('phone', value, { shouldValidate: true })
	}

	const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value.replace(/\D/g, '')
		if (value.length > 11) value = value.slice(0, 11)
		value = value.replace(/(\d{3})(\d)/, '$1.$2')
		value = value.replace(/(\d{3})(\d)/, '$1.$2')
		value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
		setValue('document', value, { shouldValidate: true })
	}

	async function onSubmit(data: SignUpFormData) {
		try {
			await signUp(data)
			navigate('/login')
		} catch {
			
		}
	}

	const apiError = axios.isAxiosError(error)
		? (error.response?.data as { message?: string })?.message
		: null

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
			{apiError && (
				<div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
					{apiError}
				</div>
			)}

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
						className="h-12 bg-white"
						disabled={isPending}
						{...register('firstName')}
					/>
					{errors.firstName && (
						<p className="text-xs text-red-500">{errors.firstName.message}</p>
					)}
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
						className="h-12 bg-white"
						disabled={isPending}
						{...register('lastName')}
					/>
					{errors.lastName && (
						<p className="text-xs text-red-500">{errors.lastName.message}</p>
					)}
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<label htmlFor="email" className="text-sm font-semibold text-slate-900">
					Email address
				</label>
				<Input
					id="email"
					type="email"
					placeholder="name@example.com"
					startIcon={Mail}
					className="h-12 bg-white"
					disabled={isPending}
					{...register('email')}
				/>
				{errors.email && (
					<p className="text-xs text-red-500">{errors.email.message}</p>
				)}
			</div>

			<div className="flex flex-col sm:flex-row gap-5">
				<div className="flex flex-1 flex-col gap-2">
					<label
						htmlFor="phone"
						className="text-sm font-semibold text-slate-900"
					>
						Phone Number
					</label>
					<Input
						id="phone"
						type="tel"
						placeholder="(55) 55555-5555"
						startIcon={Phone}
						className="h-12 bg-white"
						disabled={isPending}
						{...register('phone')}
						onChange={handlePhoneChange}
					/>
					{errors.phone && (
						<p className="text-xs text-red-500">{errors.phone.message}</p>
					)}
				</div>

				<div className="flex flex-1 flex-col gap-2">
					<label
						htmlFor="document"
						className="text-sm font-semibold text-slate-900"
					>
						Document (CPF)
					</label>
					<Input
						id="document"
						type="text"
						placeholder="000.000.000-00"
						startIcon={IdCard}
						className="h-12 bg-white"
						disabled={isPending}
						{...register('document')}
						onChange={handleDocumentChange}
					/>
					{errors.document && (
						<p className="text-xs text-red-500">{errors.document.message}</p>
					)}
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<label
					htmlFor="passwordRaw"
					className="text-sm font-semibold text-slate-900"
				>
					Password
				</label>
				<Input
					id="passwordRaw"
					type="password"
					placeholder="Create a strong password"
					startIcon={Lock}
					className="h-12 bg-white"
					disabled={isPending}
					{...register('passwordRaw')}
				/>
				{errors.passwordRaw && (
					<p className="text-xs text-red-500">{errors.passwordRaw.message}</p>
				)}
				<p className="text-xs text-slate-500 mt-1">
					Must be at least 12 characters long.
				</p>
			</div>

			<Button
				type="submit"
				className="w-full h-14 mt-4 text-base font-semibold shadow-lg shadow-orange-600/20"
				isLoading={isPending}
				disabled={isPending}
			>
				{isPending ? 'Creating account...' : 'Create Account'}
			</Button>
		</form>
	)
}
