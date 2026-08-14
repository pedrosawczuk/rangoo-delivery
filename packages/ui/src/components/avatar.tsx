"use client"
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../lib/utils'

const avatarVariants = cva('relative flex shrink-0 overflow-hidden', {
	variants: {
		size: {
			sm: 'h-8 w-8 text-xs',
			md: 'h-10 w-10 text-sm',
			lg: 'h-14 w-14 text-base',
		},
		shape: {
			circle: 'rounded-full',
			squircle: 'rounded-xl',
		},
	},
	defaultVariants: {
		size: 'md',
		shape: 'circle',
	},
})

export interface AvatarProps
	extends React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof avatarVariants> {
	src?: string
	alt?: string
	fallback: string
}

function Avatar({
	className,
	size,
	shape,
	src,
	alt,
	fallback,
	...props
}: AvatarProps) {
	const [imgFailed, setImgFailed] = React.useState(false)

	const showFallback = !src || imgFailed

	return (
		<span className={cn(avatarVariants({ size, shape, className }))} {...props}>
			{!showFallback && (
				<img
					src={src}
					alt={alt}
					className="h-full w-full object-cover"
					onError={() => setImgFailed(true)}
				/>
			)}
			{showFallback && (
				<div className="flex h-full w-full items-center justify-center bg-primary-light font-medium text-primary uppercase">
					{fallback.slice(0, 2)}
				</div>
			)}
		</span>
	)
}

export { Avatar, avatarVariants }

