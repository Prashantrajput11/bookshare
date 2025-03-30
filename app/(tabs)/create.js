import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Platform,
	KeyboardAvoidingView,
	ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import tw from "../../lib/tailwind";
import { supabase } from "../../lib/supabase";
import { useAddBook } from "../../services/bookservice";
import { router } from "expo-router";
import ImageUpload from "../../components/ImageUpload";

export default function CreateBookForm() {
	const [book, setBook] = useState({
		title: "",
		author: "",
		genre: "",
		rating: "",
		review: "",
		book_image: "",
	});

	const [selectedImage, setSelectedImage] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const addBookMutation = useAddBook();

	const handleChange = (key, value) => {
		setBook({ ...book, [key]: value });
	};

	const handleImageSelect = (imageData) => {
		// Store the image data for later upload
		setSelectedImage(imageData);
	};

	const uploadImageToSupabase = async () => {
		if (!selectedImage) return null;

		try {
			const arraybuffer = await fetch(selectedImage.uri).then((res) =>
				res.arrayBuffer()
			);
			const fileExt =
				selectedImage.uri?.split(".").pop()?.toLowerCase() ?? "jpeg";
			const path = `${Date.now()}.${fileExt}`;

			// Upload Image to Supabase
			const { data, error } = await supabase.storage
				.from("avatars")
				.upload(path, arraybuffer, {
					contentType: selectedImage.mimeType ?? "image/jpeg",
				});

			if (error) throw error;

			return data.path;
		} catch (error) {
			console.error("Image upload error:", error.message);
			return null;
		}
	};

	const handleSubmit = async () => {
		try {
			setIsSubmitting(true);

			// First upload the image if one was selected
			let imagePath = null;
			if (selectedImage) {
				imagePath = await uploadImageToSupabase();
			}

			// Update the book object with the image path
			const bookData = {
				...book,
				book_image: imagePath || "",
			};

			// Submit everything to the database
			addBookMutation.mutate(bookData, {
				onSuccess: () => {
					console.log("Book added successfully!");
					setBook({
						title: "",
						author: "",
						genre: "",
						rating: "",
						review: "",
						book_image: "",
					});
					setSelectedImage(null);

					router.push("/");
				},
				onError: (error) => {
					console.error("Error inserting book:", error.message);
					Alert.alert("Error", "Failed to submit book. Please try again.");
				},
			});
		} catch (error) {
			console.error("Submission error:", error.message);
			Alert.alert("Error", "Something went wrong. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={tw`flex-1`}
		>
			<ScrollView
				contentContainerStyle={tw`p-5 bg-orange-100`}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
			>
				<Text style={tw`text-2xl font-bold text-gray-800 text-center mb-5`}>
					Add a Book Recommendation
				</Text>

				<View style={tw`bg-white p-5 rounded-2xl shadow-md`}>
					{/* Image Upload Component */}
					<ImageUpload onImageSelect={handleImageSelect} />

					{/* Title Input */}
					<TextInput
						style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
						placeholder="Enter book title"
						value={book.title}
						onChangeText={(text) => handleChange("title", text)}
					/>

					{/* Author Input */}
					<TextInput
						style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
						placeholder="Enter author's name"
						value={book.author}
						onChangeText={(text) => handleChange("author", text)}
					/>

					{/* Genre Input */}
					<TextInput
						style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
						placeholder="Enter book genre"
						value={book.genre}
						onChangeText={(text) => handleChange("genre", text)}
					/>

					{/* Rating Input */}
					<TextInput
						style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
						placeholder="Enter rating"
						keyboardType="numeric"
						value={book.rating}
						onChangeText={(text) => handleChange("rating", text)}
						maxLength={1}
					/>

					<TextInput
						style={tw`border border-gray-300 rounded-lg p-2 mb-4 h-40`}
						placeholder="Enter your review"
						multiline
						value={book.review}
						onChangeText={(text) => handleChange("review", text)}
					/>

					{/* Submit Button */}
					<TouchableOpacity
						style={tw`bg-blue-500 p-3 rounded-lg mt-2 flex-row justify-center items-center`}
						onPress={handleSubmit}
						disabled={isSubmitting || addBookMutation.isLoading}
					>
						{isSubmitting || addBookMutation.isLoading ? (
							<>
								<ActivityIndicator size="small" color="#ffffff" />
								<Text style={tw`text-white text-center font-bold ml-2`}>
									Submitting...
								</Text>
							</>
						) : (
							<Text style={tw`text-white text-center font-bold`}>
								Submit Book
							</Text>
						)}
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
