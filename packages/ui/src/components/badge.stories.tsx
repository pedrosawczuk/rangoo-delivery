import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './badge'

const meta: Meta<typeof Badge> = {
	title: 'UI/Badge',
	component: Badge,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'success', 'warning', 'destructive', 'outline'],
		},
	},
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
	args: { children: 'Neutral', variant: 'default' },
}

export const Success: Story = {
	args: { children: 'Delivered', variant: 'success' },
}

export const Warning: Story = {
	args: { children: 'Pending', variant: 'warning' },
}

export const Destructive: Story = {
	args: { children: 'Canceled', variant: 'destructive' },
}

export const Outline: Story = {
	args: { children: 'Open', variant: 'outline' },
}

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-wrap gap-2">
			<Badge variant="default">Neutral</Badge>
			<Badge variant="success">Delivered</Badge>
			<Badge variant="warning">Pending</Badge>
			<Badge variant="destructive">Canceled</Badge>
			<Badge variant="outline">Open</Badge>
		</div>
	),
}
