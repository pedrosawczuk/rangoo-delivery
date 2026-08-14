"use client"
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../lib/utils'

export const textareaVariants = cva(
	'flex min-h-[100px] w-full rounded-2xl border bg-white px-5 py-3 text-sm transition-colors placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y',
	{
		variants: {
			variant: {
				default: 'border-slate-300 text-slate-900 focus-visible:ring-primary',
				error:
					'border-red-500 text-red-900 placeholder:text-red-300 focus-visible:ring-red-500',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
		VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, variant, ...props }, ref) => {
		return (
			<textarea
				className={cn(textareaVariants({ variant, className }))}
				ref={ref}
				{...props}
			/>
		)
	},
)
Textarea.displayName = 'Textarea'

export { Textarea }

