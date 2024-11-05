import { navigate } from 'vike/client/router'
import { useSigninCheck } from 'reactfire';

export default function Page() {
	const { status, data: signInCheckResult } = useSigninCheck();


	const handleClick = async () => {
		const navigationPromise = signInCheckResult.signedIn ? navigate('/cms') : navigate('/login')
		await navigationPromise
	}

  return (
		<>
			<div className="relative bg-white">
				<div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
					<div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-48 lg:pt-40 xl:col-span-6">
						<div className="mx-auto max-w-lg lg:mx-0">
							<img
								alt="Overlapp"
								src='../../assets/overlappLogo.svg'
								className="h-11"
							/>
							<div className="hidden sm:mt-32 sm:flex lg:mt-16">
								<div className="relative rounded-full px-3 py-1 text-xl text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
									Overlapp App CMS.{' '}
								</div>
							</div>
							<h1 className="mt-24 text-pretty text-2xl font-semibold tracking-tight text-gray-900 sm:mt-10 sm:text-2xl">
								Data to enrich our Overlapp App :){' '}
							</h1>
							<p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
								Let's Add some fun stuff !!
							</p>
							<div className="mt-10 flex items-center gap-x-6">
								<button className="btn btn-primary" onClick={handleClick}>Get Going</button>
							</div>
						</div>
					</div>
					<div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
						<img
							alt=""
							src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2102&q=80"
							className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
						/>
					</div>
				</div>
			</div>
		</>
  );
}
