import {
	QueryClient,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export const useBooks = () => {
	return useQuery({
		queryKey: ["books"],
		queryFn: async () => {
			const { data, error } = await supabase.from("books").select("*");
			if (error) {
				throw new Error(error.message);
			}
			return data;
		},
	});
};

export const useAddBook = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (newBook) => {
			const { data, error } = await supabase.from("books").insert([newBook]);
			if (error) throw new Error(error.message);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["books"]); // ⚡ Auto-refetch books list
		},
	});
};
