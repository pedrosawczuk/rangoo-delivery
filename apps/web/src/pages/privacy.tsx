import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Privacy() {
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
					Privacy Policy
				</h1>

				<div className="space-y-6 text-slate-700 leading-relaxed text-lg">
					<p>
						Bacon ipsum dolor amet corned beef frankfurter short loin picanha,
						salami chuck fatback bresaola tenderloin jowl. Pancetta pork
						bresaola, strip steak buffalo alcatra ham leberkas. T-bone cupim pig
						sirloin frankfurter, doner turkey pastrami bresaola andouille
						prosciutto buffalo.
					</p>

					<h2 className="font-serif text-2xl font-semibold text-slate-900 mt-8 mb-4">
						How we collect your ribs
					</h2>

					<p>
						Beef cow andouille tail fatback corned beef shankle landjaeger
						meatball doner capicola. Frankfurter tri-tip flank picanha kevin
						landjaeger drumstick short loin short ribs. Capicola corned beef
						salami doner strip steak pork loin meatloaf cupim tenderloin spare
						ribs hamburger biltong.
					</p>

					<p>
						Pork chop cupim chuck ribeye ham alcatra pastrami salami turducken
						pig buffalo meatloaf burgdoggen jowl. Sausage capicola pastrami pig
						drumstick. Rump landjaeger boudin meatloaf pastrami pancetta strip
						steak frankfurter, pork loin prosciutto cupim sirloin cow ball tip
						swine.
					</p>

					<h2 className="font-serif text-2xl font-semibold text-slate-900 mt-8 mb-4">
						Data Sharing with Butchers
					</h2>

					<p>
						Pastrami short ribs jowl, andouille beef tail picanha swine
						tenderloin cupim hamburger meatball t-bone biltong meatloaf. Pig
						venison shank boudin, turducken cupim pancetta meatloaf doner
						hamburger drumstick tail.
					</p>
				</div>
			</div>
		</div>
	)
}
