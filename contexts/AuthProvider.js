import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../lib/supabase";
import { ActivityIndicator } from "react-native";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [session, setSession] = useState(null);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		// Pehle current session fetch karo
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setIsReady(true);
		});

		// Auth state change listener
		supabase.auth.onAuthStateChange((_event, session) => {
			console.log("Auth state changed! New session:", session);
			setSession(session);
		});

		// Cleanup listener on unmount
		// return () => listener.subscription.unsubscribe();
	}, []);

	if (!isReady) {
		return <ActivityIndicator />;
	}

	return (
		<AuthContext.Provider
			value={{
				session,
				user: session?.user,
				isAuthenticated: !!session?.user,
				// isAuthenticated: true,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
