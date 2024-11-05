import React from 'react'
import "#root/styles/tailwind.css";
// import logouri from " #root/assets/overlappLogo.svg";
import { AuthProvider, FirebaseAppProvider, FirestoreProvider, useFirebaseApp } from 'reactfire';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import AuthWrapper from './AuthWrapper';

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
	return (
		<FirebaseAppProvider firebaseConfig={import.meta.env.PUBLIC_ENV__FIREBASE_CONFIG}>
			<App children={children} />
		</FirebaseAppProvider>
	)
}



function App({ children }: { children: React.ReactNode }) {
	const firestoreInstance = getFirestore(useFirebaseApp());
	const firebaseApp = useFirebaseApp();
	const auth = getAuth(firebaseApp);

  return (
		<FirestoreProvider sdk={firestoreInstance}>
			<AuthProvider sdk={auth}>
				<AuthWrapper fallback={<></>}>
					{children}
				</AuthWrapper>
			</AuthProvider>

		</FirestoreProvider>
  );
}

