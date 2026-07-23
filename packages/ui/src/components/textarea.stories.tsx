import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { Textarea } from './textarea'

const meta: Meta<typeof Textarea> = {
	title: 'UI/Textarea',
	component: Textarea,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'error'],
		},
		placeholder: {
			control: 'text',
		},
		disabled: {
			control: 'boolean',
		},
	},
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
	args: {
		placeholder: 'Any special requests? (e.g., no onions)',
		variant: 'default',
	},
}

export const ErrorState: Story = {
	args: {
		placeholder: 'Please enter at least 10 characters',
		variant: 'error',
		value: 'too short',
	},
}

export const Disabled: Story = {
	args: {
		placeholder: 'Notes are not available for this restaurant',
		disabled: true,
	},
}

export const WithLabel: Story = {
	render: (args) => (
		<div className="flex w-full max-w-sm flex-col gap-2">
			<label
				htmlFor="delivery-notes"
				className="text-sm font-medium leading-none text-slate-700"
			>
				Delivery Instructions
			</label>
			<Textarea
				id="delivery-notes"
				{...args}
				placeholder="e.g., Leave the food at the front door."
			/>
			<p className="text-xs text-slate-500">Max 500 characters.</p>
		</div>
	),
}

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-col gap-6 w-full max-w-sm">
			<Textarea variant="default" placeholder="Default state..." />
			<Textarea
				variant="error"
				placeholder="Error state..."
				value="Invalid input"
			/>
			<Textarea variant="default" disabled placeholder="Disabled state..." />
		</div>
	),
}
