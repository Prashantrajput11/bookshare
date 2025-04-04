import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import tw from "twrnc";

export default function App() {
	return (
		<View style={styles.container}>
			<Text style={tw`text-2xl text-orange-400 `}>
				Open up App.js to start working on your app!
			</Text>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
