import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const supabaseUrl = "https://hvhsqkiiukjzqxtqnils.supabase.co";
const supabaseAnonKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2aHNxa2lpdWtqenF4dHFuaWxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMTY3OTUsImV4cCI6MjA1NzY5Mjc5NX0.akISnbg-cEq-z2TO4pDZGOqzlUjPeCY8AwAFY6eGXCc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});
