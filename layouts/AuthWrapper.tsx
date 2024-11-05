import { useSigninCheck } from 'reactfire';
import { redirect } from 'vike/abort'

const AuthWrapper = ({ children, fallback }: React.PropsWithChildren<{ fallback: JSX.Element }>): JSX.Element => {
	const { status, data: signInCheckResult } = useSigninCheck();

	if (!children) {
		throw new Error('Children must be provided');
	}
	if (status === 'loading') {
		return <> Loading...</>;
	} else if (signInCheckResult.signedIn === true) {
		return children as JSX.Element;
	}
	throw redirect('/login')
};

export default AuthWrapper;