import { useEffect, useState } from "react";
import {
	View,
	Image,
	Button,
	Alert,
	StyleSheet,
	ActivityIndicator,
	TouchableOpacity,
	Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import tw from "../lib/tailwind";

export default function ImageUpload({ onImageSelect }) {
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);

	async function pickImage() {
		try {
			setLoading(true);
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ["images"],
				allowsEditing: true,
				quality: 1,
				aspect: [4, 3],
			});

			if (!result.canceled && result.assets && result.assets.length > 0) {
				const selectedImage = result.assets[0];
				setImage(selectedImage.uri);

				// Pass the image data to parent component
				onImageSelect(selectedImage);
			}
		} catch (error) {
			Alert.alert("Error", "Failed to pick image.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<View style={tw`items-center mb-4`}>
			<TouchableOpacity onPress={pickImage} style={tw`mb-2`}>
				<View
					style={tw`border border-gray-300 rounded-lg overflow-hidden w-48 h-48 items-center justify-center`}
				>
					{image ? (
						<Image source={{ uri: image }} style={tw`w-full h-full`} />
					) : (
						<Text style={tw`text-gray-500`}>Select Book Cover</Text>
					)}
				</View>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={pickImage}
				style={tw`bg-gray-200 py-2 px-4 rounded-lg`}
			>
				<Text>{image ? "Change Image" : "Pick Book Cover"}</Text>
			</TouchableOpacity>

			{loading && (
				<ActivityIndicator size="small" color="#0000ff" style={tw`mt-2`} />
			)}
		</View>
	);
}
