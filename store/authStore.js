import { create } from "zustand";
import { supabase } from "../lib/supabase"; // Ensure supabase client is correctly imported

const useAuthStore = create((set) => ({
	session: null,
	setSession: (session) => set({ session }),
	isAuthenticated: true,

	fetchSession: async () => {
		const { data } = await supabase.auth.getSession();
		set({ session: data.session, isAuthenticated: !!data.session?.user });
	},

	logout: async () => {
		await supabase.auth.signOut();
		set({ session: null, isAuthenticated: false });
	},
}));

export default useAuthStore;
