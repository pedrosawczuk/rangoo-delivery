import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import { cn } from '../lib/utils'

export const skeletonVariants = cva('animate-pulse bg-slate-200', {
	variants: {
		variant: {
			default: '',
			text: 'rounded-md',
			circular: 'rounded-full',
			pill: 'rounded-full',
			card: 'rounded-2xl',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

export interface SkeletonProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, variant, ...props }: SkeletonProps) {
	return (
		<div className={cn(skeletonVariants({ variant, className }))} {...props} />
	)
}

export { Skeleton }
