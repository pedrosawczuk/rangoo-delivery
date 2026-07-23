import type { Meta, StoryObj } from '@storybook/react-vite'
import { AlertCircle, CheckCircle2, EyeOff, Mail, Search } from 'lucide-react'
import { Input } from './input'

const meta: Meta<typeof Input> = {
	title: 'UI/Input',
	component: Input,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'error', 'success'],
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
type Story = StoryObj<typeof Input>

export const Default: Story = {
	args: {
		placeholder: 'Enter your address...',
		variant: 'default',
	},
}

export const Success: Story = {
	args: {
		placeholder: 'Username available',
		variant: 'success',
		value: 'johndoe',
		endIcon: CheckCircle2,
	},
}

export const Error: Story = {
	args: {
		placeholder: 'Invalid email',
		variant: 'error',
		value: 'john@',
		endIcon: AlertCircle,
	},
}

export const Disabled: Story = {
	args: {
		placeholder: 'Disabled field',
		disabled: true,
		startIcon: Search,
	},
}

export const WithStartIcon: Story = {
	args: {
		placeholder: 'Search restaurants...',
		variant: 'default',
		startIcon: Search,
	},
}

export const WithEndIcon: Story = {
	args: {
		placeholder: 'Enter your password',
		type: 'password',
		variant: 'default',
		endIcon: EyeOff,
	},
}

export const WithBothIcons: Story = {
	args: {
		placeholder: 'Email address',
		variant: 'default',
		startIcon: Mail,
		endIcon: CheckCircle2,
	},
}

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-col gap-4 w-full max-w-sm">
			<Input variant="default" placeholder="Search..." startIcon={Search} />
			<Input
				variant="success"
				placeholder="Valid username"
				value="johndoe"
				endIcon={CheckCircle2}
			/>
			<Input
				variant="error"
				placeholder="Invalid password"
				value="password123"
				endIcon={AlertCircle}
				type="password"
			/>
			<Input
				variant="default"
				disabled
				placeholder="Disabled"
				startIcon={Mail}
			/>
		</div>
	),
}
