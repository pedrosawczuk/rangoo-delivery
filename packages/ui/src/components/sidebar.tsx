'use client'
import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { cn } from '../lib/utils'

const Sidebar = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<aside
		ref={ref}
		className={cn(
			'flex h-screen w-64 flex-col border-r border-slate-200 bg-white',
			className,
		)}
		{...props}
	/>
))
Sidebar.displayName = 'Sidebar'

const SidebarHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			'flex h-14 items-center border-b border-slate-200 px-4 font-semibold',
			className,
		)}
		{...props}
	/>
))
SidebarHeader.displayName = 'SidebarHeader'

const SidebarContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			'flex-1 overflow-auto py-4 px-2 flex flex-col gap-1',
			className,
		)}
		{...props}
	/>
))
SidebarContent.displayName = 'SidebarContent'

const SidebarFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('border-t border-slate-200 p-4', className)}
		{...props}
	/>
))
SidebarFooter.displayName = 'SidebarFooter'

interface SidebarItemProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	asChild?: boolean
	isActive?: boolean
}

const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
	({ className, asChild = false, isActive = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				ref={ref}
				className={cn(
					'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1',
					isActive
						? 'bg-slate-100 text-slate-900'
						: 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
					className,
				)}
				{...props}
			/>
		)
	},
)
SidebarItem.displayName = 'SidebarItem'

export { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarItem }
