import type { Meta, StoryObj } from '@storybook/react-vite'
import { Eye, Loader2, Trash2 } from 'lucide-react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
	title: 'UI/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: [
				'default',
				'destructive',
				'outline',
				'secondary',
				'ghost',
				'link',
			],
		},
		size: {
			control: 'select',
			options: ['default', 'sm', 'lg', 'icon'],
		},
		isLoading: { control: 'boolean' },
		disabled: { control: 'boolean' },
	},
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
	args: {
		children: 'Confirm',
		variant: 'default',
	},
}

export const Destructive: Story = {
	args: {
		children: 'Delete',
		variant: 'destructive',
	},
}

export const Outline: Story = {
	args: {
		children: 'Cancel',
		variant: 'outline',
	},
}

export const Secondary: Story = {
	args: {
		children: 'Secondary action',
		variant: 'secondary',
	},
}

export const Ghost: Story = {
	args: {
		children: 'Subtle action',
		variant: 'ghost',
	},
}

export const Link: Story = {
	args: {
		children: 'View details',
		variant: 'link',
	},
}

export const WithIcon: Story = {
	args: {
		children: 'Preview',
		variant: 'outline',
		icon: Eye,
	},
}

export const DestructiveWithIcon: Story = {
	args: {
		children: 'Delete item',
		variant: 'destructive',
		icon: Trash2,
	},
}

export const Loading: Story = {
	args: {
		children: 'Saving...',
		variant: 'default',
		isLoading: true,
		icon: Loader2,
	},
}

export const Small: Story = {
	args: {
		children: 'Small',
		size: 'sm',
	},
}

export const Large: Story = {
	args: {
		children: 'Large',
		size: 'lg',
	},
}

export const IconOnly: Story = {
	args: {
		size: 'icon',
		variant: 'outline',
		icon: Trash2,
	},
}

export const Disabled: Story = {
	args: {
		children: 'Unavailable',
		disabled: true,
	},
}
