import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { Skeleton } from './skeleton'

const meta: Meta<typeof Skeleton> = {
	title: 'UI/Skeleton',
	component: Skeleton,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'text', 'circular', 'pill', 'card'],
		},
	},
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
	args: {
		className: 'w-[100px] h-[20px]',
	},
}

export const TextLine: Story = {
	args: {
		variant: 'text',
		className: 'w-[250px] h-4',
	},
}

export const CircularAvatar: Story = {
	args: {
		variant: 'circular',
		className: 'w-12 h-12',
	},
}

export const PillButton: Story = {
	args: {
		variant: 'pill',
		className: 'w-32 h-10',
	},
}

export const RestaurantCardComposition: Story = {
	render: () => (
		<div className="flex flex-col space-y-3">
			<Skeleton variant="card" className="h-[125px] w-[250px]" />
			<div className="space-y-2">
				<Skeleton variant="text" className="h-4 w-[250px]" />
				<Skeleton variant="text" className="h-4 w-[200px]" />
			</div>
			<div className="flex items-center space-x-4 pt-2">
				<Skeleton variant="circular" className="h-10 w-10 shrink-0" />
				<Skeleton variant="pill" className="h-8 w-24" />
			</div>
		</div>
	),
}

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-col space-y-6">
			<div className="space-y-2">
				<p className="text-sm font-medium text-slate-500">variant="text"</p>
				<Skeleton variant="text" className="h-4 w-[250px]" />
			</div>

			<div className="space-y-2">
				<p className="text-sm font-medium text-slate-500">variant="circular"</p>
				<Skeleton variant="circular" className="h-16 w-16" />
			</div>

			<div className="space-y-2">
				<p className="text-sm font-medium text-slate-500">variant="pill"</p>
				<Skeleton variant="pill" className="h-12 w-40" />
			</div>

			<div className="space-y-2">
				<p className="text-sm font-medium text-slate-500">variant="card"</p>
				<Skeleton variant="card" className="h-32 w-64" />
			</div>
		</div>
	),
}
