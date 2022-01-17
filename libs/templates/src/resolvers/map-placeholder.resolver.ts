import { PlaceholderResolver } from "../helpers";

export class MapPlaceholderResolver implements PlaceholderResolver {
	private readonly values = new Map();

	public set(key: string, value: string) {
		return this.values.set(key, value);
	}

	public resolvePlaceholder(placeholderName: string): string {
		return this.values.get(placeholderName);
	}
}
