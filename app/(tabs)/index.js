import {
	ActivityIndicator,
	Button,
	FlatList,
	Linking,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useState } from "react";
import book from "../../constant/book.json";
import BookListItem from "../../components/BookListItem";
import tw from "../../lib/tailwind";
import { useBooks } from "../../services/bookservice";
import { supabase } from "../../lib/supabase";
import { scheduleLocalNotification } from "../../services/notificationservice";

export default function index() {
	const { data, isLoading, isError } = useBooks();

	const [bookUrl, setBookUrl] = useState(null);

	async function downloadImage(path) {
		try {
			const { data, error } = await supabase.storage
				.from("avatars")
				.download(path);
			if (error) {
				throw error;
			}
			const fr = new FileReader();
			fr.readAsDataURL(data);
			fr.onload = () => {
				setBookUrl(fr.result);
			};
		} catch (error) {
			if (error instanceof Error) {
				console.log("Error downloading image: ", error.message);
			}
		}
	}

	if (isLoading) {
		return <ActivityIndicator />;
	}
	if (isError) {
		return <Text>Failed to fetch products</Text>;
	}

	async function openAppSettings() {
		await Linking.openSettings(); // ✅ Ye app settings page kholega
	}
	return (
		<View style={tw``}>
			{/* <FlatList
				data={data}
				renderItem={({ item }) => <BookListItem book={item} />}
			/> */}

			<Button
				title="Send Local Notification"
				onPress={scheduleLocalNotification}
			/>
			<Button
				title="Enable Notifications in Settings"
				onPress={openAppSettings}
			/>
		</View>
	);
}

const styles = StyleSheet.create({});
