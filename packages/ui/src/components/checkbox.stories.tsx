import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { Checkbox } from './checkbox'

const meta: Meta<typeof Checkbox> = {
	title: 'UI/Checkbox',
	component: Checkbox,
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
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
	args: {
		variant: 'default',
	},
}

export const WithLabel: Story = {
	render: (args) => (
		<div className="flex items-center space-x-2">
			<Checkbox id="terms" {...args} />
			<label
				htmlFor="terms"
				className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
			>
				Accept terms and conditions
			</label>
		</div>
	),
}

export const ErrorState: Story = {
	render: () => (
		<div className="flex items-center space-x-2">
			<Checkbox id="terms-error" variant="error" />
			<label
				htmlFor="terms-error"
				className="text-sm font-medium leading-none text-red-600 cursor-pointer"
			>
				You must accept the terms
			</label>
		</div>
	),
}

export const Disabled: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex items-center space-x-2">
				<Checkbox id="disabled-1" disabled />
				<label
					htmlFor="disabled-1"
					className="text-sm font-medium leading-none text-slate-500 cursor-not-allowed"
				>
					Disabled unchecked
				</label>
			</div>
			<div className="flex items-center space-x-2">
				<Checkbox id="disabled-2" disabled checked />
				<label
					htmlFor="disabled-2"
					className="text-sm font-medium leading-none text-slate-500 cursor-not-allowed"
				>
					Disabled checked
				</label>
			</div>
		</div>
	),
}

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-col gap-6">
			<div className="flex items-center space-x-2">
				<Checkbox id="all-1" />
				<label
					htmlFor="all-1"
					className="text-sm font-medium leading-none cursor-pointer"
				>
					Default
				</label>
			</div>
			<div className="flex items-center space-x-2">
				<Checkbox id="all-2" checked />
				<label
					htmlFor="all-2"
					className="text-sm font-medium leading-none cursor-pointer"
				>
					Checked
				</label>
			</div>
			<div className="flex items-center space-x-2">
				<Checkbox id="all-3" variant="error" />
				<label
					htmlFor="all-3"
					className="text-sm font-medium leading-none text-red-600 cursor-pointer"
				>
					Error state
				</label>
			</div>
			<div className="flex items-center space-x-2">
				<Checkbox id="all-4" disabled />
				<label
					htmlFor="all-4"
					className="text-sm font-medium leading-none text-slate-500 cursor-not-allowed"
				>
					Disabled
				</label>
			</div>
		</div>
	),
}
