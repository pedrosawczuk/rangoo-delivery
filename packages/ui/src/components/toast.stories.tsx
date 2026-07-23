import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { Button } from './button'
import { ToastProvider, useToast } from './toast'

const meta: Meta<typeof ToastProvider> = {
	title: 'UI/Toast',
	component: ToastProvider,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<ToastProvider>
				<Story />
			</ToastProvider>
		),
	],
}

export default meta
type Story = StoryObj<typeof ToastProvider>

const ToastDemo = ({ variant, title, description, action }: any) => {
	const { toast } = useToast()
	return (
		<Button
			onClick={() =>
				toast({
					title,
					description,
					variant,
					action,
				})
			}
		>
			Show Toast
		</Button>
	)
}

export const Default: Story = {
	render: () => (
		<ToastDemo
			title="Item added to cart"
			description="1x Double Cheeseburger was added."
			variant="default"
		/>
	),
}

export const Success: Story = {
	render: () => (
		<ToastDemo
			title="Payment Successful"
			description="Your order is being prepared by the restaurant."
			variant="success"
		/>
	),
}

export const Destructive: Story = {
	render: () => (
		<ToastDemo
			title="Connection Error"
			description="Failed to load restaurants near you. Please try again."
			variant="destructive"
		/>
	),
}

export const WithAction: Story = {
	render: () => (
		<ToastDemo
			title="Order Cancelled"
			description="Your order has been successfully cancelled."
			variant="default"
			action={
				<Button
					variant="outline"
					size="sm"
					onClick={() => alert('Undo clicked')}
				>
					Undo
				</Button>
			}
		/>
	),
}

export const MultipleSpamTest: Story = {
	render: () => {
		const { toast } = useToast()
		return (
			<Button
				onClick={() => {
					toast({ title: 'Toast 1', variant: 'success' })
					setTimeout(
						() => toast({ title: 'Toast 2', variant: 'destructive' }),
						200,
					)
					setTimeout(
						() =>
							toast({
								title: 'Toast 3 (Longer)',
								description: 'Here is some extra text.',
							}),
						500,
					)
				}}
			>
				Spam Multiple Toasts
			</Button>
		)
	},
}
