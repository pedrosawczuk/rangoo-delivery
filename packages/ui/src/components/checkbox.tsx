import { cva, type VariantProps } from 'class-variance-authority'
import { Check } from 'lucide-react'
import * as React from 'react'
import { cn } from '../lib/utils'

export const checkboxVariants = cva(
	'peer shrink-0 flex items-center justify-center h-5 w-5 rounded-md border bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
	{
		variants: {
			variant: {
				default:
					'border-slate-300 focus-visible:ring-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground',
				error:
					'border-red-500 focus-visible:ring-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 data-[state=checked]:text-white',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

export interface CheckboxProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>,
		VariantProps<typeof checkboxVariants> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	({ className, variant, disabled, checked, onChange, ...props }, ref) => {
		// Local state for uncontrolled usage if checked isn't provided
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
					'relative flex items-center cursor-pointer',
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
					className={cn(checkboxVariants({ variant, className }))}
					data-state={isChecked ? 'checked' : 'unchecked'}
				>
					{isChecked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
				</div>
			</label>
		)
	},
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
