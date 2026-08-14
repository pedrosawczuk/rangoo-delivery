"use client"
import { cva, type VariantProps } from 'class-variance-authority'
import type { LucideIcon } from 'lucide-react'
import * as React from 'react'
import { cn } from '../lib/utils'

export const inputWrapperVariants = cva(
	'flex items-center h-12 w-full rounded-xl border border-[#E5D5C5] bg-white px-4 text-sm transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary overflow-hidden shadow-sm',
	{
		variants: {
			variant: {
				default: '',
				error: 'border-red-500 focus-within:ring-red-500/20 focus-within:border-red-500',
				success: 'border-green-500 focus-within:ring-green-500/20 focus-within:border-green-500',
			},
			disabled: {
				true: 'opacity-50 cursor-not-allowed bg-slate-50',
				false: '',
			},
		},
		defaultVariants: {
			variant: 'default',
			disabled: false,
		},
	},
)

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement>,
		Omit<VariantProps<typeof inputWrapperVariants>, 'disabled'> {
	startIcon?: LucideIcon
	endIcon?: LucideIcon
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			variant,
			type,
			startIcon: StartIcon,
			endIcon: EndIcon,
			disabled,
			...props
		},
		ref,
	) => {
		// Define text/icon colors based on variant
		const textColor =
			variant === 'error'
				? 'text-red-900'
				: variant === 'success'
					? 'text-green-900'
					: 'text-slate-900'

		const placeholderColor =
			variant === 'error'
				? 'placeholder:text-red-300'
				: variant === 'success'
					? 'placeholder:text-green-300'
					: 'placeholder:text-slate-500'

		const iconColor =
			variant === 'error'
				? 'text-red-500'
				: variant === 'success'
					? 'text-green-500'
					: 'text-slate-500'

		return (
			<div
				className={cn(
					inputWrapperVariants({
						variant,
						disabled: disabled || false,
						className,
					}),
				)}
			>
				{StartIcon && (
					<StartIcon className={cn('mr-2 h-4 w-4 shrink-0', iconColor)} />
				)}
				<input
					type={type}
					className={cn(
						'flex-1 bg-transparent py-2 outline-none w-full min-w-0 disabled:cursor-not-allowed',
						textColor,
						placeholderColor,
					)}
					ref={ref}
					disabled={disabled}
					{...props}
				/>
				{EndIcon && (
					<EndIcon className={cn('ml-2 h-4 w-4 shrink-0', iconColor)} />
				)}
			</div>
		)
	},
)
Input.displayName = 'Input'

export { Input }

