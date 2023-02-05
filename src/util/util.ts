export function podTypeToDirname(type: string) {
	return `Pod${type[0].toUpperCase()}${type.slice(1)}`
}

export async function unwrap<U, T>(uri: string, body: U): Promise<T> {
	const res = await fetch(uri, {
		method: 'POST',
		body: JSON.stringify(body, null, '\t'),
	})

	if (!res.ok) {
		const text = await res.text()
		try {
			// TODO ensure serialized properly
			const json = JSON.parse(text)
			throw new Error(json)
		} catch {
			throw new Error(text)
		}
	}

	return await res.json()
}

// TODO: improve handling
export async function legacyUnwrap<U, T>(
	uri: string,
	body: U,
): Promise<T | Error> {
	let res
	try {
		res = await fetch(uri, {
			method: 'POST',
			body: JSON.stringify(body, null, '\t'),
		})
	} catch (err: unknown) {
		if (!(err instanceof Error))
			return handle(new Error(`${JSON.stringify(err)}`))

		return handle(err)
	}

	if (!res.ok) {
		let json
		try {
			json = await res.json()

			return handle(new Error(`${JSON.stringify(json)}`))
		} catch (err: unknown) {
			if (!(err instanceof Error))
				return handle(new Error(`${JSON.stringify(err)}`))

			return handle(err)
		}
	}

	let json
	try {
		json = await res.json()
		return json
	} catch (err: unknown) {
		if (!(err instanceof Error))
			return handle(new Error(`${JSON.stringify(err)}`))

		return handle(err)
	}
}

function handle(err: Error): Error {
	console.error(err)

	return err
}
