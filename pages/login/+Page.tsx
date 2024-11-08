import "#root/styles/tailwind.css";
import logoUrl from "#root/assets/overlappLogo.svg";
import { useEffect, useState } from "react";
import { navigate } from "vike/client/router";
import { useAuth, useSigninCheck } from 'reactfire';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { redirect } from 'vike/abort'

export default function Page() {
	const auth = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: any) => {
		e.preventDefault()
	}

	const loginWihtEmailAndPassword = async (email: string, password: string) => {

		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;
			return user;
		} catch (error: any) {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log('errorCode', errorCode)
			console.log('errorMessage', errorMessage)
		}
	}

	const handleClick = async () => {
		const user = await loginWihtEmailAndPassword(email, password);
		if (user) {
			console.log('User logged in', user.uid);
			const navigationPromise = navigate('/cms')
			await navigationPromise;
		}
	}

	return (
		<>
			<div className=" h-full bg-white">
				<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						<img
							alt="Overlapp Logo"
							src={logoUrl}
							className="mx-auto h-10 w-auto"
						/>
						<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
							Sign in to your account
						</h2>
					</div>

					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
						<form onSubmit={handleSubmit} method="POST" className="space-y-6">
							<div>
								<label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
									Email address
								</label>
								<div className="mt-2">
									<input
										id="email"
										name="email"
										type="email"
										required
										autoComplete="email"
										onChange={(e) => setEmail(e.target.value)}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
									/>
								</div>
							</div>

							<div>
								<div className="flex items-center justify-between">
									<label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
										Password
									</label>
								</div>
								<div className="mt-2">
									<input
										id="password"
										name="password"
										type="password"
										required
										autoComplete="current-password"
										onChange={(e) => setPassword(e.target.value)}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
									/>
								</div>
							</div>

							<div>
								<button
									onClick={handleClick}
									className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									Sign in
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}


