import { View, Text, Button } from "react-native";
import React from "react";
import { supabase } from "../../lib/supabase";

export default function profile() {
	return (
		<View>
			<Text>profile</Text>

			<Button title="signout" onPress={() => supabase.auth.signOut()} />
		</View>
	);
}
