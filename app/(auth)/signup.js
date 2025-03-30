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
	ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import tw from "../../lib/tailwind";
import { Link } from "expo-router";
import { supabase } from "../../lib/supabase";

export default function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	// sign the user
	async function signUpWithEmail() {
		console.log("hlo");

		setLoading(true);
		const {
			data: { session },
			error,
		} = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		setLoading(false);
		console.log("data after signup", session);

		if (error) {
			Alert.alert(error.message);
		}

		if (!session) {
			console.log("error");
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
					Register
				</Text>

				{/* Input Fields */}
				<View style={tw`bg-white p-5 rounded-2xl shadow-md`}>
					{/* Title Input */}
					<Text style={tw`text-gray-700 mb-1`}>Email</Text>
					<TextInput
						style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
						placeholder="Enter Email"
						value={email}
						onChangeText={(text) => setEmail(text)}
					/>

					{/* Author Input */}
					<Text style={tw`text-gray-700 mb-1`}>Password</Text>
					<TextInput
						style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
						placeholder="Enter password"
						value={password}
						onChangeText={(text) => setPassword(text)}
					/>

					{/* Submit Button */}
					<TouchableOpacity
						style={tw`bg-blue-500 p-3 rounded-lg mt-2`}
						onPress={signUpWithEmail}
						disabled={loading}
					>
						{loading ? (
							<ActivityIndicator color="white" />
						) : (
							<Text style={tw`text-white text-center font-bold`}>Register</Text>
						)}
					</TouchableOpacity>
				</View>

				<Pressable>
					<Link href="/login">Login</Link>
				</Pressable>

				{/* Add extra space at bottom for keyboard */}
				<View style={tw`h-10`} />
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
