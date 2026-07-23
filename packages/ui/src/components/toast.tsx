import { cva, type VariantProps } from 'class-variance-authority'
import { AlertCircle, CheckCircle2, X } from 'lucide-react'
import * as React from 'react'
import { cn } from '../lib/utils'

// --- State & Context ---
type ToastVariant = 'default' | 'success' | 'destructive'

export interface ToastProps {
	id: string
	title: string
	description?: string
	variant?: ToastVariant
	action?: React.ReactNode
	duration?: number
}

interface ToastContextType {
	toasts: ToastProps[]
	toast: (props: Omit<ToastProps, 'id'>) => void
	dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(
	undefined,
)

export function ToastProvider({ children }: { children: React.ReactNode }) {
	const [toasts, setToasts] = React.useState<ToastProps[]>([])

	const toast = React.useCallback((props: Omit<ToastProps, 'id'>) => {
		const id = Math.random().toString(36).slice(2)
		const duration = props.duration || 4000

		setToasts((prev) => [...prev, { ...props, id }])

		setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== id))
		}, duration)
	}, [])

	const dismiss = React.useCallback((id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id))
	}, [])

	return (
		<ToastContext.Provider value={{ toasts, toast, dismiss }}>
			{children}
			<Toaster />
		</ToastContext.Provider>
	)
}

export function useToast() {
	const context = React.useContext(ToastContext)
	if (!context) {
		throw new Error('useToast must be used within a ToastProvider')
	}
	return context
}

// --- Visual Components ---

const toastVariants = cva(
	'pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-2xl border p-4 pr-6 shadow-lg transition-all animate-in slide-in-from-bottom-5 fade-in duration-300',
	{
		variants: {
			variant: {
				default: 'border-slate-200 bg-white text-slate-900',
				success: 'border-green-200 bg-green-50 text-green-900',
				destructive: 'border-red-200 bg-red-50 text-red-900',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

function Toaster() {
	const { toasts, dismiss } = useToast()

	return (
		<div className="fixed bottom-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] gap-2 pointer-events-none mx-auto sm:mx-0 left-0 right-0 sm:left-auto">
			{toasts.map(({ id, title, description, variant, action }) => (
				<div key={id} className={cn(toastVariants({ variant }))}>
					<div className="flex items-start gap-3 w-full">
						{variant === 'success' && (
							<CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
						)}
						{variant === 'destructive' && (
							<AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
						)}
						<div className="flex flex-col gap-1 w-full">
							<h3 className="text-sm font-semibold">{title}</h3>
							{description && (
								<p className="text-sm opacity-90">{description}</p>
							)}
						</div>
					</div>
					{action && <div className="shrink-0">{action}</div>}
					<button
						onClick={() => dismiss(id)}
						className="absolute right-2 top-2 rounded-md p-1 opacity-50 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2"
					>
						<X className="h-4 w-4" />
					</button>
				</div>
			))}
		</div>
	)
}
