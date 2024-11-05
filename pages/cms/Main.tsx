import "./style.css";

import "#root/styles/tailwind.css";
import React from "react";
import logoUrl from "#root/assets/overlappLogo.svg";
import { Link } from "#root/components/Link.jsx";
import { navigate } from "vike/client/router";
import { signOut } from 'firebase/auth';
import { Toaster } from 'react-hot-toast';
import { useAuth } from 'reactfire';





export default function Main({ children }: { children: React.ReactNode }) {

	const auth = useAuth();
	const handleClick = async () => {
		await signOut(auth)
		const navigationPromise = navigate('/login')
		await navigationPromise
	}

	return (
		<div className="flex max-w-5xl m-auto">
			<Sidebar>
				<Logo />
				<Link href="/">Welcome</Link>
				<Toaster position="top-center" />
				<button onClick={handleClick} className=" mt-4 btn btn-sm btn-primary"> SignOut
				</button>
			</Sidebar>
			<Content>{children}</Content>
		</div>
	);
}

function Sidebar({ children }: { children: React.ReactNode }) {
	return (
		<div id="sidebar" className="p-5 flex flex-col shrink-0 border-r-2 border-r-gray-200">
			{children}
		</div>
	);
}

function Content({ children }: { children: React.ReactNode }) {
	return (
		<div id="page-container">
			<div id="page-content" className="min-h-screen">
				{children}
			</div>
		</div>
	);
}

function Logo() {
	return (
		<div className="p-5 mb-2">
			<a href="/">
				<img src={logoUrl} height={64} width={64} alt="logo" />
			</a>
		</div>
	);
}


