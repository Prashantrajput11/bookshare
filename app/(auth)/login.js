import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Platform,
	KeyboardAvoidingView,
	Pressable,
	Alert,
} from "react-native";
import React, { useState } from "react";
import tw from "../../lib/tailwind";
import { Link, router } from "expo-router";
import { supabase } from "../../lib/supabase"; // ✅ Import Supabase

export default function Login() {
	const [email, setEmail] = useState(""); // ✅ Store email
	const [password, setPassword] = useState(""); // ✅ Store password
	const [loading, setLoading] = useState(false); // ✅ Track loading state

	// ✅ Login Function
	async function signInWithEmail() {
		if (!email || !password) {
			Alert.alert("Error", "Please enter both email and password.");
			return;
		}

		setLoading(true);
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		console.log("data", data);

		if (error) {
			Alert.alert("Login Failed", error.message);
		} else {
			// Navigate to home page after successful login
			router.replace("/");
		}

		setLoading(false);
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={tw`flex-1`}
		>
			<ScrollView
				contentContainerStyle={tw`p-5 `}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
			>
				{/* Page Title */}
				<Text style={tw`text-2xl font-bold text-gray-800 text-center mb-5`}>
					Login
				</Text>

				{/* Input Fields */}
				<View style={tw`bg-white p-5 rounded-2xl shadow-md`}>
					{/* Email Input */}
					<Text style={tw`text-gray-700 mb-1`}>Email</Text>
					<TextInput
						style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
						placeholder="Enter Email"
						value={email} // ✅ Bind email state
						onChangeText={setEmail} // ✅ Update email state
						keyboardType="email-address"
						autoCapitalize="none"
					/>

					{/* Password Input */}
					<Text style={tw`text-gray-700 mb-1`}>Password</Text>
					<TextInput
						style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
						placeholder="Enter Password"
						value={password} // ✅ Bind password state
						onChangeText={setPassword} // ✅ Update password state
						secureTextEntry={true}
					/>

					{/* Submit Button */}
					<TouchableOpacity
						style={tw`bg-blue-500 p-3 rounded-lg mt-2`}
						onPress={signInWithEmail}
						disabled={loading} // ✅ Disable button when loading
					>
						<Text style={tw`text-white text-center font-bold`}>
							{loading ? "Logging in..." : "Login"}
						</Text>
					</TouchableOpacity>
				</View>

				<Pressable>
					<Link href="/signup">No Account yet?</Link>
				</Pressable>

				{/* Add extra space at bottom for keyboard */}
				<View style={tw`h-10`} />
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
