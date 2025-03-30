export function getTwColor(style) {
	const color = style?.backgroundColor || style?.color || "#000";
	return color;
}
