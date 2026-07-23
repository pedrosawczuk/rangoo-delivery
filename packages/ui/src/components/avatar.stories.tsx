import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from './avatar'

const meta: Meta<typeof Avatar> = {
	title: 'UI/Avatar',
	component: Avatar,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
	},
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
	args: {
		src: 'https://github.com/shadcn.png',
		alt: 'Shadcn',
		fallback: 'SC',
		size: 'md',
	},
}

export const WithBrokenImage: Story = {
	args: {
		src: 'https://this-image-does-not-exist.example.com/broken.png',
		alt: 'Broken',
		fallback: 'JD',
		size: 'md',
	},
}

export const FallbackOnly: Story = {
	args: {
		fallback: 'PH',
		size: 'md',
	},
}

export const Sizes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Avatar fallback="SM" size="sm" />
			<Avatar fallback="MD" size="md" />
			<Avatar fallback="LG" size="lg" />
		</div>
	),
}
