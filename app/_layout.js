import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Redirect, Slot, Stack } from "expo-router";
import useAuthStore from "../store/authStore";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { AuthProvider } from "../contexts/AuthProvider";
import { askNotificationPermission } from "../services/notificationservice";

export default function RootLayout() {
	const queryClient = new QueryClient();

	useEffect(() => {
		askNotificationPermission(); // ✅ App start hote hi permission maangega
	}, []);

	// const fetchSession = useAuthStore((state) => state.fetchSession);
	// const setSession = useAuthStore((state) => state.setSession);
	// const isLoggedIn = useAuthStore((state) => state.isAuthenticated);

	// useEffect(() => {
	// 	fetchSession();

	// 	// Supabase Auth State Change Listener
	// 	const { data: listener } = supabase.auth.onAuthStateChange(
	// 		(_event, session) => {
	// 			setSession({ session, isAuthenticated: !!session?.user });
	// 		}
	// 	);

	// 	return () => listener.subscription.unsubscribe();
	// }, []);

	// Redirect to login if not logged in
	// if (!isLoggedIn) {
	// 	return <Redirect href="/login" />;
	// }

	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				</Stack>
			</QueryClientProvider>
		</AuthProvider>
	);
}
