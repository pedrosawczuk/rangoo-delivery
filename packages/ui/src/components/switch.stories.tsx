import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { Switch } from './switch'

const meta: Meta<typeof Switch> = {
	title: 'UI/Switch',
	component: Switch,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'error'],
		},
		disabled: {
			control: 'boolean',
		},
		checked: {
			control: 'boolean',
		},
	},
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
	args: {
		variant: 'default',
	},
}

export const WithLabel: Story = {
	render: (args) => (
		<div className="flex items-center space-x-3">
			<Switch id="marketing" {...args} />
			<label
				htmlFor="marketing"
				className="text-sm font-medium leading-none cursor-pointer"
			>
				Receive marketing emails
			</label>
		</div>
	),
}

export const ErrorState: Story = {
	render: () => (
		<div className="flex items-center space-x-3">
			<Switch id="terms" variant="error" />
			<label
				htmlFor="terms"
				className="text-sm font-medium leading-none text-red-600 cursor-pointer"
			>
				You must toggle this to continue
			</label>
		</div>
	),
}

export const Disabled: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex items-center space-x-3">
				<Switch id="d1" disabled />
				<label
					htmlFor="d1"
					className="text-sm font-medium leading-none text-slate-500 cursor-not-allowed"
				>
					Disabled Off
				</label>
			</div>
			<div className="flex items-center space-x-3">
				<Switch id="d2" disabled checked />
				<label
					htmlFor="d2"
					className="text-sm font-medium leading-none text-slate-500 cursor-not-allowed"
				>
					Disabled On
				</label>
			</div>
		</div>
	),
}

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-col gap-6">
			<div className="flex items-center space-x-3">
				<Switch id="v1" />
				<label htmlFor="v1" className="text-sm font-medium cursor-pointer">
					Default (Off)
				</label>
			</div>
			<div className="flex items-center space-x-3">
				<Switch id="v2" checked />
				<label htmlFor="v2" className="text-sm font-medium cursor-pointer">
					Default (On)
				</label>
			</div>
			<div className="flex items-center space-x-3">
				<Switch id="v3" variant="error" />
				<label
					htmlFor="v3"
					className="text-sm font-medium text-red-600 cursor-pointer"
				>
					Error State
				</label>
			</div>
			<div className="flex items-center space-x-3">
				<Switch id="v4" disabled />
				<label
					htmlFor="v4"
					className="text-sm font-medium text-slate-500 cursor-not-allowed"
				>
					Disabled
				</label>
			</div>
		</div>
	),
}
