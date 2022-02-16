export interface PlaceholderResolver {
	resolvePlaceholder(placeholderName: string): string;
}

export class PropertyPlaceholderHelper {
	private static readonly wellKnownSimplePrefixes = new Map([
		['}', '{'],
		[']', '['],
		[')', '(']
	]);

	private readonly placeholderPrefix: string;

	private readonly placeholderSuffix: string;

	private readonly simplePrefix: string;

	private readonly valueSeparator: string;

	private readonly ignoreUnresolvablePlaceholders: boolean;

	public constructor(
		placeholderPrefix: string,
		placeholderSuffix: string,
		valueSeparator: string = null,
		ignoreUnresolvablePlaceholders = true
	) {
		this.placeholderPrefix = placeholderPrefix;
		this.placeholderSuffix = placeholderSuffix;

		const simplePrefix = PropertyPlaceholderHelper.wellKnownSimplePrefixes.get(placeholderSuffix);
		this.simplePrefix = placeholderPrefix.endsWith(simplePrefix) ? simplePrefix : placeholderPrefix;
		this.valueSeparator = valueSeparator;
		this.ignoreUnresolvablePlaceholders = ignoreUnresolvablePlaceholders;
	}

	public replacePlaceholder(value: string, placeholderResolver: PlaceholderResolver) {
		return this.parseStringValue(value, placeholderResolver);
	}

	protected parseStringValue(
		value: string,
		placeholderResolver: PlaceholderResolver,
		visitedPlaceholders: Set<string> = new Set()
	) {
		let startIndex = value.indexOf(this.placeholderPrefix);

		if (startIndex === -1) {
			return value;
		}

		let result = String(value);

		while (startIndex !== -1) {
			const endIndex = this.findPlaceholderEndIndex(result, startIndex);
			if (endIndex !== -1) {
				let placeholder = result.substring(startIndex + this.placeholderPrefix.length, endIndex);
				const originalPlaceholder = placeholder;

				if (!visitedPlaceholders.add(originalPlaceholder)) {
					throw new Error(`Circular placeholder reference "${originalPlaceholder}" in property definitions`);
				}

				placeholder = this.parseStringValue(placeholder, placeholderResolver, visitedPlaceholders);

				let propVal = placeholderResolver.resolvePlaceholder(placeholder);
				if (propVal === undefined && this.valueSeparator) {
					const separatorIndex = placeholder.indexOf(this.valueSeparator);
					if (separatorIndex !== -1) {
						const actualPlaceholder = placeholder.substring(0, separatorIndex);
						const defaultValue = placeholder.substring(separatorIndex + this.valueSeparator.length);
						propVal = placeholderResolver.resolvePlaceholder(actualPlaceholder);
						if (propVal === undefined) {
							propVal = defaultValue;
						}
					}
				}

				if (propVal !== undefined) {
					// Recursive invocation, parsing placeholders contained in the
					// previously resolved placeholder value.
					propVal = this.parseStringValue(propVal, placeholderResolver, visitedPlaceholders);
					result =
						result.substring(0, startIndex) +
						propVal +
						result.substring(endIndex + this.placeholderSuffix.length);
					startIndex = result.indexOf(this.placeholderPrefix, startIndex + propVal.length);
				} else if (this.ignoreUnresolvablePlaceholders) {
					// Proceed with unprocessed value.
					startIndex = result.indexOf(this.placeholderPrefix, endIndex + this.placeholderSuffix.length);
				} else {
					throw new Error(`Could not resolve placeholder "${placeholder}" in value "${value}"`);
				}
				visitedPlaceholders.delete(originalPlaceholder);
			} else {
				startIndex = -1;
			}
		}

		return result.toString();
	}

	private findPlaceholderEndIndex(buf: string, startIndex: number) {
		let index = startIndex + this.placeholderPrefix.length;
		let withinNestedPlaceholder = 0;

		while (index < buf.length) {
			if (PropertyPlaceholderHelper.substringMatch(buf, index, this.placeholderSuffix)) {
				if (withinNestedPlaceholder > 0) {
					withinNestedPlaceholder--;
					index = index + this.placeholderSuffix.length;
				} else {
					return index;
				}
			} else if (PropertyPlaceholderHelper.substringMatch(buf, index, this.simplePrefix)) {
				withinNestedPlaceholder++;
				index = index + this.simplePrefix.length;
			} else {
				index++;
			}
		}

		return -1;
	}

	private static substringMatch(str: string, index: number, substring: string) {
		if (index + substring.length > str.length) {
			return false;
		}

		for (let i = 0; i < substring.length; i++) {
			if (str.charAt(index + i) !== substring.charAt(i)) {
				return false;
			}
		}

		return true;
	}
}
