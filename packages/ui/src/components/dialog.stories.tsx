import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { Button } from './button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './dialog'

const meta: Meta<typeof Dialog> = {
	title: 'UI/Dialog',
	component: Dialog,
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Edit Profile</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className="text-sm text-slate-500">
					<p>
						This is where the form fields would go (e.g., Name, Email, Phone).
					</p>
				</div>
				<DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
}

export const Destructive: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="destructive">Cancel Order</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently cancel your
						order and refund the payment.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline">Keep Order</Button>
					<Button variant="destructive">Yes, Cancel</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
}

export const Scrollable: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary">View Terms</Button>
			</DialogTrigger>
			<DialogContent className="max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Terms and Conditions</DialogTitle>
					<DialogDescription>
						Please read these terms carefully before using our delivery service.
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4 text-sm text-slate-600">
					<p>
						1. Introduction. Welcome to Rangoo Delivery. These terms govern your
						use of our platform.
					</p>
					<p>
						2. Ordering. By placing an order, you agree to pay the total amount
						including taxes and delivery fees.
					</p>
					<p>
						3. Delivery Times. Estimates are just that—estimates. We do our best
						to be fast.
					</p>
					<p>
						4. Refunds. If your food is missing, we will refund you according to
						our policy.
					</p>
					<p>5. User Conduct. Be nice to our couriers.</p>
					<p>
						6. Privacy. We collect your data to deliver food to your door.
						That's about it.
					</p>
					<p>7. Modifications. We can change these terms at any time.</p>
					<p>8. Governing Law. These terms are governed by local laws.</p>
					<p>9. Contact. If you have questions, contact support@rangoo.com.</p>
					<p>10. Conclusion. Enjoy your food!</p>
				</div>
				<DialogFooter>
					<Button className="w-full sm:w-auto">I Agree</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
}
