import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "../lib/tailwind";
import { supabase } from "../lib/supabase";

const BookImage = ({ path }) => {
	console.log("paath", path);

	const [uri, setUri] = useState("");

	useEffect(() => {
		if (path) {
			downloadImage(path);
		}
	}, [path]);

	// download image
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
				setUri(fr.result);
			};
		} catch (error) {
			if (error instanceof Error) {
				console.log("Error downloading image: ", error.message);
			}
		}
	}
	return <Image source={{ uri }} style={tw`w-full h-48 rounded-t-xl`} />;
};

export default BookImage;

const styles = StyleSheet.create({});
