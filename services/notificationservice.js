import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configure notifications settings with more specific options
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
		priority: Notifications.AndroidNotificationPriority.HIGH,
	}),
});

// Add initialization function
export async function initializeNotifications() {
	try {
		// Set notification channel for Android
		if (Platform.OS === "android") {
			await Notifications.setNotificationChannelAsync("default", {
				name: "default",
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: "#FF231F7C",
			});
		}
	} catch (error) {
		console.error("Error initializing notifications:", error);
	}
}

// Update permission management with more detailed error handling
export async function askNotificationPermission() {
	try {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;

		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync({
				ios: {
					allowAlert: true,
					allowBadge: true,
					allowSound: true,
				},
			});
			finalStatus = status;
		}

		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!");
			return false;
		}
		return true;
	} catch (error) {
		console.error("Error requesting notification permission:", error);
		return false;
	}
}

// Enhanced local notification function with more options
export async function scheduleLocalNotification() {
	try {
		const hasPermission = await askNotificationPermission();
		if (!hasPermission) {
			console.log("No notification permission");
			return;
		}

		const notificationId = await Notifications.scheduleNotificationAsync({
			content: {
				title: "Hey!",
				body: "This is a local notification.",
				sound: true,
				priority: "high",
				vibrate: [0, 250, 250, 250],
				data: { data: "goes here" },
			},
			trigger: {
				seconds: 60,
				channelId: "default", // For Android
			},
		});

		console.log("Notification scheduled:", notificationId);
		return notificationId;
	} catch (error) {
		console.error("Error scheduling notification:", error);
		throw error; // Propagate error for better debugging
	}
}
