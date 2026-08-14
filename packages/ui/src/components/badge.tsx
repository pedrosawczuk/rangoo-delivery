"use client"
import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import { cn } from '../lib/utils'

export const badgeVariants = cva(
	'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
	{
		variants: {
			variant: {
				default: 'bg-slate-100 text-slate-700',
				success: 'bg-green-100 text-green-700',
				warning: 'bg-yellow-100 text-yellow-700',
				destructive: 'bg-red-100 text-red-700',
				outline: 'border border-slate-200 text-slate-700 bg-transparent',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant, className }))} {...props} />
	)
}

export { Badge }

