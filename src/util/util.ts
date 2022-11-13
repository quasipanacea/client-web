import { z } from 'zod'

export async function extractResponse<T, U = Record<string, unknown>>(
	uri: string,
	bodyContent?: U,
): Promise<[true, T] | [false, { error: string }]> {
	let res
	try {
		res = await fetch(uri, {
			method: 'POST',
			body: JSON.stringify(bodyContent || {}, null, '\t'),
		})
	} catch (err: unknown) {
		if (!(err instanceof Error))
			return [false, { error: `Generic failure to fetch resource: ${uri}` }]

		return [false, { error: err.message }]
	}

	if (res.ok) {
		try {
			const data: T = await res.json()

			return [true, data]
		} catch (err: unknown) {
			if (!(err instanceof Error)) {
				return [
					false,
					{
						error: `Generic failure to decode json of resource: ${uri}`,
					},
				]
			} else {
				return [
					false,
					{
						error: err.message,
					},
				]
			}
		}
	} else {
		try {
			const data = await res.json()
			if (data?.error) {
				return [false, { error: data.error }]
			} else {
				return [
					false,
					{
						error: `Generic failure from remote: ${uri} ${JSON.stringify(
							data,
						)}`,
					},
				]
			}
		} catch (err: unknown) {
			if (!(err instanceof Error)) {
				return [
					false,
					{
						error: `Generic failure to decode json of resource: ${uri}`,
					},
				]
			}

			return [false, { error: err.message }]
		}
	}
}

// TODO: improve handling
export async function unwrap<U, T>(uri: string, body: U): Promise<T | Error> {
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
