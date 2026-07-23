import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Terms() {
	return (
		<div className="min-h-screen bg-white py-12 px-6 sm:px-12 lg:px-24 text-slate-900 font-sans selection:bg-primary-light selection:text-primary">
			<div className="max-w-3xl mx-auto">
				<Link
					to="/register"
					className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary mb-12 transition-colors"
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back
				</Link>

				<h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-8">
					Terms of Service
				</h1>

				<div className="space-y-6 text-slate-700 leading-relaxed text-lg">
					<p>
						Bacon ipsum dolor amet pork belly meatball kevin spare ribs.
						Frankfurter swine cow biltong pancetta shank. Pork chop turducken
						corned beef, pastrami kielbasa venison prosciutto ribeye. Buffalo
						tri-tip strip steak pastrami, meatball pork chop shank capicola
						bresaola biltong sirloin hamburger bacon tail short loin.
					</p>

					<h2 className="font-serif text-2xl font-semibold text-slate-900 mt-8 mb-4">
						1. Acceptance of Meat
					</h2>

					<p>
						Brisket burgdoggen flank fatback, pork chop shankle filet mignon
						pig. Short ribs drumstick landjaeger, t-bone chicken jowl strip
						steak boudin burgdoggen pork flank tri-tip buffalo frankfurter
						meatloaf. Jerky landjaeger porchetta cupim picanha, ground round
						turkey short loin sausage spare ribs biltong pork fatback rump
						meatball.
					</p>

					<p>
						Filet mignon salami picanha, shank capicola pork loin turkey biltong
						boudin drumstick cow chislic landjaeger pastrami. Bresaola
						landjaeger pork pig strip steak cow t-bone capicola spare ribs jowl.
						Rump bresaola pork belly, shank boudin turkey picanha kevin
						frankfurter pig meatloaf t-bone corned beef alcatra.
					</p>

					<h2 className="font-serif text-2xl font-semibold text-slate-900 mt-8 mb-4">
						2. Pork Belly Obligations
					</h2>

					<p>
						Porchetta leberkas meatloaf beef pastrami turducken swine drumstick
						filet mignon sirloin buffalo shank ham hock ball tip salami. Tongue
						ribeye jowl ground round cupim meatball t-bone sirloin prosciutto
						pastrami short ribs sausage corned beef burgdoggen capicola. Short
						ribs andouille shank pancetta shoulder turducken buffalo prosciutto.
					</p>
				</div>
			</div>
		</div>
	)
}
