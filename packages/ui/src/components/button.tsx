import { cva, type VariantProps } from 'class-variance-authority'
import type { LucideIcon } from 'lucide-react'
import * as React from 'react'
import { cn } from '../lib/utils'

export const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary-hover',
				destructive: 'bg-red-500 text-slate-50 hover:bg-red-500/90',
				outline:
					'border border-slate-200 bg-white hover:bg-slate-100 hover:text-primary',
				secondary: 'bg-primary-light text-primary hover:bg-primary-light/80',
				ghost: 'hover:bg-slate-100 hover:text-primary',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-9 px-4 py-2',
				sm: 'h-8 rounded-full px-3 text-xs',
				lg: 'h-10 rounded-full px-8',
				icon: 'h-9 w-9',
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
