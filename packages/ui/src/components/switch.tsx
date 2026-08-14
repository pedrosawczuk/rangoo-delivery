"use client"
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../lib/utils'

export const switchVariants = cva(
	'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-slate-200 data-[state=checked]:bg-primary',
	{
		variants: {
			variant: {
				default: 'focus-visible:ring-primary',
				error: 'ring-2 ring-red-500 focus-visible:ring-red-500',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

export interface SwitchProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>,
		VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
	({ className, variant, disabled, checked, onChange, ...props }, ref) => {
		// Gerenciamento interno de estado caso o componente não seja controlado
		const [internalChecked, setInternalChecked] = React.useState(false)
		const isChecked = checked !== undefined ? checked : internalChecked

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (checked === undefined) {
				setInternalChecked(e.target.checked)
			}
			onChange?.(e)
		}

		return (
			<label
				className={cn(
					'relative inline-flex cursor-pointer items-center',
					disabled && 'cursor-not-allowed opacity-50',
				)}
			>
				<input
					type="checkbox"
					className="peer sr-only"
					ref={ref}
					disabled={disabled}
					checked={checked}
					onChange={handleChange}
					{...props}
				/>
				<div
					className={cn(switchVariants({ variant, className }))}
					data-state={isChecked ? 'checked' : 'unchecked'}
				>
					<span
						data-state={isChecked ? 'checked' : 'unchecked'}
						className={cn(
							'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
						)}
					/>
				</div>
			</label>
		)
	},
)
Switch.displayName = 'Switch'

export { Switch }

