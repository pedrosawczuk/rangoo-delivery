import { ArrowLeft, UtensilsCrossed } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFound() {
	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center bg-primary p-8 text-primary-foreground font-sans relative overflow-hidden selection:bg-white/20 selection:text-white">
			<div className="absolute -left-24 -top-24 h-150 w-150 rounded-full bg-white opacity-5 mix-blend-overlay blur-3xl" />
			<div className="absolute -bottom-48 -right-48 h-200 w-200 rounded-full bg-orange-950 opacity-10 mix-blend-overlay blur-3xl" />

			<div className="relative z-10 flex flex-col items-center text-center">
				<div className="mb-12 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm shadow-xl animate-in fade-in zoom-in duration-700">
					<UtensilsCrossed className="h-8 w-8 text-white" />
				</div>

				<h1 className="font-serif text-[8rem] sm:text-[12rem] lg:text-[16rem] leading-none tracking-tighter text-white opacity-95">
					404
				</h1>

				<h2 className="mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl text-white">
					This plate is empty.
				</h2>

				<p className="mt-6 max-w-lg text-lg text-primary-light">
					The page you are looking for might have been removed, had its name
					changed, or is temporarily unavailable. Let's get you back to the
					menu.
				</p>

				<div className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
					<Link
						to="/"
						className="inline-flex items-center justify-center h-14 px-8 rounded-md text-base font-semibold bg-white text-orange-600 hover:bg-slate-50 shadow-2xl transition-colors"
					>
						<ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
					</Link>
					<Link
						to="/login"
						className="inline-flex items-center justify-center h-14 px-8 rounded-md text-base font-semibold bg-transparent border border-white/30 text-white hover:bg-white/10 transition-colors"
					>
						Go to Login
					</Link>
				</div>
			</div>
		</div>
	)
}
