import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "../lib/tailwind";
import { Star } from "lucide-react-native";
import BookImage from "./BookImage";

export default function BookListItem({ book, onPress }) {
	console.log("book-->", book);

	// Calculate how many full stars to show based on rating
	const fullStars = Math.floor(book?.rating || 0);

	return (
		<TouchableOpacity
			onPress={onPress}
			style={tw`bg-white rounded-xl  shadow-lg border border-gray-200 mx-4 my-4`}
			activeOpacity={0.9}
		>
			{/* <Image
				source={{
					uri: book?.book_image || "1743236107270.jpg",
				}}
				style={tw`w-full h-48 rounded-t-xl`}
				resizeMode="cover"
			/> */}

			<BookImage path={book?.book_image} />

			<View style={tw`p-4`}>
				<View style={tw`flex-row`}>
					{/* Display rating as stars */}
					{[...Array(5)].map((_, i) => (
						<Star
							key={i}
							size={16}
							color={i < fullStars ? "#FFD700" : "#E5E7EB"}
							fill={i < fullStars ? "#FFD700" : "none"}
						/>
					))}
					<Text style={tw`ml-2 text-gray-600`}>{book?.rating || "N/A"}</Text>
				</View>

				<Text style={tw`font-bold text-lg mt-2 text-gray-800`}>
					{book?.title || "Untitled Book"}
				</Text>

				<Text style={tw`text-gray-600 mt-1`}>
					{book?.author || "Unknown Author"}
				</Text>

				{book?.genre && (
					<View style={tw`mt-2 bg-teal-50 self-start rounded-full px-3 py-1`}>
						<Text style={tw`text-teal-800 text-xs`}>{book.genre}</Text>
					</View>
				)}
			</View>
		</TouchableOpacity>
	);
}
