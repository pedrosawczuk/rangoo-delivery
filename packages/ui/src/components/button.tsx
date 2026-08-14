"use client"
import { cva, type VariantProps } from 'class-variance-authority'
import type { LucideIcon } from 'lucide-react'
import * as React from 'react'
import { cn } from '../lib/utils'

export const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm hover:shadow-md hover:-translate-y-0.5',
				destructive: 'bg-red-500 text-slate-50 hover:bg-red-500/90 shadow-sm',
				outline:
					'border border-[#E5D5C5] bg-white hover:bg-[#FDF0F0] text-[#2A1A14]',
				secondary: 'bg-[#FDF0F0] text-primary hover:bg-[#FDF0F0]/80',
				ghost: 'hover:bg-[#FDF0F0] text-[#2A1A14]',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-11 px-4 py-2',
				sm: 'h-9 px-3 text-xs',
				lg: 'h-14 px-8 text-base',
				icon: 'h-11 w-11',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	icon?: LucideIcon
	isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, variant, size, icon: Icon, isLoading, children, ...props },
		ref,
	) => {
		return (
			<button
				ref={ref}
				className={cn(buttonVariants({ variant, size, className }))}
				disabled={isLoading || props.disabled}
				{...props}
			>
				{isLoading && Icon && <Icon className="h-4 w-4 animate-spin" />}
				{!isLoading && Icon && <Icon className="h-4 w-4" />}
				{children}
			</button>
		)
	},
)
Button.displayName = 'Button'

export { Button }

