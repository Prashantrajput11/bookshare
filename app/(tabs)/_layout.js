import { Redirect, Tabs } from "expo-router";
import { Home, Plus, User } from "lucide-react-native";
import tw from "twrnc";
import { getTwColor } from "../../utils/utils";

import { useAuth } from "../../contexts/AuthProvider";

export default function TabLayout() {
	const { isAuthenticated } = useAuth();

	console.log(isAuthenticated);

	if (!isAuthenticated) {
		return <Redirect href="/login" />;
	}

	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: "black" }}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: () => (
						<Home color={getTwColor(tw`bg-teal-600`)} size={28} />
					),
				}}
			/>
			<Tabs.Screen
				name="create"
				options={{
					title: "Create",
					tabBarIcon: () => (
						<Plus color={getTwColor(tw`bg-teal-600`)} size={28} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: () => (
						<User color={getTwColor(tw`bg-teal-600`)} size={28} />
					),
				}}
			/>
		</Tabs>
	);
}
