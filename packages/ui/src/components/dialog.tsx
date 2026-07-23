import { X } from 'lucide-react'
import * as React from 'react'
import { cn } from '../lib/utils'

// --- Context ---
interface DialogContextValue {
	open: boolean
	onOpenChange: (open: boolean) => void
}
const DialogContext = React.createContext<DialogContextValue | undefined>(
	undefined,
)

function useDialog() {
	const context = React.useContext(DialogContext)
	if (!context) throw new Error('useDialog must be used within a Dialog')
	return context
}

// --- Components ---

export interface DialogProps {
	open?: boolean
	onOpenChange?: (open: boolean) => void
	children: React.ReactNode
}

export function Dialog({
	open: controlledOpen,
	onOpenChange: setControlledOpen,
	children,
}: DialogProps) {
	const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
	const isControlled = controlledOpen !== undefined
	const open = isControlled ? controlledOpen : uncontrolledOpen
	const onOpenChange = isControlled ? setControlledOpen! : setUncontrolledOpen

	return (
		<DialogContext.Provider value={{ open, onOpenChange }}>
			{children}
		</DialogContext.Provider>
	)
}

export function DialogTrigger({
	children,
	asChild,
}: {
	children: React.ReactNode
	asChild?: boolean
}) {
	const { onOpenChange } = useDialog()

	if (asChild && React.isValidElement(children)) {
		return React.cloneElement(children as React.ReactElement, {
			// @ts-expect-error - bypassing strict type for generic click
			onClick: (e: React.MouseEvent) => {
				children.props.onClick?.(e)
				onOpenChange(true)
			},
		})
	}

	return (
		<div onClick={() => onOpenChange(true)} className="inline-block">
			{children}
		</div>
	)
}

export interface DialogContentProps
	extends React.DialogHTMLAttributes<HTMLDialogElement> {}

export const DialogContent = React.forwardRef<
	HTMLDialogElement,
	DialogContentProps
>(({ className, children, ...props }, ref) => {
	const { open, onOpenChange } = useDialog()
	const internalRef = React.useRef<HTMLDialogElement>(null)
	const dialogRef = (ref as React.RefObject<HTMLDialogElement>) || internalRef

	React.useEffect(() => {
		const dialog = dialogRef.current
		if (!dialog) return
		if (open) {
			if (!dialog.open) dialog.showModal()
		} else {
			if (dialog.open) dialog.close()
		}
	}, [open, dialogRef])

	const handleClose = React.useCallback(
		(e: React.SyntheticEvent) => {
			onOpenChange(false)
			props.onClose?.(e)
		},
		[onOpenChange, props],
	)

	const handleBackdropClick = React.useCallback(
		(e: React.MouseEvent<HTMLDialogElement>) => {
			if (e.target === dialogRef.current) {
				onOpenChange(false)
			}
			props.onClick?.(e)
		},
		[onOpenChange, dialogRef, props],
	)

	return (
		<dialog
			ref={dialogRef}
			onClose={handleClose}
			onClick={handleBackdropClick}
			className={cn(
				'open:animate-in open:fade-in-0 open:zoom-in-95 open:slide-in-from-bottom-2',
				'backdrop:bg-black/60 backdrop:backdrop-blur-sm backdrop:open:animate-in backdrop:open:fade-in-0',
				'm-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:max-w-lg w-full max-w-[90vw] relative flex flex-col gap-4',
				className,
			)}
			{...props}
		>
			{children}
			<button
				onClick={() => onOpenChange(false)}
				className="absolute right-4 top-4 rounded-full p-1 opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none"
			>
				<X className="h-4 w-4" />
				<span className="sr-only">Close</span>
			</button>
		</dialog>
	)
})
DialogContent.displayName = 'DialogContent'

export const DialogHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			'flex flex-col space-y-1.5 text-center sm:text-left',
			className,
		)}
		{...props}
	/>
)
DialogHeader.displayName = 'DialogHeader'

export const DialogFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
			className,
		)}
		{...props}
	/>
)
DialogFooter.displayName = 'DialogFooter'

export const DialogTitle = ({
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
	<h2
		className={cn(
			'text-lg font-semibold leading-none tracking-tight text-slate-900',
			className,
		)}
		{...props}
	/>
)
DialogTitle.displayName = 'DialogTitle'

export const DialogDescription = ({
	className,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
	<p className={cn('text-sm text-slate-500', className)} {...props} />
)
DialogDescription.displayName = 'DialogDescription'
